export interface NumericId {
    id: number;
}

export interface StringId {
    id: string;
}

export interface PostIdentity {
    id?: number;
    slug?: string;
}

export function parsePostId(value?: string) : PostIdentity | undefined {
    if (!value)
        return undefined;

    return {
        id: isNaN(Number(value)) ? undefined : Number(value),
        slug: isNaN(Number(value)) ? value : undefined
    }
}