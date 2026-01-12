import type {PostIdentity} from "../types/postIdentity.ts";

export function mapPostIdentity(dto: {
    id: number,
    post_contents: { title: string },
    post_metadata: { slug: string }
}): PostIdentity {
    return {
        id: dto.id,
        title: dto.post_contents.title,
        slug: dto.post_metadata.slug
    }
}