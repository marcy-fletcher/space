import type {Explicitness} from "../types/metadata.ts";
import type {WarningLevel} from "../types/warning.ts";
import type {ReactionType} from "../types/reaction.ts";
import type {SubscriptionTier} from "../../auth/types/subscription.ts";
import type {TransformationType} from "../types/transformation.ts";

export type PostSummaryDto = {
    id: number;
    created_at?: string;
    post_contents?: {
        title: string;
        summary: string;
        picture_url: string;
    };
    post_tags?: {
        tags: {
            value: string;
        }
    }[];
    post_metadata: {
        explicitness: Explicitness;
        slug: string;
    };
    post_transformations?: {
        from_value: string;
        to_value: string;
        type: TransformationType;
    }[];
    post_warnings?: {
        level: WarningLevel;
        text: string;
    }[];
    reaction_counts_per_post?: {
        reaction: ReactionType,
        reaction_count: number;
    }[];
    post_views?: {
        views: number;
    }
    post_comment_counts?: {
        comment_count: number;
    }
    post_subscription_details?: SubscriptionTier[];
};