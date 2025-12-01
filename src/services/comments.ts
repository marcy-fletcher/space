import {supabase} from "./supabase.ts";
import {Comment, CommentFormData} from "../types/comments.ts";

interface CommentDto {
    id: number;
    user_id: string;
    parent_id: number;
    content: string;
    created_at: string;
    updated_at: string;
    user_profiles: {
        id: string;
        name: string;
    }
}

export class CommentService {

    static mapComment(dto: CommentDto) : Comment {
        return {
            id: dto.id,
            userId: dto.user_id,
            userName: dto.user_profiles?.name ?? '',
            parentId: dto.parent_id,
            content: dto.content,
            createdAt: dto.created_at,
            updatedAt: dto.updated_at
        }
    }

    static async createComment(
        postId: string,
        commentData: CommentFormData,
        userId: string
    ): Promise<Comment> {
        const { data, error } = await supabase
            .from('post_comments')
            .insert({
                post_id: postId,
                user_id: userId,
                parent_id: commentData.parentId || null,
                content: commentData.content.trim(),
            })
            .select('*, user_profiles(*)')
            .single();

        if (error) throw error;
        return this.mapComment(data);
    }

    static async updateComment(
        commentId: number,
        content: string
    ): Promise<Comment> {
        const { data, error } = await supabase
            .from('post_comments')
            .update({
                content: content.trim()
            })
            .eq('id', commentId)
            .select('*, user_profiles(*)')
            .single();

        if (error) throw error;
        return this.mapComment(data);
    }

    static async deleteComment(commentId: number): Promise<void> {
        const { error } = await supabase.rpc(
            'delete_comment',
            { comment_id_input: commentId }
        );

        if (error) throw error;
    }
}