import {CreateVisitDTO, Visit} from "../types/visits.ts";
import {supabase} from "./supabase.ts";

class VisitService {
    async trackVisit(linkName: string): Promise<Visit | null> {
        try {
            const visitData: CreateVisitDTO = {
                link_name: linkName
            };

            const { data, error } = await supabase
                .from('visits')
                .insert([visitData]);

            if (error) {
                return null;
            }

            return data;
        } catch (error) {
            return null;
        }
    }
}

export const visitService = new VisitService();