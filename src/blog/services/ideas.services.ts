import { getSupabase } from "../../utils/supabase.ts"; // the dynamic getter we defined earlier

export async function submitIdea(text: string, name?: string): Promise<void> {
    const supabase = await getSupabase();

    const { error } = await supabase
        .schema('blog')
        .from('ideas')
        .insert({
            name: name,
            text: text
        });

    if (error) {
        throw error;
    }
}