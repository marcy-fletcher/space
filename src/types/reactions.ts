export type ReactionType = 'like' | 'dislike' | 'sequel_request' | 'hot';

export interface ReactionCounts {
    like?: number;
    dislike?: number;
    sequel_request?: number;
    hot?: number;
    [key: string]: number | undefined;
}

export interface PostReactions {
    counts: ReactionCounts;
    user_reactions: ReactionType[];
    total_reactions: number;
}

export interface ToggleReactionResult extends PostReactions {
    action: 'added' | 'removed';
    reaction_type: ReactionType;
}


export interface PostReaction {
    postId: string;
    userId: string;
    reactionType: ReactionType;
    createdAt: string;
    postTitle: string;
    userName: string;
}