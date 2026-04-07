import type {SubscriptionTier} from "../../auth/types/subscription.ts";

export function getLowestSubscriptionTier(
    subscriptions?: SubscriptionTier[]
): SubscriptionTier | undefined {
    if (!subscriptions || subscriptions.length === 0) {
        return undefined;
    }

    return subscriptions.reduce((lowest, current) =>
        current.rank < lowest.rank ? current : lowest
    );
}
