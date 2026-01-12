import {getSupabase} from "../../utils/supabase.ts";

export const DEBUG_LOGGING_ALLOWED_KEY = 'debug_logging_allowed';

export const EventCodes = {
    ageConfirm: 'L01',
    signUp: 'L02',
    signIn: 'L03',
    pageVisit: 'L04',
    inviteUsed: 'L05',
    inviteCreated: 'L06',
    inviteDeleted: 'L07',
    reactionAdded: 'L08',
    reactionRemoved: 'L09',
} as const

export const ErrorCodes = {
    authenticationError: 'E01',
    registrationError: 'E02',
    ideaSubmitError: 'E03',
    inviteKeyError: 'E04',
    inviteCreateError: 'E05',
    reactionToggleError: 'E06',

    notFound: 'E404',
    postNotFound: 'E404P',
    unauthorized: 'E401',
    geoBlock: 'E403G',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes]
export type EventCode = typeof EventCodes[keyof typeof EventCodes]

export async function logError<T>(errorCode: ErrorCode, metadata?: T) {
    const loggingAllowed =
        localStorage.getItem(DEBUG_LOGGING_ALLOWED_KEY) === 'true';

    if (!loggingAllowed)
        return;

    const supabase = await getSupabase();

    await supabase.schema('logging').rpc('log_activity', {
        p_event: errorCode,
        p_metadata: metadata,
    });
}

let lastLogTime = 0;

const LOG_COOLDOWN_MS = 200;

export async function logInfo<T>(event: EventCode, metadata?: T): Promise<void> {
    const loggingAllowed =
        localStorage.getItem(DEBUG_LOGGING_ALLOWED_KEY) === 'true';

    if (!loggingAllowed)
        return;

    const now = Date.now();

    if (now - lastLogTime < LOG_COOLDOWN_MS)
        return;

    lastLogTime = now;

    const supabase = await getSupabase();

    await supabase.schema('logging').rpc('log_debug', {
        p_event: event,
        p_metadata: metadata,
    });
}

export async function trackVisit(key: string) {

    const now = Date.now();

    if (now - lastLogTime < LOG_COOLDOWN_MS)
        return;

    lastLogTime = now;

    const supabase = await getSupabase();

    await supabase
        .schema('logging')
        .from('visits')
        .insert({
            link: key
        });
}