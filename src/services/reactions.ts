import {
    PostReaction,
    PostReactions,
    ReactionType,
    ToggleReactionResult
} from '../types/reactions';
import {supabase} from "./supabase.ts";

interface ReactionDto {
    "post_id": string,
    "user_id": string,
    "reaction_type": ReactionType,
    "created_at": string,
    "post_title": string,
    "user_name": string
}

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

    mapDtoToReaction(dto: ReactionDto): PostReaction {
        return {
            postId: dto.post_id,
            userId: dto.user_id,
            reactionType: dto.reaction_type,
            createdAt: dto.created_at,
            userName: dto.user_name,
            postTitle: dto.post_title,
        }
    }

    async getAllReactions(limit: number = 50, page: number = 1): Promise<PostReaction[]> {
        const offset = (page - 1) * limit;

        const { data, error } = await supabase
            .rpc('get_reactions_with_details')
            .select('*')
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Error fetching user reactions:', error);
            throw new Error(`Failed to fetch user reactions: ${error.message}`);
        }

        return data.map(this.mapDtoToReaction);
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
