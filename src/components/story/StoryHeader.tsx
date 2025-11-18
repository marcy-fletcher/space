import React from 'react';
import {Post} from "../../types/post.ts";
import {ReactionsSection} from "./ReactionsSection.tsx";

interface StoryHeaderProps {
    post: Post;
    formatDate: (dateString: string) => string;
}

const StoryHeader: React.FC<StoryHeaderProps> = ({ post, formatDate }) => {
    return (
        <header className="mb-8 border-b-2 border-primary-100 dark:border-gray-700 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-serif">
                {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
                <time className="text-sm text-primary-600 dark:text-primary-400 font-medium font-sans">
                    {formatDate(post.createdAt)}
                </time>

                {post.tags && (
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-200
                                         dark:from-primary-900 dark:to-primary-800
                                         text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium font-sans
                                         shadow-sm"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <ReactionsSection postId={post.id} />
        </header>
    );
};

export default StoryHeader;