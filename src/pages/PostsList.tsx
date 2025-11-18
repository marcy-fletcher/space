import React, { useState, useMemo, useEffect } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import LockedPostCard from '../components/LockedPostCard';
import SearchBar from '../components/SearchBar';
import { PostService } from '../services/posts';
import { Post } from "../types/post.ts";

type SortOption = 'relevance' | 'reactions' | 'alphabetical';

const getInitialHideUnavailable = (): boolean => {
    if (typeof window === 'undefined') return false; // For SSR safety

    const savedHideUnavailable = localStorage.getItem('hideUnavailablePosts');
    console.log('Hide unavailable from localStorage:', savedHideUnavailable);

    if (savedHideUnavailable) {
        try {
            return JSON.parse(savedHideUnavailable);
        } catch (error) {
            console.error('Error parsing saved hideUnavailable preference:', error);
            return false;
        }
    }

    return false;
};

const PostsList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>('relevance');
    const [hideUnavailable, setHideUnavailable] = useState<boolean>(getInitialHideUnavailable);

    useEffect(() => {
        console.log('Saving hideUnavailable to localStorage:', hideUnavailable);
        localStorage.setItem('hideUnavailablePosts', JSON.stringify(hideUnavailable));
    }, [hideUnavailable]);

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

    const filteredAndSortedPosts = useMemo(() => {
        let result = posts;

        if (searchTerm.trim()) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            result = result
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
                .filter((post): post is Post => post !== undefined);
        }

        if (hideUnavailable) {
            result = result.filter(post => post.title !== undefined);
        }

        switch (sortBy) {
            case 'reactions':
                result = [...result].sort((a, b) => {
                    const aReactions = a.reactions ?
                        (a.reactions.like + a.reactions.hot + a.reactions.sequel_request - a.reactions.dislike) : 0;
                    const bReactions = b.reactions ?
                        (b.reactions.like + b.reactions.hot + b.reactions.sequel_request - b.reactions.dislike) : 0;
                    return bReactions - aReactions;
                });
                break;

            case 'alphabetical':
                result = [...result].sort((a, b) => {
                    const aTitle = a.title || '';
                    const bTitle = b.title || '';
                    return aTitle.localeCompare(bTitle);
                });
                break;

            case 'relevance':
            default:
                if (searchTerm.trim()) {
                }
                break;
        }

        return result;
    }, [posts, searchTerm, sortBy, hideUnavailable]);

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

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-all duration-300">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            Sort by:
                        </label>
                        <select
                            id="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white text-sm transition-colors duration-200"
                        >
                            <option value="relevance">Most Relevant</option>
                            <option value="reactions">Most Reactions</option>
                            <option value="alphabetical">Alphabetical</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="hide-unavailable" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap cursor-pointer">
                        Hide locked posts
                    </label>
                    <label htmlFor="hide-unavailable" className="relative inline-block w-12 h-6 cursor-pointer">
                        <input
                            type="checkbox"
                            id="hide-unavailable"
                            checked={hideUnavailable}
                            onChange={(e) => setHideUnavailable(e.target.checked)}
                            className="sr-only"
                        />
                        <div className={`block w-12 h-6 rounded-full transition-colors duration-200 ${
                            hideUnavailable ? 'bg-pink-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                            hideUnavailable ? 'transform translate-x-6' : ''
                        }`}></div>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedPosts.map((post, index) => (
                    post?.title ? (
                        <BlogPostCard key={post.id || index} post={post} />
                    ) : (
                        <LockedPostCard key={post.id || index} createdAt={post?.createdAt} accountTier={post?.subscription.requiredTierTitle} reactions={post.reactions} />
                    )
                ))}
            </div>

            {filteredAndSortedPosts.length === 0 && searchTerm && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4 transition-all duration-300">🔍</div>
                    <h3 className="text-2xl font-semibold text-white dark:text-gray-100 mb-2 font-serif transition-colors duration-300">
                        No stories found
                    </h3>
                    <p className="text-pink-200 dark:text-gray-400 font-sans transition-colors duration-300">
                        Try adjusting your search terms or filters
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