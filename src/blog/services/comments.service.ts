import {getSupabase} from "../../utils/supabase.ts";
import type {Comment} from "../types/comment.ts";
import {mapComment} from "../mappers/comment.mapper.ts";

export async function getComments(postId: number): Promise<Comment[]> {
    const supabase = await getSupabase();

    const { data, error } = await supabase
        .schema('blog')
        .from('comments_with_author')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });

    if (error) {
        throw error;
    }

    if (!data) {
        throw new Error('No post data.');
    }

    return data.map(mapComment)
}

export async function insertComment(postId: number, content: string, replyId?:number): Promise<number> {
    const supabase = await getSupabase();

    const { data, error } = await supabase
        .schema('blog')
        .from('comments')
        .insert({
            post_id: postId,
            content,
            reply_id: replyId
        })
        .select('id')
        .single<{id:number}>();

    if (error)
        throw error;

    return data?.id;
}

export async function removeComment(commentId: number): Promise<void> {
    const supabase = await getSupabase();

    const { error } = await supabase
        .schema('blog')
        .rpc('delete_comment', {
            comment_id: commentId,
        })

    if (error)
        throw error;
}