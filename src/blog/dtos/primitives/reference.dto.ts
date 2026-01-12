import type {ReferenceType} from "../../types/reference.ts";

export interface ReferenceDto {
    id: number;
    post_id: number;
    name: string;
    url?: string;
    picture_url?: string;
    description?: string;
    type: ReferenceType;
}