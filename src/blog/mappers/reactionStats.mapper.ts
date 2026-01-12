import type {ReactionStatsDto} from "../dtos/reactionStats.dto.ts";
import type {ReactionsStats} from "../types/reaction.ts";

export function mapReactionsStats(dtos: ReactionStatsDto[]): ReactionsStats {
    const reactionsStats: ReactionsStats = {
        like: { count: 0, userHasReacted: false },
        dislike: { count: 0, userHasReacted: false },
        hot: { count: 0, userHasReacted: false },
        sequel_request: { count: 0, userHasReacted: false },
    };

    for (const dto of dtos) {
        const { reaction, reaction_count, user_reacted } = dto;

        if (reactionsStats[reaction]) {
            reactionsStats[reaction].count += reaction_count;
        }

        if (user_reacted) {
            reactionsStats[reaction].userHasReacted = true;
        }
    }

    return reactionsStats;
}
