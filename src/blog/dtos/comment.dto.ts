export interface CommentDto {
    id: number;
    post_id: number;
    author_id: string;
    reply_id?: number;
    content: string;
    created_at: string;
    username: string;
    picture?: string;
}
