import React, { useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Comment, CommentFormData } from '../../../types/comments.ts';
import { useAuth } from "../../../contexts/AuthContext.tsx";
import { CommentService } from "../../../services/comments.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import {useDebugLog} from "../../../hooks/useDebugLog.ts";

interface CommentSectionProps {
    postId: string;
    initialComments?: Comment[];
    onCommentAdded?: (comment: Comment) => void;
    onCommentUpdated?: (comment: Comment) => void;
    onCommentDeleted?: (commentId: number) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
                                                           postId,
                                                           initialComments = [],
                                                           onCommentAdded,
                                                           onCommentUpdated,
                                                           onCommentDeleted
                                                       }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [editingComment, setEditingComment] = useState<number | null>(null);

    const { debugLog } = useDebugLog();

    const buildCommentTree = (commentsList: Comment[]): Comment[] => {
        const commentMap = new Map<number, Comment & { replies: Comment[] }>();
        const roots: (Comment & { replies: Comment[] })[] = [];

        commentsList.forEach(comment => {
            commentMap.set(comment.id, { ...comment, replies: [] });
        });

        commentsList.forEach(comment => {
            const commentNode = commentMap.get(comment.id);
            if (!commentNode) return;

            if (comment.parentId && commentMap.has(comment.parentId)) {
                const parent = commentMap.get(comment.parentId);
                parent?.replies.push(commentNode);
            } else {
                roots.push(commentNode);
            }
        });

        return roots;
    };

    const commentTree = buildCommentTree(comments);

    const handleAddComment = async (formData: CommentFormData) => {
        if (!user) {
            setError('You must be logged in to comment');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const newComment = await CommentService.createComment(
                postId,
                formData,
                user.id
            );

            const commentWithUser = {
                ...newComment
            };

            if (!formData.parentId)
                setComments(prev => [commentWithUser, ...prev]);
            else
                setComments(prev => [...prev, commentWithUser]);

            setReplyingTo(null);
            onCommentAdded?.(commentWithUser);
            debugLog('comment_added', { post_id: postId })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add comment');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateComment = async (commentId: number, content: string) => {
        try {
            setLoading(true);
            const updatedComment = await CommentService.updateComment(commentId, content);

            setComments(prev => prev.map(comment =>
                comment.id === commentId ? updatedComment : comment
            ));

            setEditingComment(null);
            onCommentUpdated?.(updatedComment);

            debugLog('comment_updated', { post_id: postId })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update comment');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) {
            return;
        }

        try {
            setLoading(true);
            await CommentService.deleteComment(commentId);

            setComments(prev => prev.filter(comment =>
                comment.id !== commentId &&
                comment.parentId !== commentId
            ));

            onCommentDeleted?.(commentId);

            debugLog('comment_deleted', { post_id: postId })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete comment');
        } finally {
            setLoading(false);
        }
    };

    const handleReply = (commentId: number) => {
        setReplyingTo(commentId);
        setEditingComment(null);
    };

    const handleEdit = (commentId: number) => {
        setEditingComment(commentId);
        setReplyingTo(null);
    };

    const handleCancel = () => {
        setReplyingTo(null);
        setEditingComment(null);
    };

    if (loading && comments.length === 0) {
        return (
            <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4 mt-12">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faComment} className="text-gray-600 dark:text-gray-400 h-4 w-4" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Comments
                        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                            ({comments.length})
                        </span>
                    </h2>
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Main comment form */}
            {user ? (
                <div className="mb-4">
                    <CommentForm
                        onSubmit={handleAddComment}
                        loading={loading}
                        onCancel={handleCancel}
                        placeholder="Share your thoughts..."
                    />
                </div>
            ) : (
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Please log in to leave a comment.
                    </p>
                </div>
            )}

            {/* Comments list */}
            {commentTree.length > 0 ? (
                <div className="space-y-3">
                    {commentTree.map(comment => (
                        <CommentList
                            key={comment.id}
                            comment={comment}
                            depth={0}
                            replyingTo={replyingTo}
                            editingComment={editingComment}
                            currentUserId={user?.id}
                            onReply={handleReply}
                            onEdit={handleEdit}
                            onDelete={handleDeleteComment}
                            onUpdate={handleUpdateComment}
                            onCancel={handleCancel}
                            onAddComment={handleAddComment}
                            loading={loading}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                    <FontAwesomeIcon
                        icon={faCommentDots}
                        className="h-8 w-8 text-gray-400 dark:text-gray-600 mb-2"
                    />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                </div>
            )}
        </div>
    );
};

export default CommentSection;