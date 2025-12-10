import {supabase} from "../services/supabase.ts";

export const useDebugLog = () => {
    const debugLog = async (action: string, metadata = {}) => {
        try {
            const { error } = await supabase.rpc('debug_log', {
                action,
                custom_metadata: metadata
            })

            if (error)
                throw error

            return {
                success: true,
                error: null
            }
        } catch (error) {
            return {
                success: false,
                error: error
            }
        }
    }

    return { debugLog }
}