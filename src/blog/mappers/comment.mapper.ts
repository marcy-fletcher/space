import type {CommentDto} from "../dtos/comment.dto.ts";
import type {Comment} from "../types/comment.ts";

export function mapComment(dto: CommentDto): Comment {
    return {
        id: dto.id,
        postId: dto.post_id,
        replyId: dto.reply_id,
        authorName: dto.username,
        authorId: dto.author_id,
        createdAt: dto.created_at,
        content: dto.content
    }
}