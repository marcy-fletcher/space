export interface Visit {
    id: number;
    link_name: string;
    user_ip?: string;
    user_agent?: string;
    referrer?: string;
    created_at: string;
}

export interface CreateVisitDTO {
    link_name: string;
    user_ip?: string;
    user_agent?: string;
    referrer?: string;
}