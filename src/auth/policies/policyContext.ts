import type {RoleKey} from "../types/roles.ts";

export interface PolicyContext {
    isAuthenticated: boolean
    role: RoleKey
}