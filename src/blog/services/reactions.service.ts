import type {ReactionsStats, ReactionType} from "../types/reaction.ts";
import {mapReactionsStats} from "../mappers/reactionStats.mapper.ts";
import {getSupabase} from "../../utils/supabase.ts";

export async function getReactionStats(postId: number): Promise<ReactionsStats> {
    const supabase = await getSupabase();

    const {data, error} = await supabase
        .schema('blog')
        .from('reaction_counts_per_post')
        .select('*')
        .eq('post_id', postId);

    if (error)
        throw error;

    return mapReactionsStats(data);
}

export async function toggleReaction(postId: number, type: ReactionType): Promise<void> {
    const supabase = await getSupabase();

    await supabase
        .schema('blog')
        .rpc("toggle_post_reaction", {
            p_post_id: postId,
            p_reaction: type
        });
}