import type {RoleKey} from '../types/roles.ts'
import type {PolicyContext} from './policyContext.ts'

export type RequireRole = { type: 'role'; roles: RoleKey[] }
export type RequireAuth = { type: 'auth' }
export type RequireNoAuth = { type: 'noAuth' }

export type RequirePredicate = {
    type: 'predicate'
    evaluate: (ctx: PolicyContext) => boolean
}

export type PolicyRule =
    | RequireAuth
    | RequireNoAuth
    | RequirePredicate
    | RequireRole

export interface Policy {
    rules: PolicyRule[]
}