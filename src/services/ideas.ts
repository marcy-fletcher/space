import {IdeaSubmission} from "../types/ideas.ts";
import {supabase} from "./supabase.ts";
import {logging} from "./logging.ts";

export class IdeaService {
    static async submitIdea(ideaData: IdeaSubmission): Promise<boolean> {
        try {
            if (ideaData.idea.length > 2000) {
                return false;
            }

            const { error } = await supabase
                .from('ideas')
                .insert(ideaData);

            if (error) {
                console.error('Supabase error:', error);
                return false;
            }

            await logging.logUserAction('Idea Contribution', 'User contributed a new idea');

            return true;

        } catch (error) {
            console.error('Unexpected error submitting idea:', error);
            return false;
        }
    }
}