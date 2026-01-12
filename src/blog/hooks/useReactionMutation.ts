import { useMutation } from "@tanstack/react-query";
import {toggleReaction} from "../services/reactions.service.ts";
import {queryClient} from "../../main.tsx";
import type {ReactionsStats, ReactionType} from "../types/reaction.ts";
import {ErrorCodes, EventCodes, logError, logInfo} from "../../common/services/logging.service.ts";

interface UseReactionMutationParams {
    postId: number;
    type: ReactionType;
    count: number;
    userReacted: boolean;
}

export const useReactionMutation = ({ postId, type, count, userReacted }: UseReactionMutationParams) => {
    const queryKey = ['post_reactions', postId];

    return useMutation({
        mutationFn: () => toggleReaction(postId, type),
        onMutate: async (_variables, context) => {
            await queryClient.cancelQueries({queryKey});

            const reactionType = type;
            const optimisticReacted = !userReacted;
            const optimisticCount = userReacted ? count - 1 : count + 1;

            context.client.setQueryData<ReactionsStats>(queryKey, (old) => {
                if ((reactionType === "like" && old?.dislike.userHasReacted) ||
                    (reactionType === "dislike" && old?.like.userHasReacted)) {
                    const oppositeReaction = reactionType === "like" ? "dislike" : "like";
                    return {
                        ...old!,
                        [reactionType]: {
                            userHasReacted: optimisticReacted,
                            count: optimisticCount,
                        },
                        [oppositeReaction]: {
                            userHasReacted: false,
                            count: old[oppositeReaction].count - 1,
                        },
                    };
                }

                return {
                    ...old!,
                    [reactionType]: {
                        userHasReacted: optimisticReacted,
                        count: optimisticCount,
                    },
                };
            });

            return { optimisticReacted, optimisticCount };
        },
        onSuccess: (_data, _v, context) => {
            if (context.optimisticReacted)
                logInfo(EventCodes.reactionAdded, {type: type});
            else
                logInfo(EventCodes.reactionRemoved, {type: type});
        },
        onError: (error) => {
            logError(ErrorCodes.reactionToggleError, {error})
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKey });
        },
    });
};
