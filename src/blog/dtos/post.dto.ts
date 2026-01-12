import type {Explicitness} from "../types/metadata.ts";
import type {Tag} from "../types/tag.ts";
import type {ReferenceType} from "../types/reference.ts";
import type {RoleKey} from "../../auth/types/roles.ts";
import type {WarningLevel} from "../types/warning.ts";

export interface PostDto {
    id: number;
    is_published: boolean;
    created_at: string;
    post_contents: {
        title: string;
        content: string;
    }
    post_metadata: {
        explicitness: Explicitness;
        slug: string;
    }
    post_tags: {
        tags: Tag
    }[]
    post_references: {
        url:string
        name:string
        picture_url:string
        description:string
        type: ReferenceType
    }[],
    post_warnings: {
        text: string;
        level: WarningLevel;
    }[]
    post_relations: {
      post_b_id?: {
          id:number,
          created_at: string
          post_access_roles: {
              role_key: RoleKey
          }[]
          post_contents?: {
              title: string
              summary:string
              picture_url?: string;
          },
          post_metadata?: {
              slug: string
          }
      }
    }[],
    user_agreements: {
        is_agreed: boolean
    }[]
}