import type {PostDto} from "../dtos/post.dto.ts";
import type {Post} from "../types/post.ts";

export function mapPost(dto: PostDto): Post {
    try {
        return {
            id: dto.id,
            isPublished: dto.is_published,
            title: dto.post_contents.title,
            content: dto.post_contents.content,
            createdAt: dto.created_at,
            metadata: {id: dto.id, ...dto.post_metadata},
            tags: dto.post_tags.flatMap(x => x.tags),
            slug: dto.post_metadata.slug,
            references: dto.post_references.map(x => ({
                ...x,
                pictureUrl: x.picture_url
            })),
            warnings: dto.post_warnings,
            relatedPosts: dto.post_relations.filter(x => !!x.post_b_id)
                .map(x => ({
                id: x.post_b_id!.id,
                title: x.post_b_id!.post_contents?.title,
                summary: x.post_b_id!.post_contents?.summary,
                createdAt: x.post_b_id!.created_at,
                slug: x.post_b_id!.post_metadata?.slug,
                pictureUrl: x.post_b_id!.post_contents?.picture_url,
                requiredRoles: x.post_b_id!.post_access_roles?.map(x => x.role_key)
            })),
            userAgreement: (
                dto.user_agreements.length > 0 &&
                dto.user_agreements[0].is_agreed)
        }
    } catch (error) {
        console.error(error);
        throw error;
    }

}