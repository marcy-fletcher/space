import type {Invite} from "../types/invites.ts";
import {getSupabase} from "../../utils/supabase.ts";
import type {SubscriptionKey} from "../../auth/types/subscription.ts";

export async function getInvites(): Promise<Invite[]> {
    const supabase = await getSupabase();
    const user = (await supabase.auth.getUser()).data.user;

    if (!user)
        throw new Error("Unauthorized");

    const { data, error } = await supabase
        .schema('subscriptions')
        .from('invites_with_details')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

    if (error)
        throw error;

    if (!data)
        return [];

    return data.map(x => {
        return {
            code: x.invite_key,
            createdBy: x.created_by,
            usedBy: x.invite_user_username,
            subscriptionName: x.subscription_tier_name,
            createdAt: x.created_at,
            usedAt: x.used_at
        }
    })
}

export async function applyInvite(key:string): Promise<void> {
    const supabase = await getSupabase();

    const { error } = await supabase
        .schema('subscriptions')
        .rpc('use_invite', {p_invite_key: key});

    if (error) {
        throw error.message;
    }
}

export async function createInvite(subscription:SubscriptionKey): Promise<void> {

    let subscriptionId = -1;

    if (subscription === 'high-priest') {
        subscriptionId = 2;
    } else if (subscription === 'cult-leader') {
        subscriptionId = 3;
    } else {
        throw new Error("Unable to create invite");
    }

    const supabase = await getSupabase();

    const { error } = await supabase
        .schema('subscriptions')
        .rpc('create_invite', {p_subscription_tier_id: subscriptionId});

    if (error) {
        throw error.message;
    }
}

export async function deleteInvite(key:string): Promise<void> {
    const supabase = await getSupabase();

    const { error } = await supabase
        .schema('subscriptions')
        .from('invites')
        .delete()
        .eq('invite_key', key);

    if (error) {
        throw error.message;
    }
}