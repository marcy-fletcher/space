import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostService } from '../services/posts';
import MarkdownRenderer from '../components/MarkdownRenderer';
import ContentWarning from "../components/ContentWarning.tsx";
import { Post } from "../types/post.ts";
import LoadingSpinner from "../components/story/LoadingSpinner.tsx";
import ErrorState from "../components/story/ErrorState.tsx";
import StoryHeader from "../components/story/StoryHeader.tsx";
import StoryFooter from "../components/story/StoryFooter.tsx";
import RelatedPostsSection from "../components/story/RelatedPostsSection.tsx";
import ReferencesSection from "../components/story/ReferencesSection.tsx";
import CommentSection from "../components/story/comments/CommentSection.tsx";
import {useDebugLog} from "../hooks/useDebugLog.ts";

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [, setHasAgreedToWarnings] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);

    const { debugPageLoad } = useDebugLog();

    useEffect(() => {
        const loadStoryData = async () => {
            if (!id) {
                setError('Story ID is required');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const [postData] = await Promise.all([
                    PostService.getPostById(id)
                ]);

                if (!postData) {
                    setError('Story not found');
                    return;
                }

                if (!postData.title || !postData.fullContent || postData.title.trim() === '' || postData.fullContent.trim() === '') {
                    setError('Story content is unavailable');
                    return;
                }

                setPost(postData as Post);

                document.title = `${postData.title} - Marcy's Private Space`;

                const agreedStories = JSON.parse(localStorage.getItem('agreedWarnings') || '{}');
                if (agreedStories[id]) {
                    setHasAgreedToWarnings(true);
                } else if (postData.warnings && postData.warnings.length > 0) {
                    const hasSeriousWarnings = postData.warnings.some(warning =>
                        warning.level !== 'mild'
                    );
                    if (hasSeriousWarnings) {
                        setShowWarningModal(true);
                    } else {
                        setHasAgreedToWarnings(true);
                    }
                }

                debugPageLoad('post', {
                    post_id: id,
                    post_title: postData.title
                })
            } catch (err) {
                setError('Failed to load story. Please try again later.');
                console.error('Error loading story:', err);
            } finally {
                setLoading(false);
            }
        };

        loadStoryData();
    }, [id]);

    useEffect(() => {
        return () => {
            document.title = 'Marcy\'s Private Space';
        };
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isStoryUnavailable = !post || !post.title || !post.fullContent ||
        post.title.trim() === '' || post.fullContent.trim() === '';

    const renderContent = () => {
        if (!post?.fullContent) return null;

        const contentType = post.contentType || 'markdown';

        switch (contentType) {
            case 'html':
                return (
                    <div dangerouslySetInnerHTML={{ __html: post.fullContent }}
                    />
                );
            case 'markdown':
            default:
                return <MarkdownRenderer content={post.fullContent} />;
        }
    };

    if (id != undefined && showWarningModal && post?.warnings && post.warnings.length > 0) {
        return (
            <ContentWarning
                id={id}
                warnings={post.warnings}
                setHasAgreedToWarnings={setHasAgreedToWarnings}
                setShowWarningModal={setShowWarningModal}
            />
        );
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !post || isStoryUnavailable) {
        return <ErrorState error={error!} isStoryUnavailable={isStoryUnavailable} />;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl min-h-screen">

            <button
                onClick={() => navigate('/')}
                className="mb-8 flex items-center gap-2 text-primary-600 dark:text-primary-400
                         hover:text-primary-700 dark:hover:text-primary-300
                         font-medium transition-colors duration-300 group font-sans"
            >
                <svg
                    className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                Back to all stories
            </button>

            <article className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12
                              shadow-2xl border-2 border-primary-100 dark:border-gray-700">
                <StoryHeader
                    post={post}
                    formatDate={formatDate}
                />

                {renderContent()}

                <StoryFooter />
            </article>

            <CommentSection
                postId={post.id}
                initialComments={post.comments}
                onCommentAdded={(comment) => {
                    setPost(prev => prev ? {
                        ...prev,
                        comments: [comment, ...prev.comments]
                    } : undefined);
                }}
                onCommentUpdated={(updatedComment) => {
                    setPost(prev => prev ? {
                        ...prev,
                        comments: prev.comments.map(c =>
                            c.id === updatedComment.id ? updatedComment : c
                        )
                    } : undefined);
                }}
                onCommentDeleted={(commentId) => {
                    setPost(prev => prev ? {
                        ...prev,
                        comments: prev.comments.filter(c => c.id !== commentId)
                    } : undefined);
                }}
            />

            <ReferencesSection references={post.references} />
            <RelatedPostsSection relatedPosts={post.relatedPosts} />

            <div className="text-center mt-12">
                <button
                    onClick={() => navigate('/')}
                    className="bg-gradient-to-r from-primary-500 to-primary-600
                             hover:from-primary-600 hover:to-primary-700
                             text-white font-semibold py-3 px-8 rounded-xl
                             transition-all duration-300 shadow-md hover:shadow-xl
                             transform hover:-translate-y-1 font-sans
                             inline-flex items-center gap-2"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Read More Stories
                </button>
            </div>
        </div>
    );
};

export default PostPage;