export const TransformationTypeKeys = [
    "gender",
    "orientation",
    "age",
    "personality",
    "race",
    "body"
] as const;

export type TransformationType = typeof TransformationTypeKeys[number];

export interface Transformation {
    id: number;
    postId: number;
    from: string;
    to: string;
    type: TransformationType;
}