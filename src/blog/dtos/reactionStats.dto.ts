import type {ReactionType} from "../types/reaction.ts";

export interface ReactionStatsDto {
    post_id: number;
    reaction: ReactionType;
    reaction_count: number;
    user_reacted: boolean;
}