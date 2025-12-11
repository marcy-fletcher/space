import React, { useState, useEffect } from "react";
import {PostReactions, ReactionType} from "../../types/reactions.ts";
import {reactionService} from "../../services/reactions.ts";
import {ReactionButton} from "./reactions/ReactionButton.tsx";
import {useDebugLog} from "../../hooks/useDebugLog.ts";

export const ReactionsSection: React.FC<{ postId: string }> = ({ postId }) => {
    const [reactions, setReactions] = useState<PostReactions | null>(null);
    const [loading, setLoading] = useState(true);

    const { debugLog } = useDebugLog();

    useEffect(() => {
        const fetchReactions = async () => {
            try {
                const postReactions = await reactionService.getPostReactions(postId);
                setReactions(postReactions);
            } catch (error) {
                console.error('Error fetching reactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReactions();
    }, [postId]);

    const handleReaction = async (reactionType: ReactionType) => {
        try {
            const result = await reactionService.toggleReaction(postId, reactionType);
            console.log(result);
            setReactions(result);

            const action = result.action;
            debugLog('reaction_handle', { post_id: postId, reaction_type:reactionType, action});
        } catch (error) {
            console.error('Error toggling reaction:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-wrap gap-2 justify-center">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    const counts = reactions?.counts || {};
    const userReactions = reactions?.user_reactions || [];

    return (
        <div className="flex flex-wrap gap-2 justify-center">
            <ReactionButton
                reactionType={'like'}
                onClick={() => handleReaction('like')}
                reactionCount={counts.like || 0}
                userReacted={userReactions.includes('like')}
            />
            <ReactionButton
                reactionType={'dislike'}
                onClick={() => handleReaction('dislike')}
                reactionCount={counts.dislike || 0}
                userReacted={userReactions.includes('dislike')}
            />
            <ReactionButton
                reactionType={'hot'}
                onClick={() => handleReaction('hot')}
                reactionCount={counts.hot || 0}
                userReacted={userReactions.includes('hot')}
            />
            <ReactionButton
                reactionType={'sequel_request'}
                onClick={() => handleReaction('sequel_request')}
                reactionCount={counts.sequel_request || 0}
                userReacted={userReactions.includes('sequel_request')}
            />
        </div>
    );
};