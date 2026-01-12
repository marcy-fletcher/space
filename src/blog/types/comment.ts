export interface Comment {
    id: number;
    postId: number;
    authorId: string;
    authorName: string;
    replyId?: number;
    content: string;
    createdAt: string;
}