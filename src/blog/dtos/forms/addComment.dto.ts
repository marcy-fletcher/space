export interface AddCommentDto {
    postId: number;
    replyId?: number;
    content: string;
}