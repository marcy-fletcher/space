export interface WritingProject {
    id: string;
    title: string;
    description?: string;
    status: 'planned' | 'started' | 'completed';
    platforms: ('deviantart' | 'website')[];
    startDate?: string;
    plannedDate: string;
    completedDate?: string;
    completedLinks?: {
        website: string;
        deviantart: string;
    }
    subscription: {
        requiredTierId: string;
        requiredTierTitle: string;
        requiredTierLevel: number;
    };
}