import type {RoleKey} from "../types/roles.ts";

export interface CustomJwtClaims {
    user_role: RoleKey
}