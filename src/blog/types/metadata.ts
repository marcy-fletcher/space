export const ExplicitnessKeys = [
    "safe",
    "mature",
    "explicit"
] as const;

export type Explicitness =
    typeof ExplicitnessKeys[number];

export interface Metadata {
    id: number;
    explicitness: Explicitness;
    slug: string;
}