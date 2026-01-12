export const ReactionTypes = {
    like: 'like',
    dislike: 'dislike',
    hot: 'hot',
    sequel_request: 'sequel_request'
} as const;

export type ReactionType = keyof typeof ReactionTypes;

export interface Reaction {
    userId: string;
    postId: string;
    reaction: ReactionType;
}

export type ReactionsStats = {
    [key in ReactionType]: {
        count: number;
        userHasReacted: boolean;
    };
}