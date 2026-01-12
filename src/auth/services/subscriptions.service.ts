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