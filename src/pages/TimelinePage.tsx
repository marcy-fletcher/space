import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faCheckCircle,
    faSpinner,
    faCalendarAlt,
    faExternalLinkAlt,
    faBook,
    faFileAlt,
    faGlobe,
    faDownload,
    faChevronLeft,
    faCrown,
    faCalendarPlus
} from '@fortawesome/free-solid-svg-icons';

interface SubscriptionTier {
    requiredTierId: string;
    requiredTierLevel: number;
    requiredTierTitle: string;
}

interface TimelineItem {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
    date?: string; // Made optional
    category: 'writing' | 'development' | 'personal';
    subscription?: SubscriptionTier;
    finishedPiece?: {
        title: string;
        url: string;
        type: 'story' | 'article' | 'website' | 'download' | 'external';
        description?: string;
    };
}

const TimelinePage: React.FC = () => {
    const navigate = useNavigate();
    const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'current' | 'completed' | 'upcoming'>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    const subscriptionTiers = {
        '3ccf1144-1de0-41cd-90e3-14b65051160f': { title: 'The Lost Soul', level: 0 },
        'e0a0bdc5-0b1e-4ad4-bd96-1661e9993eed': { title: 'The Acolyte', level: 1 },
        'b29bb155-4f75-4ad6-849e-e2c54493e3d7': { title: 'The High Priest', level: 500 },
        '596a3910-0a52-4f31-ad0c-6e893351b0ab': { title: 'The Cult Leader', level: 900 }
    };

    useEffect(() => {
        const loadTimelineData = async () => {
            setLoading(true);
            try {
                const mockData: TimelineItem[] = [
                    {
                        id: '1',
                        title: 'New Fantasy Series - Chapter 3',
                        description: 'Working on the third chapter of my ongoing fantasy series. Exploring the ancient ruins of Eldoria.',
                        status: 'current',
                        date: '2024-01-15',
                        category: 'writing',
                        subscription: {
                            requiredTierId: 'e0a0bdc5-0b1e-4ad4-bd96-1661e9993eed',
                            requiredTierLevel: 1,
                            requiredTierTitle: 'The Acolyte'
                        }
                    },
                    {
                        id: '2',
                        title: 'Website Redesign',
                        description: 'Complete overhaul of the website UI with dark mode support and improved accessibility.',
                        status: 'completed',
                        date: '2024-01-10',
                        category: 'development',
                        finishedPiece: {
                            title: 'View Live Website',
                            url: '/',
                            type: 'website',
                            description: 'Explore the newly redesigned website with improved navigation and dark mode.'
                        }
                    },
                    {
                        id: '3',
                        title: 'Character Development Notes',
                        description: 'Deep dive into medieval European nobility for character backgrounds.',
                        status: 'completed',
                        date: '2024-01-05',
                        category: 'writing',
                        finishedPiece: {
                            title: 'Read Notes',
                            url: '/research/medieval-nobility',
                            type: 'article',
                            description: 'Comprehensive notes on medieval hierarchy and noble families.'
                        }
                    },
                    {
                        id: '4',
                        title: 'Short Story Collection',
                        description: 'Compiling and editing short stories for the winter collection.',
                        status: 'upcoming',
                        // No date provided for this upcoming item
                        category: 'writing',
                        subscription: {
                            requiredTierId: 'b29bb155-4f75-4ad6-849e-e2c54493e3d7',
                            requiredTierLevel: 500,
                            requiredTierTitle: 'The High Priest'
                        }
                    },
                    {
                        id: '5',
                        title: 'Mobile App Development',
                        description: 'Building a companion mobile app for readers with offline reading capabilities.',
                        status: 'current',
                        date: '2024-01-12',
                        category: 'development',
                        subscription: {
                            requiredTierId: '596a3910-0a52-4f31-ad0c-6e893351b0ab',
                            requiredTierLevel: 900,
                            requiredTierTitle: 'The Cult Leader'
                        }
                    },
                    {
                        id: '6',
                        title: 'Dark Romance Novel',
                        description: 'Completed writing and editing my latest dark romance novel "Midnight Whispers".',
                        status: 'completed',
                        date: '2024-01-08',
                        category: 'writing',
                        finishedPiece: {
                            title: 'Read "Midnight Whispers"',
                            url: '/stories/midnight-whispers',
                            type: 'story',
                            description: 'A dark romance about forbidden love and supernatural secrets.'
                        },
                        subscription: {
                            requiredTierId: '3ccf1144-1de0-41cd-90e3-14b65051160f',
                            requiredTierLevel: 0,
                            requiredTierTitle: 'The Lost Soul'
                        }
                    },
                    {
                        id: '7',
                        title: 'New Horror Series',
                        description: 'Planning a new horror series set in Victorian London with supernatural elements.',
                        status: 'upcoming',
                        date: '2024-02-01', // Upcoming item with a date
                        category: 'writing',
                        subscription: {
                            requiredTierId: 'e0a0bdc5-0b1e-4ad4-bd96-1661e9993eed',
                            requiredTierLevel: 1,
                            requiredTierTitle: 'The Acolyte'
                        }
                    },
                    {
                        id: '8',
                        title: 'API Integration',
                        description: 'Adding new API endpoints for better third-party integrations.',
                        status: 'upcoming',
                        // No date provided
                        category: 'development'
                    }
                ];

                setTimelineItems(mockData);
            } catch (error) {
                console.error('Error loading timeline data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTimelineData();
    }, []);

    const getStatusIcon = (status: TimelineItem['status']) => {
        switch (status) {
            case 'completed':
                return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
            case 'current':
                return <FontAwesomeIcon icon={faSpinner} className="text-blue-500 animate-spin" />;
            case 'upcoming':
                return <FontAwesomeIcon icon={faClock} className="text-gray-400" />;
            default:
                return <FontAwesomeIcon icon={faClock} />;
        }
    };

    const getStatusColor = (status: TimelineItem['status']) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
            case 'current':
                return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
            case 'upcoming':
                return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
        }
    };

    const getCategoryColor = (category: TimelineItem['category']) => {
        switch (category) {
            case 'writing':
                return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
            case 'development':
                return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
            case 'personal':
                return 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400';
            default:
                return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
        }
    };

    const getTierColor = (tierId: string) => {
        switch (tierId) {
            case '3ccf1144-1de0-41cd-90e3-14b65051160f':
                return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
            case 'e0a0bdc5-0b1e-4ad4-bd96-1661e9993eed':
                return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
            case 'b29bb155-4f75-4ad6-849e-e2c54493e3d7':
                return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400';
            case '596a3910-0a52-4f31-ad0c-6e893351b0ab':
                return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
            default:
                return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
        }
    };

    const getFinishedPieceIcon = (type: TimelineItem['finishedPiece']['type']) => {
        switch (type) {
            case 'story':
                return <FontAwesomeIcon icon={faBook} className="w-4 h-4" />;
            case 'article':
                return <FontAwesomeIcon icon={faFileAlt} className="w-4 h-4" />;
            case 'website':
                return <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />;
            case 'download':
                return <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />;
            case 'external':
                return <FontAwesomeIcon icon={faExternalLinkAlt} className="w-4 h-4" />;
            default:
                return <FontAwesomeIcon icon={faExternalLinkAlt} className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return null;

        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getDateDisplay = (item: TimelineItem) => {
        if (item.status === 'completed' && item.date) {
            return `Completed: ${formatDate(item.date)}`;
        } else if (item.status === 'current' && item.date) {
            return `Started: ${formatDate(item.date)}`;
        } else if (item.status === 'upcoming' && item.date) {
            return `Expected: ${formatDate(item.date)}`;
        } else if (item.status === 'upcoming' && !item.date) {
            return 'Coming Soon';
        }
        return formatDate(item.date) || 'Date TBD';
    };

    const getDateIcon = (item: TimelineItem) => {
        if (item.status === 'upcoming' && !item.date) {
            return <FontAwesomeIcon icon={faCalendarPlus} className="w-4 h-4 text-primary-500 dark:text-primary-400" />;
        }
        return <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 text-primary-500 dark:text-primary-400" />;
    };

    const filteredItems = timelineItems.filter(item => {
        const statusMatch = filter === 'all' || item.status === filter;
        const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter;
        return statusMatch && categoryMatch;
    });

    const categories = ['all', 'writing', 'development', 'personal'] as const;

    const handleFinishedPieceClick = (url: string, isExternal: boolean = false) => {
        if (isExternal) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            navigate(url);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin"></div>
                    <p className="text-gray-500 dark:text-gray-400 font-sans text-sm">Loading timeline...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="border-b border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to all stories
                    </button>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-serif mb-4">
                            My Timeline
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 font-sans max-w-2xl mx-auto text-lg">
                            Tracking my current projects, completed work, and upcoming plans.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Compact Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <div className="flex flex-wrap gap-2">
                        {(['all', 'current', 'completed', 'upcoming'] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                                    filter === status
                                        ? 'bg-primary-500 text-white shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setCategoryFilter(category)}
                                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                                    categoryFilter === category
                                        ? 'bg-primary-500 text-white shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Modern Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 to-primary-300 dark:from-gray-700 dark:to-gray-600"></div>

                    <div className="space-y-6">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="relative flex items-start gap-6 group">
                                {/* Timeline dot with gradient */}
                                <div className={`absolute left-6 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 z-10 transform -translate-x-1/2 mt-3 ${
                                    item.status === 'completed' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                                        item.status === 'current' ? 'bg-gradient-to-br from-blue-400 to-blue-600 animate-pulse' :
                                            'bg-gradient-to-br from-gray-400 to-gray-600'
                                }`}></div>

                                {/* Content Card */}
                                <div className="ml-12 flex-1">
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6
                                                  shadow-lg hover:shadow-xl transition-all duration-300
                                                  border border-gray-100 dark:border-gray-700
                                                  group-hover:border-primary-200 dark:group-hover:border-primary-800">
                                        {/* Header with date and status */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                            <div className="flex items-center gap-2">
                                                {getDateIcon(item)}
                                                <span className="text-sm text-gray-500 dark:text-gray-400 font-sans font-medium">
                                                    {getDateDisplay(item)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                                    {getStatusIcon(item.status)}
                                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                </span>
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                                                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Title and Description */}
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-serif mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 font-sans mb-4 leading-relaxed">
                                            {item.description}
                                        </p>

                                        {/* Subscription Tier - Compact */}
                                        {item.subscription && (
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                                    <FontAwesomeIcon icon={faCrown} className="w-4 h-4 text-amber-500" />
                                                    <span>Available for:</span>
                                                </div>
                                                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getTierColor(item.subscription.requiredTierId)}`}>
                                                    {item.subscription.requiredTierTitle}
                                                </span>
                                            </div>
                                        )}

                                        {/* Finished Piece - Compact */}
                                        {item.finishedPiece && item.status === 'completed' && (
                                            <div className="p-4 bg-gradient-to-r from-gray-50 to-primary-50 dark:from-gray-800 dark:to-primary-900/20
                                                          rounded-xl border border-primary-100 dark:border-primary-800/50">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <FontAwesomeIcon
                                                                icon={faCheckCircle}
                                                                className="w-4 h-4 text-green-500"
                                                            />
                                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-sans">
                                                                Finished Piece
                                                            </span>
                                                        </div>
                                                        {item.finishedPiece.description && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">
                                                                {item.finishedPiece.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => handleFinishedPieceClick(
                                                            item.finishedPiece!.url,
                                                            item.finishedPiece!.type === 'external' || item.finishedPiece!.type === 'website'
                                                        )}
                                                        className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600
                                                                 text-white font-medium rounded-xl transition-all duration-200
                                                                 shadow-md hover:shadow-lg transform hover:scale-105 font-sans text-sm whitespace-nowrap"
                                                    >
                                                        {getFinishedPieceIcon(item.finishedPiece.type)}
                                                        {item.finishedPiece.title}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredItems.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className="w-6 h-6 text-gray-400 dark:text-gray-600"
                                />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 font-serif mb-2">
                                No items found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-500 font-sans text-sm">
                                Try adjusting your filters to see more timeline items.
                            </p>
                        </div>
                    )}
                </div>

                {/* Back to Stories Button */}
                <div className="text-center mt-16">
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Stories
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimelinePage;