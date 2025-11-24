import React, { useState, useEffect } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import LockedPostCard from '../components/LockedPostCard';
import SearchBar from '../components/SearchBar';
import { PostService } from '../services/posts';
import { Post } from "../types/post.ts";

type SortOption = 'relevance' | 'alphabetical';
type SortDirection = 'asc' | 'desc';

const getInitialHideUnavailable = (): boolean => {
    if (typeof window === 'undefined') return false;

    const savedHideUnavailable = localStorage.getItem('hideUnavailablePosts');

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
    const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>('relevance');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [hideUnavailable, setHideUnavailable] = useState<boolean>(getInitialHideUnavailable);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [pageSize] = useState(9);

    useEffect(() => {
        localStorage.setItem('hideUnavailablePosts', JSON.stringify(hideUnavailable));
    }, [hideUnavailable]);

    useEffect(() => {
        if (sortBy === 'relevance') {
            setSortDirection('desc'); // Newest first by default
        } else if (sortBy === 'alphabetical') {
            setSortDirection('asc'); // A-Z by default
        }
    }, [sortBy]);

    useEffect(() => {
        setCurrentPage(1);
    }, [appliedSearchTerm, sortBy, sortDirection, hideUnavailable]);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);

                const orderBy = sortBy === 'relevance' ? 'created_at' : 'title';
                const searchTerm = appliedSearchTerm.trim() || undefined;

                const response = await PostService.getPaginatedPosts(
                    currentPage,
                    pageSize,
                    hideUnavailable,
                    orderBy,
                    sortDirection,
                    searchTerm
                );
                setPosts(response.posts);
                setTotalPosts(response.totalCount);
            } catch (err) {
                setError('Failed to load stories. Please try again later.');
                console.error('Error loading posts:', err);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [currentPage, pageSize, hideUnavailable, sortBy, sortDirection, appliedSearchTerm]);

    const handleSearch = () => {
        setAppliedSearchTerm(searchTerm);
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setAppliedSearchTerm('');
        setCurrentPage(1);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSortChange = (newSortBy: SortOption) => {
        setSortBy(newSortBy);
    };

    const handleSortDirectionToggle = () => {
        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    const getSortButtonLabel = () => {
        if (sortBy === 'relevance') {
            return sortDirection === 'desc' ? 'Newest First' : 'Oldest First';
        } else {
            return sortDirection === 'asc' ? 'A → Z' : 'Z → A';
        }
    };

    const totalPages = Math.ceil(totalPosts / pageSize);
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalPosts);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1);

        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage <= 3) {
            endPage = 4;
        }

        if (currentPage >= totalPages - 2) {
            startPage = totalPages - 3;
        }

        if (startPage > 2) {
            pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages - 1) {
            pages.push('...');
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

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

            <div className="mb-8">
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onClear={handleClearSearch}
                    onKeyPress={handleKeyPress}
                    onSearch={handleSearch}
                />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-all duration-300">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            Sort by:
                        </label>
                        <select
                            id="sort-select"
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value as SortOption)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white text-sm transition-colors duration-200"
                        >
                            <option value="relevance">Date</option>
                            <option value="alphabetical">Alphabetical</option>
                        </select>
                    </div>

                    <button
                        onClick={handleSortDirectionToggle}
                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white text-sm transition-all duration-200"
                        title={`Toggle sort direction: ${getSortButtonLabel()}`}
                    >
                        <span>{getSortButtonLabel()}</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
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

            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                Showing {startItem}-{endItem} of {totalPosts} stories
                {appliedSearchTerm && (
                    <span className="ml-2 text-pink-500 dark:text-pink-400">
                        (searching for "{appliedSearchTerm}")
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    post?.title ? (
                        <BlogPostCard key={post.id || index} post={post} />
                    ) : (
                        <LockedPostCard key={post.id || index}
                                        createdAt={post?.createdAt}
                                        accountTierName={post?.subscription.requiredTierTitle}
                                        accountTierLevel={post?.subscription.requiredTierLevel}
                                        reactions={post.reactions} />
                    )
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-12">
                    {/* Mobile Pagination */}
                    <div className="flex sm:hidden items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium">Prev</span>
                        </button>

                        <div className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <span className="px-3 py-2 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-lg">
                                {currentPage}
                            </span>
                            <span className="px-1">of</span>
                            <span>{totalPages}</span>
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                            <span className="text-sm font-medium">Next</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Pagination */}
                    <div className="hidden sm:flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="text-sm font-medium">Previous</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-1">
                            {getPageNumbers().map((page, index) => (
                                <React.Fragment key={index}>
                                    {page === '...' ? (
                                        <span className="px-3 py-2 text-gray-400 dark:text-gray-500 font-medium">...</span>
                                    ) : (
                                        <button
                                            onClick={() => handlePageChange(page as number)}
                                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                currentPage === page
                                                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                            >
                                <span className="text-sm font-medium">Next</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {posts.length === 0 && appliedSearchTerm && (
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

            {posts.length === 0 && !loading && !error && !appliedSearchTerm && (
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