import type {Tag} from "./tag.ts";
import type {Metadata} from "./metadata.ts";
import type {Reference} from "./reference.ts";
import type {RoleKey} from "../../auth/types/roles.ts";
import type {Warning} from "./warning.ts";

export interface RelatedPost {
    id: number;
    title?: string;
    summary?: string;
    slug?: string;
    createdAt: string;
    pictureUrl?: string;
    requiredRoles?: RoleKey[]
}

export interface Post {
    id: number;
    slug: string;
    isPublished: boolean;
    createdAt: string;
    title: string;
    content: string;
    tags?: Tag[];
    metadata?: Metadata;
    references?: Omit<Reference, 'id' | 'postId'>[];
    relatedPosts?: RelatedPost[];
    userAgreement: boolean;
    warnings: Omit<Warning, 'id' | 'postId'>[];
}