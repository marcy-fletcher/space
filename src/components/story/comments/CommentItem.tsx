import React, { useState } from 'react';
import CommentForm from './CommentForm';
import { Comment, CommentFormData } from '../../../types/comments.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faReply,
    faEdit,
    faTrash,
    faCheck,
    faTimes,
    faClock
} from '@fortawesome/free-solid-svg-icons';
import {useAuth} from "../../../contexts/AuthContext.tsx";

interface CommentItemProps {
    comment: Comment;
    isReplying: boolean;
    isEditing: boolean;
    isOwnComment: boolean;
    onReply: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onUpdate: (content: string) => void;
    onCancel: () => void;
    onAddComment: (formData: CommentFormData) => void;
    loading: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
                                                     comment,
                                                     isReplying,
                                                     isEditing,
                                                     isOwnComment,
                                                     onReply,
                                                     onEdit,
                                                     onDelete,
                                                     onUpdate,
                                                     onCancel,
                                                     onAddComment,
                                                     loading
                                                 }) => {
    const [editContent, setEditContent] = useState(comment.content);
    const [showActions, setShowActions] = useState(false);
    const {user} = useAuth();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    const handleSubmitEdit = () => {
        if (editContent.trim() && editContent !== comment.content) {
            onUpdate(editContent.trim());
        } else {
            onCancel();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onCancel();
            setEditContent(comment.content);
        }
        if (e.key === 'Enter' && e.ctrlKey && !isEditing) {
            handleSubmitEdit();
        }
    };

    return (
        <div className="group relative">
            <div
                className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-150 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                onMouseEnter={() => setShowActions(true)}
                onMouseLeave={() => setShowActions(false)}
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 flex-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0 mt-0.5">
                            {comment.userName?.charAt(0).toUpperCase() || 'A'}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                    {comment.userName || 'Anonymous'}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                    <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                                    {formatDate(comment.createdAt)}
                                    {comment.createdAt !== comment.updatedAt && ' (edited)'}
                                </span>
                            </div>

                            {isEditing ? (
                                <div className="mt-1">
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                                        rows={2}
                                        autoFocus
                                        maxLength={1000}
                                    />
                                    <div className="flex justify-end gap-1 mt-1">
                                        <button
                                            onClick={onCancel}
                                            className="p-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                            disabled={loading}
                                        >
                                            <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                                        </button>
                                        <button
                                            onClick={handleSubmitEdit}
                                            className="p-1.5 text-xs bg-primary-500 text-white rounded hover:bg-primary-600 disabled:opacity-50"
                                            disabled={loading || !editContent.trim()}
                                        >
                                            <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                                    {comment.content}
                                </p>
                            )}
                        </div>
                    </div>

                    {isOwnComment && showActions && (
                        <div className="flex gap-1 ml-2">
                            <button
                                onClick={onEdit}
                                className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                disabled={loading}
                                title="Edit"
                            >
                                <FontAwesomeIcon icon={faEdit} className="h-3.5 w-3.5" />
                            </button>
                            <button
                                onClick={onDelete}
                                className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                disabled={loading}
                                title="Delete"
                            >
                                <FontAwesomeIcon icon={faTrash} className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    )}
                </div>

                {user && !isEditing && (
                    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <button
                            onClick={onReply}
                            className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-1"
                            disabled={loading}
                        >
                            <FontAwesomeIcon icon={faReply} className="h-3 w-3" />
                            Reply
                        </button>
                    </div>
                )}
            </div>

            {isReplying && (
                <div className="mt-2 ml-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Replying to {comment.userName || 'Anonymous'}
                    </div>
                    <CommentForm
                        onSubmit={(formData) => onAddComment({ ...formData, parentId: comment.id })}
                        loading={loading}
                        onCancel={onCancel}
                        placeholder={`Reply to ${comment.userName || 'Anonymous'}...`}
                    />
                </div>
            )}
        </div>
    );
};

export default CommentItem;