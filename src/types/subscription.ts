export interface Subscription {
    id: string;
    title: string;
    level: number;
}

export interface TierDetails {
    id: string;
    title: string;
    level: number;
    color: "pink" | "red" | "purple";
    description: string;
    autoApproval: boolean;
    warning?: {
        title: string,
        icon: "warning" | "strong-warning",
        description?: string,
        severity: "medium" | "high"
    },
}

export const tierDetails: TierDetails[] = [
    {
        id: 'e0a0bdc5-0b1e-4ad4-bd96-1661e9993eed',
        level: 1,
        title: "The Acolyte",
        color: "pink",
        description: "The standard account tier - most of my work is available here. Just create an account, and you're good to go!",
        autoApproval: true
    },
    {
        id: 'b29bb155-4f75-4ad6-849e-e2c54493e3d7',
        level: 500,
        title: "The High Priest",
        color: "red",
        description: "This content may include offensive, sensitive, or controversial themes - primarily involving satire or mockery of political beliefs and social norms, slurs, and various -phobias, sometimes presented intensely by characters. It may be particularly offensive to a modern Western audience.",
        autoApproval: true,
        warning: {
            title: "I generally do not recommend this tier if you are easily affected by social or political topics.",
            icon: "warning",
            severity: "medium"
        },
    },
    {
        id: '596a3910-0a52-4f31-ad0c-6e893351b0ab',
        level: 900,
        title: "The Cult Leader",
        color: "purple",
        description: "This tier may contain extremely brutal and graphic depictions of mental and physical abuse and violence of various kinds, and is significantly more unhinged than the previous tier.",
        autoApproval: false,
        warning: {
            title: "Strong Recommendation Against",
            description: "I strongly advise against accessing this tier unless you are absolutely sure this is what you want and are actively seeking it.",
            icon: "strong-warning",
            severity: "high"
        },
    }
];