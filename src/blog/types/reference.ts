export const ReferenceTypeKeys = [
    "person",
    "franchise",
    "event",
    "other"
] as const;

export type ReferenceType = typeof ReferenceTypeKeys[number];

export interface Reference {
    id: number;
    postId: number;
    name: string;
    url?: string;
    pictureUrl?: string;
    description?: string;
    type: ReferenceType;
}