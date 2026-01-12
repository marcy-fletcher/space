import type {WarningDto} from "../primitives/warning.dto.ts";
import type {Explicitness} from "../../types/metadata.ts";
import type {ReferenceDto} from "../primitives/reference.dto.ts";
import type {TransformationDto} from "../primitives/transformation.dto.ts";
import type {Tag} from "../../types/tag.ts";
import type {NumericId} from "../../types/id.ts";
import type {RoleKey} from "../../../auth/types/roles.ts";

export interface RequiredRole {
    role_key: RoleKey
}

export interface CreatePostDto {
    slug?: string;
    title: string;
    summary: string;
    content: string;
    picture_url: string;
    tags: Tag[]
    warnings: Omit<WarningDto, 'id' | 'post_id'>[];
    transformations: Omit<TransformationDto, 'id' | 'post_id'>[];
    explicitness: Explicitness;
    post_references: Omit<ReferenceDto, 'id' | 'post_id'>[];
    related_posts: NumericId[];
    required_roles: RequiredRole[];
}