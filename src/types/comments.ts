export interface Comment {
    id: number;
    userId: string;
    userName: string;
    parentId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface CommentFormData {
    content: string;
    parentId?: number | null;
}