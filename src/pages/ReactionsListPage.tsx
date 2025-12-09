import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faThumbsUp,
    faThumbsDown,
    faFire,
    faClock,
    faUser,
    faFileLines,
    faCalendar,
    faSort,
    faSortUp,
    faSortDown,
    faFilter
} from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../components/story/LoadingSpinner.tsx';
import ErrorState from '../components/story/ErrorState.tsx';
import {PostReaction, ReactionType} from '../types/reactions.ts';
import {reactionService} from "../services/reactions.ts";

const ReactionsListPage: React.FC = () => {
    const [reactions, setReactions] = useState<PostReaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState<ReactionType | 'all'>('all');
    const [sortField, setSortField] = useState<'createdAt' | 'postTitle' | 'userName'>('createdAt');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const itemsPerPage = 20;

    useEffect(() => {
        loadReactions();
    }, [currentPage, filter, sortField, sortDirection]);

    const loadReactions = async () => {
        try {
            setLoading(true);
            setError(null);

            const reactionsData = await reactionService.getAllReactions(itemsPerPage, currentPage);
            setReactions(reactionsData);

            const hasMore = reactionsData.length === itemsPerPage;
            setTotalPages(hasMore ? currentPage + 1 : currentPage);
        } catch (err) {
            console.error('Error loading reactions:', err);
            setError('Failed to load reactions. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (field: 'createdAt' | 'postTitle' | 'userName') => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const getReactionConfig = (type: ReactionType) => {
        switch (type) {
            case 'like':
                return {
                    icon: faThumbsUp,
                    text: 'Like',
                    class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
                    iconClass: 'text-green-500'
                };
            case 'dislike':
                return {
                    icon: faThumbsDown,
                    text: 'Dislike',
                    class: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
                    iconClass: 'text-red-500'
                };
            case 'sequel_request':
                return {
                    icon: faClock,
                    text: 'Sequel Request',
                    class: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
                    iconClass: 'text-blue-500'
                };
            case 'hot':
                return {
                    icon: faFire,
                    text: 'Hot',
                    class: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
                    iconClass: 'text-orange-500'
                };
            default:
                return {
                    icon: faThumbsUp,
                    text: 'Like',
                    class: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
                    iconClass: 'text-gray-500'
                };
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredReactions = reactions.filter(reaction =>
        filter === 'all' || reaction.reactionType === filter
    );

    const sortedReactions = [...filteredReactions].sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1;

        switch (sortField) {
            case 'createdAt':
                return direction * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            case 'postTitle':
                return direction * a.postTitle.localeCompare(b.postTitle);
            case 'userName':
                return direction * a.userName.localeCompare(b.userName);
            default:
                return 0;
        }
    });

    const reactionTypes: Array<ReactionType | 'all'> = ['all', 'like', 'dislike', 'sequel_request', 'hot'];

    const getSortIcon = (field: 'createdAt' | 'postTitle' | 'userName') => {
        if (sortField !== field) return faSort;
        return sortDirection === 'asc' ? faSortUp : faSortDown;
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorState error={error} isStoryUnavailable={false} />;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl min-h-screen">
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400
                     hover:text-primary-700 dark:hover:text-primary-300
                     font-medium transition-colors duration-300 group font-sans"
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                    />
                    Back to all stories
                </Link>
            </div>

            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 font-serif mb-4">
                    Reactions Dashboard
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-sans max-w-2xl mx-auto">
                    Track and analyze user reactions to your posts
                </p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {reactionTypes.filter(type => type !== 'all').map((type) => {
                    const config = getReactionConfig(type);
                    const count = reactions.filter(r => r.reactionType === type).length;

                    return (
                        <div
                            key={type}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-sans mb-1">
                                        {config.text}s
                                    </p>
                                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                                        {count}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-full ${config.class}`}>
                                    <FontAwesomeIcon icon={config.icon} className={`w-6 h-6 ${config.iconClass}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faFilter} className="text-gray-400 dark:text-gray-500" />
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Filter Reactions
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {reactionTypes.map((type) => {
                            const config = type === 'all' ? {
                                icon: faFilter,
                                text: 'All',
                                class: filter === 'all'
                                    ? 'bg-primary-500 text-white border-primary-500'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600',
                                iconClass: filter === 'all' ? 'text-white' : 'text-gray-500'
                            } : getReactionConfig(type);

                            return (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${config.class} ${
                                        filter === type
                                            ? 'ring-2 ring-primary-300 dark:ring-primary-700 ring-offset-2'
                                            : 'hover:shadow-md'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={config.icon} className={`w-4 h-4 ${config.iconClass}`} />
                                    <span className="font-medium">{config.text}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Reactions Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                        <tr>
                            <th className="py-4 px-6 text-left">
                                <button
                                    onClick={() => handleSort('createdAt')}
                                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                                >
                                    <FontAwesomeIcon icon={getSortIcon('createdAt')} className="w-3 h-3" />
                                    <span>Date & Time</span>
                                </button>
                            </th>
                            <th className="py-4 px-6 text-left">
                                <button
                                    onClick={() => handleSort('postTitle')}
                                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                                >
                                    <FontAwesomeIcon icon={getSortIcon('postTitle')} className="w-3 h-3" />
                                    <span>Post</span>
                                </button>
                            </th>
                            <th className="py-4 px-6 text-left">
                                <button
                                    onClick={() => handleSort('userName')}
                                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                                >
                                    <FontAwesomeIcon icon={getSortIcon('userName')} className="w-3 h-3" />
                                    <span>User</span>
                                </button>
                            </th>
                            <th className="py-4 px-6 text-left">
                                <span className="text-gray-700 dark:text-gray-300 font-semibold">Reaction</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {sortedReactions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-12 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={faThumbsUp}
                                            className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4"
                                        />
                                        <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 font-serif mb-2">
                                            No reactions found
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-500 font-sans">
                                            {filter === 'all'
                                                ? 'No reactions have been recorded yet.'
                                                : `No ${filter} reactions found.`}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            sortedReactions.map((reaction, index) => {
                                const config = getReactionConfig(reaction.reactionType);

                                return (
                                    <tr
                                        key={`${reaction.postId}-${reaction.userId}-${index}`}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-300"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                                    <FontAwesomeIcon
                                                        icon={faCalendar}
                                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800 dark:text-gray-200 font-sans">
                                                        {formatDate(reaction.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                                    <FontAwesomeIcon
                                                        icon={faFileLines}
                                                        className="w-4 h-4 text-blue-500 dark:text-blue-400"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800 dark:text-gray-200 font-serif line-clamp-1">
                                                        {reaction.postTitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                                    <FontAwesomeIcon
                                                        icon={faUser}
                                                        className="w-4 h-4 text-purple-500 dark:text-purple-400"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800 dark:text-gray-200 font-sans">
                                                        {reaction.userName}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.class}`}>
                                                <FontAwesomeIcon icon={config.icon} className={`w-4 h-4 ${config.iconClass}`} />
                                                <span className="font-medium">{config.text}</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {sortedReactions.length > 0 && (
                    <div className="border-t border-gray-100 dark:border-gray-700 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Showing page {currentPage} of {totalPages}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="text-center mt-12">
                <Link
                    to="/"
                    className="bg-gradient-to-r from-primary-500 to-primary-600
                     hover:from-primary-600 hover:to-primary-700
                     text-white font-semibold py-3 px-8 rounded-xl
                     transition-all duration-300 shadow-md hover:shadow-xl
                     transform hover:-translate-y-1 font-sans
                     inline-flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                    Back to Stories
                </Link>
            </div>
        </div>
    );
};

export default ReactionsListPage;