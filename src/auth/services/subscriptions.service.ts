import type {Subscription, SubscriptionTier} from "../types/subscription.ts";
import {getSupabase} from "../../utils/supabase.ts";

export async function getSubscription(userId: string): Promise<Subscription> {
    const supabase = await getSupabase();

    const {data, error} = await supabase
        .schema("subscriptions")
        .from("user_subscriptions")
        .select("*, subscription_tiers(*)")
        .eq("user_id", userId)
        .maybeSingle<{
            user_id: string;
            start_date: string;
            end_date: string;
            subscription_tiers: SubscriptionTier;
        }>();

    if (error || !data) {
        throw new Error("Internal error");
    }

    return {
        ...data.subscription_tiers,
        userId: data.user_id,
        startDate: data.start_date,
        endDate: data.end_date,
    };
}

export async function getSubscriptionTiers(): Promise<SubscriptionTier[]> {
    const supabase = await getSupabase();

    const {data, error} = await supabase
        .schema("subscriptions")
        .from("subscription_tiers")
        .select("*");

    if (error || !data) {
        throw new Error("Internal error");
    }

    return data.map(dto => ({
        id: dto.id,
        key: dto.key,
        name: dto.name,
        roleKey: dto.role_key,
        rank: dto.rank
    }));
}

export async function requestSubscriptionTier(subscriptionKey: string): Promise<boolean> {
    const supabase = await getSupabase();

    const { error } = await supabase
        .schema("subscriptions")
        .rpc("create_subscription_request", {
            subscription_key: subscriptionKey,
        });

    return !error;
}

export async function hasSubscriptionRequest(userId: string | undefined): Promise<boolean> {

    if (userId == undefined) {
        return false;
    }

    const supabase = await getSupabase();

    const { count, error } = await supabase
        .schema("subscriptions")
        .from("subscription_requests")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);

    if (error) {
        console.error("Failed to check subscription requests:", error.message);
        throw new Error("Failed to check subscription requests");
    }

    console.log(count);
    return (count ?? 0) > 0;
}