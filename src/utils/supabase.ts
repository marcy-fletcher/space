import type {SupabaseClient} from "@supabase/supabase-js";

let supabaseClientPromise: Promise<ReturnType<typeof import('@supabase/supabase-js').createClient>> | null = null;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const getSupabase = async (): Promise<SupabaseClient> => {
    if (supabaseClientPromise) {
        return supabaseClientPromise;
    }

    supabaseClientPromise = (async () => {
        const { createClient } = await import('@supabase/supabase-js');
        return createClient(supabaseUrl, supabaseAnonKey);
    })();

    return supabaseClientPromise;
};
