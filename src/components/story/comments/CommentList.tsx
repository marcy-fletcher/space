import React, { useState } from 'react';
import CommentItem from './CommentItem';
import { Comment, CommentFormData } from '../../../types/comments.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface CommentListProps {
    comment: Comment & { replies?: Comment[] };
    depth: number;
    replyingTo: number | null;
    editingComment: number | null;
    currentUserId?: string;
    onReply: (commentId: number) => void;
    onEdit: (commentId: number) => void;
    onDelete: (commentId: number) => void;
    onUpdate: (commentId: number, content: string) => void;
    onCancel: () => void;
    onAddComment: (formData: CommentFormData) => void;
    loading: boolean;
}

const CommentList: React.FC<CommentListProps> = ({
                                                     comment,
                                                     depth,
                                                     replyingTo,
                                                     editingComment,
                                                     currentUserId,
                                                     onReply,
                                                     onEdit,
                                                     onDelete,
                                                     onUpdate,
                                                     onCancel,
                                                     onAddComment,
                                                     loading
                                                 }) => {
    const [showReplies, setShowReplies] = useState(true);

    const hasReplies = comment.replies && comment.replies.length > 0;
    const maxDepth = 64;

    const handleToggleReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <div className={depth > 0 ? 'ml-3 pl-3 border-l border-gray-200 dark:border-gray-700' : ''}>
            <CommentItem
                comment={comment}
                isReplying={replyingTo === comment.id}
                isEditing={editingComment === comment.id}
                isOwnComment={comment.userId === currentUserId}
                onReply={() => onReply(comment.id)}
                onEdit={() => onEdit(comment.id)}
                onDelete={() => onDelete(comment.id)}
                onUpdate={(content) => onUpdate(comment.id, content)}
                onCancel={onCancel}
                onAddComment={onAddComment}
                loading={loading}
            />

            {hasReplies && depth < maxDepth && (
                <div className="mt-2">
                    <button
                        onClick={handleToggleReplies}
                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
                    >
                        {showReplies ? (
                            <>
                                <FontAwesomeIcon icon={faChevronUp} className="h-3 w-3" />
                                Hide {comment.replies!.length} {comment.replies!.length === 1 ? 'reply' : 'replies'}
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
                                Show {comment.replies!.length} {comment.replies!.length === 1 ? 'reply' : 'replies'}
                            </>
                        )}
                    </button>
                </div>
            )}

            {hasReplies && showReplies && depth < maxDepth && (
                <div className="mt-2 space-y-2">
                    {comment.replies!.map(reply => (
                        <CommentList
                            key={reply.id}
                            comment={reply}
                            depth={depth + 1}
                            replyingTo={replyingTo}
                            editingComment={editingComment}
                            currentUserId={currentUserId}
                            onReply={onReply}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                            onCancel={onCancel}
                            onAddComment={onAddComment}
                            loading={loading}
                        />
                    ))}
                </div>
            )}

            {depth === maxDepth && hasReplies && (
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 italic">
                    Further replies are hidden due to nesting depth
                </div>
            )}
        </div>
    );
};

export default CommentList;