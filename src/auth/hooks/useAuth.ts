import {useAuthStore} from './useAuthStore.ts'
import {signIn, signOut, signUp} from '../services/auth.service.ts'
import type {RoleKey} from "../types/roles.ts";

export function useAuth() {
    const {
        user,
        username,
        picture,
        session,
        role,
        initialized,
        subscription
    } = useAuthStore()

    return {
        user,
        username,
        picture,
        session,
        role,
        initialized,
        subscription,

        isAuthenticated: !!user,
        hasRole: (requiredRole: RoleKey) => role === requiredRole,

        signUp,
        signIn,
        signOut,
    }
}