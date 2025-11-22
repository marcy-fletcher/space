import {LogEntryInput} from "../types/logs.ts";
import {SessionManager} from "./sessionManager.ts";
import {supabase} from "./supabase.ts";

export class LoggingService {
    private static instance: LoggingService;
    private sessionManager: SessionManager;
    private isInitialized: boolean = false;

    private constructor() {
        this.sessionManager = SessionManager.getInstance();
        this.isInitialized = true;
    }

    public static getInstance(): LoggingService {
        if (!LoggingService.instance) {
            LoggingService.instance = new LoggingService();
        }
        return LoggingService.instance;
    }

    public async log(logData: LogEntryInput): Promise<boolean> {
        if (!this.isInitialized) {
            console.error('LoggingService not initialized');
            return false;
        }

        try {
            const sessionData = this.sessionManager.getSessionData();

            const { error } = await supabase
                .rpc('create_log_entry', {
                    p_log_type: logData.log_type,
                    p_action: logData.action,
                    p_message: logData.message,
                    p_additional_data: logData.additional_data || null,
                    p_session_id: sessionData.session_id,
                    p_ip_address: sessionData.ip_address,
                    p_user_agent: sessionData.user_agent
                });

            if (error) {
                console.error('Error creating log entry:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Unexpected error in logging service:', error);
            return false;
        }
    }

    public async logAuthorization(action: string, message: string, additionalData?: Record<string, any>): Promise<boolean> {
        return this.log({
            log_type: 'authorization',
            action,
            message,
            additional_data: additionalData
        });
    }

    public async logApiCall(action: string, message: string, additionalData?: Record<string, any>): Promise<boolean> {
        return this.log({
            log_type: 'api_call',
            action,
            message,
            additional_data: additionalData
        });
    }

    public async logSystemEvent(action: string, message: string, additionalData?: Record<string, any>): Promise<boolean> {
        return this.log({
            log_type: 'system_event',
            action,
            message,
            additional_data: additionalData
        });
    }

    public async logUserAction(action: string, message: string, additionalData?: Record<string, any>): Promise<boolean> {
        return this.log({
            log_type: 'user_action',
            action,
            message,
            additional_data: additionalData
        });
    }

    public async logError(action: string, message: string, additionalData?: Record<string, any>): Promise<boolean> {
        return this.log({
            log_type: 'error',
            action,
            message,
            additional_data: additionalData
        });
    }

    public async logPerformance(action: string, message: string, additionalData?: Record<string, any>): Promise<boolean> {
        return this.log({
            log_type: 'performance',
            action,
            message,
            additional_data: additionalData
        });
    }

    public refreshSession(): void {
        this.sessionManager.refreshSession();
    }
}

export const logging = LoggingService.getInstance();