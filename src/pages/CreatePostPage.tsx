import React, { useState } from 'react';
import CreatePostForm from '../components/CreatePostForm';
import { Post } from '../types/post';
import {PostService} from "../services/posts.ts";

const CreatePostPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = async (postData: Omit<Post, 'id' | 'createdAt' | 'subscription' | 'reactions'>) => {
        setIsLoading(true);
        setMessage(null);

        try {
            const success = await PostService.createPost(postData);

            if (success) {
                setMessage({ type: 'success', text: 'Story created successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to create story. Please try again.' });
            }
        } catch (error) {
            console.error('Error creating post:', error);
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
            <CreatePostForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={isLoading}
            />

            {message && (
                <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
                    message.type === 'success'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                }`}>
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default CreatePostPage;