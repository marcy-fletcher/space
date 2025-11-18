import React, { useState, useMemo, useEffect } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import LockedPostCard from '../components/LockedPostCard';
import SearchBar from '../components/SearchBar';
import {PostService } from '../services/posts';
import {Post} from "../types/post.ts";

const PostsList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);
                const allPosts = await PostService.getAllPosts();
                setPosts(allPosts);
            } catch (err) {
                setError('Failed to load stories. Please try again later.');
                console.error('Error loading posts:', err);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    const filteredPosts = useMemo(() => {
        if (!searchTerm.trim()) {
            return posts;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();

        return posts
            .map((post): Post | undefined => {
                if (post == undefined || post.title === undefined) {
                    return undefined;
                }

                const titleMatch = post.title?.toLowerCase().includes(lowerSearchTerm);
                const tagMatch = post.tags?.some(tag =>
                    tag?.toLowerCase().includes(lowerSearchTerm)
                );

                return (titleMatch || tagMatch) ? post : undefined;
            })
            .filter((post): post is Post => post !== undefined); // Type guard filter
    }, [posts, searchTerm]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 max-w-7xl">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-pink-200 dark:border-gray-600 border-t-pink-500 dark:border-t-pink-400 rounded-full animate-spin mx-auto mb-4 transition-all duration-300"></div>
                        <p className="text-white dark:text-gray-300 font-medium transition-colors duration-300">Loading stories...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16 max-w-7xl">
                <div className="text-center py-20">
                    <div className="text-6xl mb-4 transition-all duration-300">❌</div>
                    <h3 className="text-2xl font-semibold text-white dark:text-gray-100 mb-2 font-serif transition-colors duration-300">
                        Oops! Something went wrong
                    </h3>
                    <p className="text-pink-200 dark:text-gray-400 font-sans mb-4 transition-colors duration-300">
                        {error}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 dark:from-pink-600 dark:to-purple-700 dark:hover:from-pink-700 dark:hover:to-purple-800 text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl">
            <header className="text-center mb-16">
                <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text
                 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600
                 dark:text-gray-100
                 mb-4 font-serif tracking-tight transition-all duration-500">
                    Marcy's Library
                </h1>
                <p className="text-xl text-pink-600 dark:text-pink-200 font-light font-sans transition-colors duration-300">
                    A collection of my manuscripts and scribbles...
                </p>
                <div className="mt-6 flex justify-center gap-2">
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-pink-400 dark:via-pink-500 to-transparent rounded-full transition-all duration-300"></div>
                    <div className="w-1 h-1 bg-pink-400 dark:bg-pink-500 rounded-full mt-0 transition-all duration-300"></div>
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-pink-400 dark:via-pink-500 to-transparent rounded-full transition-all duration-300"></div>
                </div>
            </header>

            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                    post?.title ? (
                        <BlogPostCard key={index} post={post} />
                    ) : (
                        <LockedPostCard key={index} createdAt={post?.createdAt} accountTier={post?.subscription.requiredTierTitle} reactions={post.reactions} />
                    )
                ))}
            </div>

            {filteredPosts.length === 0 && searchTerm && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4 transition-all duration-300">🔍</div>
                    <h3 className="text-2xl font-semibold text-white dark:text-gray-100 mb-2 font-serif transition-colors duration-300">
                        No stories found
                    </h3>
                    <p className="text-pink-200 dark:text-gray-400 font-sans transition-colors duration-300">
                        Try adjusting your search terms
                    </p>
                </div>
            )}

            {posts.length === 0 && !loading && !error && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4 transition-all duration-300">📚</div>
                    <h3 className="text-2xl font-semibold text-white dark:text-gray-100 mb-2 font-serif transition-colors duration-300">
                        No stories available
                    </h3>
                    <p className="text-pink-200 dark:text-gray-400 font-sans transition-colors duration-300">
                        Check back soon for new content
                    </p>
                </div>
            )}
        </div>
    );
};

export default PostsList;
