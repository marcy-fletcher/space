export interface BugReport {
    id?: string;
    subject: string;
    message: string;
    email?: string;
    user_agent?: string;
    page_url?: string;
    include_technical_info: boolean;
    created_at?: string;
}

export interface BugReportFormData {
    subject: string;
    message: string;
    email: string;
    includeTechnicalInfo: boolean;
}