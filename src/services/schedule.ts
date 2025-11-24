import {supabase} from "./supabase.ts";
import {WritingProject} from "../types/schedule.ts";

export class ScheduleService {
    static async getWritingProjects(): Promise<WritingProject[]> {
        try {
            const { data, error } = await supabase
            .from('schedule')
            .select(`
              *,
              subscription_tiers (*)
            `)
            .order('planned_date', { ascending: false });

            if (error) {
                console.error('Error fetching writing projects:', error);
                throw new Error(`Failed to load schedule: ${error.message}`);
            }

            return data.map(project => ({
                id: project.id,
                title: project.title,
                description: project.description,
                status: project.status,
                platforms: project.platforms,
                startDate: project.start_date,
                plannedDate: project.planned_date,
                completedDate: project.completed_date,
                completedLinks: project.completed_links,
                subscription: {
                    requiredTierId: project.subscription_tiers.id,
                    requiredTierTitle: project.subscription_tiers.title,
                    requiredTierLevel: project.subscription_tiers.level
                }
            }));

        } catch (error) {
            console.error('Error in getWritingProjects:', error);
            throw error;
        }
    }
}