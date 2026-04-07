import type {SubscriptionKey} from "../../auth/types/subscription.ts";
import {PostTierFilters, type PostTierFilter} from "../types/postTierFilter.ts";

export function getLowerSubscriptionTierKeys(tier: PostTierFilter): SubscriptionKey[] {
    const selectedTier = PostTierFilters.find(subscription => subscription.key === tier);

    if (!selectedTier) {
        return [];
    }

    return PostTierFilters
        .filter(subscription => subscription.rank < selectedTier.rank)
        .map(subscription => subscription.key);
}
