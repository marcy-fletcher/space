import {Subscriptions, type SubscriptionKey} from "../../auth/types/subscription.ts";

export type PostTierFilter = Extract<SubscriptionKey, "acolyte" | "high-priest" | "cult-leader">;

export const PostTierFilters = Subscriptions
    .filter((subscription): subscription is typeof subscription & { key: PostTierFilter } =>
        subscription.key === "acolyte" ||
        subscription.key === "high-priest" ||
        subscription.key === "cult-leader"
    )
    .sort((left, right) => left.rank - right.rank);
