import {
    PostReactions,
    ReactionType,
    ToggleReactionResult
} from '../types/reactions';
import {supabase} from "./supabase.ts";
import {logging} from "./logging.ts";

export class ReactionService {
    async getPostReactions(postId: string): Promise<PostReactions> {
        const { data, error } = await supabase.rpc(
            'get_post_reactions',
            { p_post_id: postId }
        );

        if (error) {
            console.error('Error fetching reactions:', error);
            return {
                counts: {},
                user_reactions: [],
                total_reactions: 0
            };
        }

        return this.validatePostReactions(data);
    }

    async toggleReaction(postId: string, reactionType: ReactionType): Promise<ToggleReactionResult> {
        const {data, error} = await supabase.rpc(
            'handle_reaction',
            {
                p_post_id: postId,
                p_reaction_type: reactionType
            }
        );

        if (error) {
            console.error('Error toggling reaction:', error);
            throw new Error(`Failed to toggle reaction: ${error.message}`);
        }

        const result = this.validatePostReactions(data);

        const wasAdded = result.user_reactions.includes(reactionType);
        const action: 'added' | 'removed' = wasAdded ? 'added' : 'removed';

        await logging.logUserAction('Reaction Modified', `User ${action} ${reactionType} reaction from post ${postId}`, {'post_id': postId});

        return {
            ...result,
            action,
            reaction_type: reactionType
        };
    }

    private validatePostReactions(data: unknown): PostReactions {
        if (typeof data !== 'object' || data === null) {
            return {
                counts: {},
                user_reactions: [],
                total_reactions: 0
            };
        }

        const response = data as Record<string, unknown>;

        return {
            counts: (response.counts as Record<string, number>) || {},
            user_reactions: (response.user_reactions as ReactionType[]) || [],
            total_reactions: Number(response.total_reactions) || 0
        };
    }
}

export const reactionService = new ReactionService();