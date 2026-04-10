import CredentialsCheckError from "../errors.ts";
import type {UserIdentity} from "../types/roles.ts";
import {getSupabase} from "../../utils/supabase.ts";
import {getAppRedirectUrl} from "../../utils/supabase.ts";

export async function signIn(email: string, password: string) {
    const supabase = await getSupabase();

    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;

    return data;
}

export async function validateCredentialsAvailability(email: string, username: string) {
    const supabase = await getSupabase();

    const {data, error} = await supabase
        .schema("user_management")
        .rpc("check_credentials_availability", {
            email_input: email,
            username_input: username,
        })
        .single<{
            is_email_available: boolean;
            is_username_available: boolean;
        }>();

    if (error || !data) {
        throw new Error("Internal error");
    }

    if (!data.is_email_available || !data.is_username_available) {
        throw new CredentialsCheckError(
            !data.is_username_available,
            !data.is_email_available
        );
    }
}

export async function signUp(username: string, email: string, password: string) {
    await validateCredentialsAvailability(email, username);

    const supabase = await getSupabase();

    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {username},
            emailRedirectTo: getAppRedirectUrl(),
        },
    });

    if (error) throw error;

    return data;
}

function getRecoveryTokens() {
    const hash = window.location.hash;
    const queryString = hash.includes('#') ? hash.split('#').pop() : '';
    const params = new URLSearchParams(queryString);

    return {
        access_token: params.get('access_token'),
        refresh_token: params.get('refresh_token'),
        type: params.get('type'),
    }
}

export async function initRecoverySession() {
    const supabase = await getSupabase();
    const { access_token, refresh_token, type } = getRecoveryTokens()

    if (type !== 'recovery' || !access_token || !refresh_token) {
        throw new Error('Missing recovery tokens in URL')
    }

    const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
    })

    if (error)
        throw error
}

export async function signOut() {
    const supabase = await getSupabase();

    const {error} = await supabase.auth.signOut();

    if (error) throw error;
}

export async function requestPasswordReset(email: string) {
    const supabase = await getSupabase();

    const {data, error} = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://marcy-fletcher.github.io/space/#/restore-password/update'
    });

    if (error) throw error;

    return data;
}

export async function updatePassword(password: string) {
    const supabase = await getSupabase();

    const {data, error} = await supabase.auth.updateUser({password});

    if (error) throw error;

    await supabase.auth.signOut();

    return data;
}

export async function getIdentity(userId: string): Promise<UserIdentity | undefined> {
    const supabase = await getSupabase();

    const {data, error} = await supabase
        .schema("user_management")
        .from("user_identities")
        .select("*")
        .eq("id", userId)
        .maybeSingle<{
            username: string;
            picture: string;
        }>();

    if (error || !data) {
        throw new Error("Internal error");
    }

    return {
        username: data.username,
        pictureUrl: data.picture
    };
}
