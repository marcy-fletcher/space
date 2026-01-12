import type {Explicitness} from "../../types/metadata.ts";

export interface MetadataDto {
    id: number;
    slug: string;
    explicitness: Explicitness;
}