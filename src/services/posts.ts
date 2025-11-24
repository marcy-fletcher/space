import {supabase} from "./supabase.ts";
import {Post} from "../types/post.ts";
import {ReactionType} from "../types/reactions.ts";

interface PostDto {
  id: string;
  created_at: string;
  tier_id: string;
  subscription_tiers: {
    id: string;
    level: number;
    title: string;
  };
  post_content: {
    title: string;
    preview: string;
    preview_picture: string;
    full_content: string;
    content_type: "markdown" | "html";
  };
  post_references: {
    people?: Array<{
      name: string;
      url?: string;
      description: string;
      picture?: string;
    }>;
    franchise?: Array<{
      title: string;
      url?: string;
      picture?: string;
    }>
  }
  post_metadata: {
    id: string;
    tags: string[];
    age_restriction: "everyone" | "mature" | "explicit",
    warnings: Array<{
      type: string;
      level: "mild" | "moderate" | "graphic" | "extreme";
    }>;
    transformations: Array<{
      to: string;
      from: string;
      type: string;
    }>;
  };
  post_reaction_counts: Array<{
    count: number;
    reaction_type: ReactionType;
  }>;
  related_posts: Array<{
    related_id: string;
    post_identity: {
      id: string;
      tier_id: string;
      created_at: string;
      subscription_tiers: {
        id: string;
        level: number;
        title: string;
      };
      post_content: {
        title: string;
        preview: string;
      };
    };
  }>;
}

export interface PaginatedPostsResponse {
  posts: Post[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export function mapDtoToPost(dto: PostDto): Post {
  const safeMap = <T, U>(array: T[] | undefined | null, mapper: (item: T) => U): U[] => {
    return Array.isArray(array) ? array.map(mapper) : [];
  };

  const reactions: Post['reactions'] = dto?.post_reaction_counts?.reduce((acc, item) => {
    if (item.reaction_type in acc) {
      acc[item.reaction_type as keyof Post['reactions']] = item.count;
    }
    return acc;
  }, {
    like: 0,
    dislike: 0,
    hot: 0,
    sequel_request: 0
  } as Post['reactions']);

  const relatedPosts = safeMap(dto.related_posts, relatedPost => ({
    id: relatedPost.related_id,
    title: relatedPost.post_identity?.post_content?.title,
    preview: relatedPost.post_identity?.post_content?.preview,
    createdAt: relatedPost.post_identity?.created_at,
    subscription: {
      requiredTierId: relatedPost.post_identity.subscription_tiers.id,
      requiredTierLevel: relatedPost.post_identity.subscription_tiers.level,
      requiredTierTitle: relatedPost.post_identity.subscription_tiers.title,
    }
  }));

  return {
    id: dto.id,
    title: dto.post_content?.title,
    tags: dto.post_metadata?.tags ?? [],
    preview: dto.post_content?.preview,
    previewPicture: dto.post_content?.preview_picture,
    createdAt: dto.created_at,
    fullContent: dto.post_content?.full_content,
    contentType: dto.post_content?.content_type,
    references: dto.post_references,
    ageRestriction: dto.post_metadata?.age_restriction,
    transformations: safeMap(dto.post_metadata?.transformations, trans => ({
      type: trans.type || '',
      from: trans.from || '',
      to: trans.to || ''
    })),
    warnings: safeMap(dto.post_metadata?.warnings, warning => ({
      type: warning.type || '',
      level: warning.level || ''
    })),
    subscription: {
      requiredTierId: dto.tier_id,
      requiredTierLevel: dto.subscription_tiers?.level ?? 0,
      requiredTierTitle: dto.subscription_tiers?.title ?? ''
    },
    relatedPosts: relatedPosts,
    reactions: reactions
  };
}

export class PostService {
  static async getAllPosts(): Promise<Post[]> {
    try {
      const { data, error } = await supabase
          .from('post_identity')
          .select(`
            *,
            subscription_tiers (*),
            post_content (
              title,
              preview,
              preview_picture
            ),
            post_reaction_counts (
              reaction_type,
              count
            ),
            post_metadata (*)
          `)
          .not('tier_id', 'is', null)
          .order('created_at', { ascending: false });

      if (error) {
        console.error('RPC Error:', error);
        return [];
      }

      if (!data || data.length === 0) {
        return [];
      }

      return data.map(mapDtoToPost);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  static async getPaginatedPosts(
      page: number = 1,
      pageSize: number = 9,
      filterUnavailable: boolean = false,
      orderBy: 'created_at' | 'title' = 'created_at',
      orderDirection: 'asc' | 'desc' = 'desc',
      searchTitle?: string // New parameter for title search
  ): Promise<PaginatedPostsResponse> {
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
          .from('post_identity')
          .select(`
        *,
        subscription_tiers (*),
        post_content (
          title,
          preview,
          preview_picture
        ),
        post_reaction_counts (
          reaction_type,
          count
        ),
        post_metadata (*)
      `, { count: 'exact' })
          .not('tier_id', 'is', null);

      if (searchTitle && searchTitle.trim() !== '') {
        query = query
            .not('post_content', 'is', null)
            .not('post_content.title', 'is', null)
            .ilike('post_content.title', `%${searchTitle.trim()}%`);
      }

      if (orderBy === 'created_at') {
        query = query.order('created_at', { ascending: orderDirection === 'asc' });
      } else if (orderBy === 'title') {
        query = query.order('post_content(title)', {
          ascending: orderDirection === 'asc',
          nullsFirst: orderDirection === 'asc'
        });
      }

      if (filterUnavailable) {
        query = query.not('post_content', 'is', null);
      }

      const { data, error, count } = await query.range(from, to);

      if (error) {
        console.error('Error fetching paginated posts:', error);
        throw error;
      }

      const totalCount = count || 0;
      const posts = data?.map(mapDtoToPost) || [];
      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        posts,
        totalCount,
        currentPage: page,
        pageSize,
        totalPages
      };
    } catch (error) {
      console.error('Error fetching paginated posts:', error);
      throw error;
    }
  }

  static async getPostById(id: string): Promise<Post | null> {
    try {
      const { data, error } = await supabase
          .from('post_identity')
          .select(`
          *,
          subscription_tiers (*),
          post_content (*),
          post_metadata (*),
          post_references (*),
          related_posts!related_posts_post_id_fkey (
            related_id,
            post_identity:post_identity!related_posts_related_id_fkey (
              id,
              created_at,
              tier_id,
              subscription_tiers (*),
              post_content (
                title,
                preview
              )
            )
          )
        `)
          .eq('id', id)
          .single();

      if (error) {
        console.error('Error fetching post by ID:', error);
        return null;
      }

      if (!data) {
        return null;
      }

      return mapDtoToPost(data);
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      return null;
    }
  }

  static async createPost(postData: Omit<Post, 'id' | 'createdAt' | 'subscription' | 'reactions'>): Promise<boolean> {
    try {
      const { data, error } = await supabase
          .rpc('create_post', {
            p_title: postData.title,
            p_preview: postData.preview,
            p_full_content: postData.fullContent,
            p_preview_picture: postData.previewPicture,
            p_tags: postData.tags,
            p_warnings: postData.warnings,
            p_transformations: postData.transformations,
            p_references: postData.references
          });

      if (error || data.error) {
        const e = error ?? data.error;
        console.error('Error creating post:', e);
        return false;
      }

      return data;
    } catch (error) {
      console.error('Error in createPost:', error);
      return false;
    }
  }
}