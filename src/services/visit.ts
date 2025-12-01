import {CreateVisitDTO, Visit} from "../types/visits.ts";
import {supabase} from "./supabase.ts";

class VisitService {
    async trackVisit(linkName: string): Promise<Visit | null> {
        try {
            const userAgent = navigator.userAgent;
            const referrer = document.referrer;

            let ipAddress: string | undefined = undefined;

            try {
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                if (ipResponse.ok) {
                    const ipData = await ipResponse.json();
                    ipAddress = ipData.ip;
                }
            } catch (ipError) { }

            const visitData: CreateVisitDTO = {
                link_name: linkName,
                user_agent: userAgent,
                referrer: referrer,
                user_ip: ipAddress
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