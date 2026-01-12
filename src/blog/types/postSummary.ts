import type {Transformation} from "./transformation.ts";
import type {Tag} from "./tag.ts";
import type {Metadata} from "./metadata.ts";
import type {Warning} from "./warning.ts";
import type {ReactionType} from "./reaction.ts";
import type {SubscriptionTier} from "../../auth/types/subscription.ts";

export type SortBy = "date" | "alphabet";
export type Order = "asc" | "desc";

export type TransformationSummary = Omit<Transformation, 'id' | 'postId'>;
export type MetadataSummary = Omit<Metadata, 'id'>;
export type WarningSummary = Omit<Warning, 'id' | 'postId'>;
export type ReactionsSummary = {
    [key in ReactionType]: number;
};

export interface PostSummary {
    id: number;
    title?: string;
    pictureUrl?: string;
    summary?: string;
    tags?: Tag[];
    metadata?: MetadataSummary;
    transformations?: TransformationSummary[];
    warnings?: WarningSummary[];
    reactions: ReactionsSummary;
    subscriptions?: SubscriptionTier[];
    createdAt: string;
    views: number;
    updatedAt: string;
    commentCount: number;
}