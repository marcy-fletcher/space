import type {PostSummaryDto} from "../dtos/postSummary.dto.ts";
import type {MetadataSummary, PostSummary} from "../types/postSummary.ts";
import type {Tag} from "../types/tag.ts";
import type {Transformation} from "../types/transformation.ts";
import {type ReactionType, ReactionTypes} from "../types/reaction.ts";

export function mapPostSummary(dto: PostSummaryDto): PostSummary {

    const tags: Tag[] | undefined = dto.post_tags?.flatMap(x => x.tags);

    const metadata: MetadataSummary | undefined = dto.post_metadata
        ? {explicitness: dto.post_metadata.explicitness, slug: dto.post_metadata.slug}
        : undefined;

    const transformations: Omit<Transformation, 'postId' | 'id'>[] = dto.post_transformations?.map(p => {
        return {
            from: p.from_value,
            to: p.to_value,
            type: p.type
        }
    }) || [];

    const warnings = dto.post_warnings;

    const pictureUrl = dto.post_contents?.picture_url;
    const summary = dto.post_contents?.summary;
    const title = dto.post_contents?.title;

    const reactionTypes: ReactionType[] = Object.keys(ReactionTypes) as ReactionType[];

    const reactions = Object.fromEntries(
        reactionTypes.map(type => [type, 0])
    ) as { [key in ReactionType]: number };

    dto.reaction_counts_per_post?.forEach(reaction => {
        if (reaction.reaction in reactions) {
            reactions[reaction.reaction] = reaction.reaction_count;
        }
    });

    const subscriptions = dto.post_subscription_details;

    return {
        id: dto.id,
        title,
        pictureUrl,
        summary,
        tags,
        metadata,
        warnings,
        reactions,
        subscriptions,
        views: dto.post_views?.views ?? 0,
        commentCount: dto.post_comment_counts?.comment_count ?? 0,
        transformations: transformations,
        createdAt: dto.created_at ?? new Date().toISOString(),
        updatedAt: dto.created_at ?? new Date().toISOString()
    };
}
