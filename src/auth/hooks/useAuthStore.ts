import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import type {User, Session} from '@supabase/supabase-js'
import type {RoleKey} from "../types/roles.ts";
import type {Subscription} from "../types/subscription.ts";

interface AuthState {
    user: User | null
    session: Session | null
    username: string | null
    picture: string | null
    subscription: Subscription | null
    role: RoleKey

    initialized: boolean
}

interface AuthActions {
    setAuth: (session: Session | null) => void
    setRole: (role: RoleKey) => void
    setIdentity: (username?: string, pictureUrl?: string) => void
    setSubscription: (subscription: Subscription) => void
    clearAuth: () => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
    devtools(
        (set) => ({
            user: null,
            session: null,
            roles: [],
            permissions: [],
            initialized: false,

            setAuth: (session) =>
                set(
                    {
                        session,
                        user: session?.user ?? null,
                        initialized: true,
                    },
                    false,
                    'auth/setAuth'
                ),

            setRole: (role) =>
                set(
                    {
                        role
                    },
                    false,
                    'auth/setRole'
                ),

            setIdentity: (username?, pictureUrl?: string) =>
                set(
                    {
                        username: username ?? null,
                        picture: pictureUrl ?? null,
                    },
                    false,
                    'auth/setIdentity'
                ),

            setSubscription: (subscription?: Subscription) =>
                set(
                    {
                        subscription
                    },
                    false,
                    'auth/setSubscription'
                ),

            clearAuth: () =>
                set(
                    {
                        user: null,
                        username: null,
                        picture: null,
                        session: null,
                        role: 'guest',
                        initialized: true,
                    },
                    false,
                    'auth/clearAuth'
                ),
        }),
        {
            name: 'AuthStore'
        }
    )
)
