import type {RoleKey} from '../types/roles.ts'
import type {
    Policy,
    RequireRole,
    RequireAuth,
    RequirePredicate, RequireNoAuth,
} from './policy.ts'
import type {PolicyContext} from './policyContext.ts'

export const auth = (): RequireAuth => ({ type: 'auth' })
export const noAuth = (): RequireNoAuth => ({ type: 'noAuth' })

export const role = (...roles: RoleKey[]): RequireRole => ({
    type: 'role',
    roles,
})

export const predicate = (
    evaluate: (ctx: PolicyContext) => boolean
): RequirePredicate => ({
    type: 'predicate',
    evaluate,
})

export const policy = (...rules: Policy['rules']): Policy => ({
    rules,
})
