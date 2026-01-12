import {createContext, useEffect, useState} from 'react';
import {useAuthStore} from '../hooks/useAuthStore.ts';
import {decodeCustomClaims} from '../utils/decodeCustomClaims.ts';
import type {Session, SupabaseClient} from "@supabase/supabase-js";
import * as React from "react";
import {getIdentity} from "../services/auth.service.ts";
import {skipToken, useQuery} from "@tanstack/react-query";
import {getSupabase} from "../../utils/supabase.ts";
import {getSubscription} from "../services/subscriptions.service.ts"; // Now async

const AuthContext = createContext<null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {
        user, setAuth,
        setIdentity,
        setRole, clearAuth, setSubscription
    } = useAuthStore();

    const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

    useEffect(() => {
        getSupabase().then(client => {
            setSupabase(client);
        });
    }, []);

    function handleSession(session: Session) {
        setAuth(session);

        const {user_role} = decodeCustomClaims(session.access_token);
        setRole(user_role);
    }

    const {data: userData} = useQuery({
        queryKey: ["self-identity", user?.id],
        queryFn: user?.id ? async () => {

            if (!supabase)
                throw new Error("Supabase not ready");

            const identityPromise = getIdentity(user!.id).catch(() => null);
            const subscriptionPromise = getSubscription(user!.id).catch(() => null);

            const [identity, subscription] = await Promise.all([
                identityPromise,
                subscriptionPromise
            ]);

            return {identity, subscription};
        } : skipToken,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 30,
        enabled: !!supabase && !!user?.id
    });

    useEffect(() => {
        if (userData) {
            if (userData.identity) {
                setIdentity(userData.identity.username, userData.identity.pictureUrl);
            }
            if (userData.subscription) {
                setSubscription(userData.subscription);
            }
        }
    }, [userData]);

    useEffect(() => {
        if (!supabase) return;

        supabase.auth.getSession().then(({data}) => {
            if (data.session) {
                handleSession(data.session);
            } else {
                clearAuth();
            }
        });

        const {data: listener} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (session) handleSession(session);
                else clearAuth();
            }
        );

        return () => listener.subscription.unsubscribe();
    }, [supabase]);

    return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};