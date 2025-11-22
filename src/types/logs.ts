export type LogType =
    | 'authorization'
    | 'api_call'
    | 'system_event'
    | 'user_action'
    | 'error'
    | 'performance';

export interface LogEntry {
    user_id: string;
    session_id: string;
    log_type: LogType;
    action: string;
    message: string;
    additional_data?: Record<string, any>;
    ip_address?: string;
    user_agent?: string;
    created_at: string;
}

export interface LogEntryInput {
    log_type: LogType;
    action: string;
    message: string;
    additional_data?: Record<string, any>;
}