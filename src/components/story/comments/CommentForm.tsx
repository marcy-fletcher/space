import React, { useState } from 'react';
import { CommentFormData } from '../../../types/comments.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';

interface CommentFormProps {
    onSubmit: (formData: CommentFormData) => void;
    loading: boolean;
    onCancel?: () => void;
    placeholder?: string;
    initialContent?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
                                                     onSubmit,
                                                     loading,
                                                     onCancel,
                                                     placeholder = 'Share your thoughts...',
                                                     initialContent = ''
                                                 }) => {
    const [content, setContent] = useState(initialContent);
    const [charCount, setCharCount] = useState(initialContent.length);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim() && !loading) {
            onSubmit({ content: content.trim() });
            setContent('');
            setCharCount(0);
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= 1000) {
            setContent(value);
            setCharCount(value.length);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit(e);
        }
        if (e.key === 'Escape' && onCancel) {
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <div className="relative">
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                    rows={2}
                    disabled={loading}
                    maxLength={1000}
                />
                <div className="absolute bottom-1 right-1 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 px-1 rounded">
                    {charCount}/1000
                </div>
            </div>

            <div className="flex justify-end gap-1">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        disabled={loading}
                        title="Cancel"
                    >
                        <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                    </button>
                )}
                <button
                    type="submit"
                    className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center gap-1"
                    disabled={loading || !content.trim()}
                    title="Post comment"
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                        <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
                    )}
                    <span className="text-sm">Post</span>
                </button>
            </div>
        </form>
    );
};

export default CommentForm;