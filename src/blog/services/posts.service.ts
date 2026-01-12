import {getSupabase} from "../../utils/supabase.ts";
import {mapPostSummary} from "../mappers/postSummary.mapper.ts";
import type {PaginatedPostsResponse} from "../dtos/paginatedPosts.response.ts";
import {defaultLimit, defaultPage, getSearchState} from "../model/searchStore.ts";
import {parseBoolean} from "../../utils/parseBoolean.ts";
import type {PostIdentity} from "../types/id.ts";
import type {Post} from "../types/post.ts";
import {mapPost} from "../mappers/post.mapper.ts";
import type {CreatePostDto} from "../dtos/forms/createPostDto.ts";
import {mapPostIdentity} from "../mappers/postIdentity.mapper.ts";

export async function getPaginatedPosts(): Promise<PaginatedPostsResponse> {
    const searchParams = getSearchState().params;

    const page = searchParams.page ? parseInt(searchParams.page) : defaultPage;
    const limit = searchParams.limit ? parseInt(searchParams.limit) : defaultLimit;

    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const hideUnavailable = parseBoolean(searchParams.hideUnavailable);

    const supabase = await getSupabase();

    let query = supabase
        .schema('blog')
        .from('posts')
        .select(`
            *,
            post_contents(title, summary, picture_url),
            post_tags(tags(*)),
            post_metadata(
              explicitness, slug
            ),
            post_transformations(
              *
            ),
            post_warnings (
              level, text
            ),
            reaction_counts_per_post(
              reaction, reaction_count
            ),
            post_subscription_details(
              id, key, name, rank
            ),
            post_views(
              views
            ),
            post_comment_counts(
              comment_count
            )
        `, {count: 'exact'})
        .range(start, end);

    if (hideUnavailable) {
        query = query.not('post_contents', 'is', null);
    }

    if (searchParams.term) {
        if (searchParams.term.startsWith('#')) {
            const tagSearchTerm = searchParams.term.slice(1);

            const tagQuery = supabase
                .schema('blog')
                .from('tags')
                .select('id')
                .ilike('value', `%${tagSearchTerm}%`)
                .single();

            const tagResult = await tagQuery;
            if (tagResult.data) {
                const tagId = tagResult.data.id;

                query = query
                    .not('post_tags', 'is', null)
                    .eq('post_tags.tag_id', tagId);
            } else {
                return {
                    total: 0,
                    posts: []
                }
            }
        } else {
            query = query
                .not('post_contents', 'is', null)
                .not('post_contents.title', 'is', null)
                .ilike('post_contents.title', `%${searchParams.term}%`);
        }
    }


    if (searchParams.sortBy === 'alphabet') {
        query = query.order('post_contents(title)', {
            ascending: searchParams.order === 'asc',
            nullsFirst: false
        });
    } else {
        query = query.order('created_at', {ascending: searchParams.order === 'asc'})
    }

    const {data, error, count} = await query;

    if (error) {
        throw error;
    }

    return {
        total: count ?? 0,
        posts: data?.map(mapPostSummary) ?? []
    }
}

export async function getPost(postId: PostIdentity): Promise<Post> {
    const {slug, id: numberId} = postId;

    const supabase = await getSupabase();

    let query = supabase
        .schema('blog')
        .from('posts')
        .select(`
            *,
            post_contents(title, content),
            post_metadata(explicitness, slug),
            post_tags(tags(value)),
            post_warnings(level, text),
            post_transformations(id, type, from_value, to_value),
            post_references(url, name, picture_url, description, type),
            post_relations:post_relations_post_a_id_fkey(
                post_b_id(
                    id,
                    created_at,
                    post_contents(title, summary, picture_url),
                    post_metadata(slug),
                    post_access_roles(role_key)
                )
            ),
            user_agreements(is_agreed)
        `)

    if (slug) {
        query = query.eq('post_metadata.slug', slug);
        query = query.not('post_metadata', 'is', null);
    } else if (numberId) {
        query = query.eq('id', numberId);
    } else {
        throw new Error("No valid identifier provided for post.");
    }

    const {data, error} = await query.single();

    if (error) {
        throw error;
    }

    return mapPost(data);
}

export async function createPost(dto: CreatePostDto): Promise<number> {
    const supabase = await getSupabase();

    delete dto.slug;

    const {data, error} = await supabase
        .schema('blog')
        .rpc('create_post', dto)
        .select("*")
        .single();

    if (!data) {
        throw new Error('Internal server error.');
    }

    if (error) {
        throw error;
    }

    return data as number;
}

export async function publishPost(postId: number): Promise<void> {
    const supabase = await getSupabase();

    const {error} = await supabase
        .schema('blog')
        .from('posts')
        .update({is_published: true})
        .eq('id', postId);

    if (error)
        throw error;
}

export async function hidePost(postId: number): Promise<void> {
    const supabase = await getSupabase();

    const {error} = await supabase
        .schema('blog')
        .from('posts')
        .update({is_published: false})
        .eq('id', postId);

    if (error)
        throw error;
}

export async function updatePost(postId: number, dto: CreatePostDto): Promise<void> {
    const supabase = await getSupabase();

    const {error} = await supabase
        .schema('blog')
        .rpc('update_post', {
            post_id: postId,
            ...dto
        })
        .select("*")
        .single();

    if (error) {
        throw error;
    }
}

export async function grantAgreement(postId: number): Promise<void> {
    const supabase = await getSupabase();
    const userResponse = await supabase.auth.getUser();

    if (!userResponse.data.user) {
        return;
    }

    await supabase.schema('blog')
        .from('user_agreements')
        .insert({
            post_id: postId,
            is_agreed: true
        });
}

export async function getPostForUpdate(postId: number): Promise<CreatePostDto> {

    const supabase = await getSupabase();

    const {data, error} = await supabase
        .schema('blog')
        .from('posts')
        .select(`
            *,
            post_contents(title, content, summary, picture_url),
            post_metadata(explicitness, slug),
            post_tags(tags(value)),
            post_warnings(id, level, text),
            post_transformations(id, type, from_value, to_value),
            post_references(id, url, name, picture_url, description, type),
            post_access_roles(role_key),
            post_relations:post_relations_post_a_id_fkey(post_b_id)
        `)
        .eq("id", postId)
        .single();

    if (error || !data) {
        throw error;
    }

    const tags = data?.post_tags?.flatMap((x: { tags: { value: string } }) => x.tags) ?? [];

    return {
        slug: data.post_metadata.slug,
        title: data.post_contents.title,
        summary: data.post_contents.summary,
        picture_url: data.post_contents.picture_url,
        content: data.post_contents.content,
        explicitness: data.post_metadata.explicitness,
        tags: tags,
        transformations: data.post_transformations,
        post_references: data.post_references,
        warnings: data.post_warnings,
        required_roles: data.post_access_roles,
        related_posts: data.post_relations.map((x: { post_b_id: number }) => ({
            id: x.post_b_id
        }))
    }
}


export async function getPostsIdWithTitle(): Promise<({ id: number, title: string })[]> {

    const supabase = await getSupabase();

    const {data, error} = await supabase
        .schema('blog')
        .from('posts')
        .select(`
            id,
            post_contents (title),
            post_metadata (slug)
        `);

    if (!data || error) {
        return [];
    }

    // @ts-expect-error: Typescript is being idiot
    return data.map(mapPostIdentity);
}

export async function incrementPostViews(postId: number): Promise<void> {
    const supabase = await getSupabase();

    await supabase.schema('blog')
        .rpc('increment_post_views', {p_post_id: postId});
}