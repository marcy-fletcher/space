// Some data might be null if user has no access to the post
export interface Post {
    id: string;
    title?: string;
    tags?: string[];
    preview?: string;
    previewPicture?: string;
    fullContent?: string;
    createdAt: string;
    ageRestriction?: "everyone" | "mature" | "explicit",
    transformations?: Array<{
        type: string;
        from: string;
        to: string;
    }>;
    warnings?: Array<{
        type: string;
        level: "mild" | "moderate" | "graphic" | "extreme";
    }>;
    subscription: {
        requiredTierId: string;
        requiredTierLevel: number;
        requiredTierTitle: string;
    };
    relatedPosts?: Array<{
        id: string;
        title?: string;
        preview?: string;
        createdAt: string;
        subscription: {
            requiredTierId: string;
            requiredTierLevel: number;
            requiredTierTitle: string;
        };
    }>;
    references?: {
        people?: Array<{
            name: string;
            url?: string;
            description: string;
            picture?: string;
        }>;
        franchise?: Array<{
            title: string;
            url?: string;
            picture?: string;
        }>
    };
    reactions: {
        like: number;
        dislike: number;
        hot: number;
        sequel_request: number;
    }
}