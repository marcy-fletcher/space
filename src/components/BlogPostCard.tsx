import React from 'react';
import { useNavigate } from 'react-router-dom';
import TransformationSection from "./TransformationSection.tsx";
import ReadFullButton from "./ReadFullButton.tsx";
import WarningSection from "./WarningSection.tsx";
import {Post} from "../types/post.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faFire, faStar } from '@fortawesome/free-solid-svg-icons';

interface BlogPostCardProps {
    post: Post;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
    const navigate = useNavigate();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getAgeRatingDisplay = (rating?: Post['ageRestriction']) => {
        if (!rating || rating === 'everyone') return null;

        const ratingConfig = {
            mature: { label: 'Mature', color: 'bg-yellow-500 dark:bg-yellow-600' },
            explicit: { label: 'Explicit', color: 'bg-red-500 dark:bg-red-600' }
        };

        return ratingConfig[rating];
    };

    const handleReadMore = () => {
        navigate(`/story/${post.id}`);
    };

    const ageRating = getAgeRatingDisplay(post.ageRestriction);

    return (
        <article className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl
                          transition-all duration-500 border-2 border-primary-100 dark:border-gray-700
                          hover:border-primary-300 dark:hover:border-primary-600 group overflow-hidden relative">

            <div className="relative z-10 flex flex-col h-full">

                <div className="mb-4">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start gap-4 flex-1">
                            {post.previewPicture && (
                                <img
                                    src={post.previewPicture}
                                    alt={`Preview for ${post.title}`}
                                    className="w-16 h-16 rounded-full object-cover flex-shrink-0 shadow-md border-2 border-primary-200 dark:border-primary-600"
                                />
                            )}
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-serif
                                             group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors duration-300">
                                    {post.title}
                                </h2>
                                <time className="text-sm text-primary-500 dark:text-primary-400 font-medium font-sans transition-colors duration-300">
                                    {formatDate(post.createdAt)}
                                </time>
                            </div>
                        </div>
                        {ageRating && (
                            <span className={`px-3 py-1 ${ageRating.color} text-white rounded-full text-sm font-bold font-sans uppercase tracking-wide shadow-md flex-shrink-0`}>
                                {ageRating.label}
                            </span>
                        )}
                    </div>
                </div>

                {post.tags &&
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-200
                                         dark:from-primary-800 dark:to-primary-700
                                         text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium font-sans
                                         hover:from-primary-200 hover:to-primary-300
                                         dark:hover:from-primary-700 dark:hover:to-primary-600
                                         transition-all duration-300 cursor-pointer
                                         shadow-sm hover:shadow-md"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                }

                <WarningSection warnings={post.warnings} />

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow font-sans transition-colors duration-300">
                    {post.preview}
                </p>

                <TransformationSection transformations={post.transformations} />
                <ReadFullButton handleReadMore={handleReadMore} />

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between max-w-md mx-auto">

                        <div className="flex items-center gap-2 group">
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faThumbsUp}
                                    className="text-green-500 group-hover:text-green-600 transition-colors duration-200"
                                    size="sm"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[20px]">
                                {post.reactions.like}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 group">
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faThumbsDown}
                                    className="text-red-500 group-hover:text-red-600 transition-colors duration-200"
                                    size="sm"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[20px]">
                                {post.reactions.dislike}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 group">
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faFire}
                                    className="text-orange-500 group-hover:text-orange-600 transition-colors duration-200"
                                    size="sm"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[20px]">
                                {post.reactions.hot}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 group">
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className="text-purple-500 group-hover:text-purple-600 transition-colors duration-200"
                                    size="sm"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[20px]">
                                {post.reactions.sequel_request}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPostCard;