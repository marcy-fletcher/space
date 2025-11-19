import {BugReport, BugReportFormData} from "../types/bugReport.ts";
import {supabase} from "./supabase.ts";

export class BugReportService {
    static async submitBugReport(
        formData: BugReportFormData
    ): Promise<{ success: boolean; error?: string }> {
        try {
            const bugReport: Omit<BugReport, 'id' | 'created_at'> = {
                subject: formData.subject,
                message: formData.message,
                email: formData.email || undefined,
                user_agent: formData.includeTechnicalInfo ? navigator.userAgent : undefined,
                page_url: formData.includeTechnicalInfo ? window.location.href : undefined,
                include_technical_info: formData.includeTechnicalInfo,
            };

            const { error } = await supabase
                .from('bug_reports')
                .insert(bugReport);

            if (error) {
                console.error('Supabase error:', error);
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error) {
            console.error('Error submitting bug report:', error);
            return { success: false, error: 'Failed to submit bug report' };
        }
    }
}