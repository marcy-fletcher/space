import React from 'react';
import { Link } from 'react-router-dom';

interface AvailableRelatedStoryProps {
    id: string;
    title: string;
    preview: string;
    createdAt?: string;
}

const AvailableRelatedStory: React.FC<AvailableRelatedStoryProps> = ({
                                                                         id,
                                                                         title,
                                                                         preview,
                                                                         createdAt
                                                                     }) => {
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Link
            to={`/story/${id}`}
            className="block bg-white dark:bg-gray-800 rounded-2xl p-6
                     shadow-lg border-2 border-primary-100 dark:border-gray-700
                     hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-600
                     transition-all duration-300 transform hover:-translate-y-1
                     group h-full"
        >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 font-serif line-clamp-2
                         group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 font-sans line-clamp-3 mb-4 text-sm leading-relaxed">
                {preview}
            </p>

            <div className="flex items-center justify-between mt-auto">
                {createdAt && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {formatDate(createdAt)}
                    </span>
                )}
                <div className="flex items-center text-primary-600 dark:text-primary-400
                             font-medium text-sm group-hover:text-primary-700 dark:group-hover:text-primary-300
                             transition-colors">
                    <span className="text-xs">Read story</span>
                    <svg
                        className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </div>
        </Link>
    );
};

export default AvailableRelatedStory;