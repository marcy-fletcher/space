import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCalendar, faCrown, faArrowUp, faThumbsUp, faThumbsDown, faFire, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface LockedPostCardProps {
    createdAt?: string;
    accountTier?: string;
    reactions?: {
        like: number;
        dislike: number;
        hot: number;
        sequel_request: number;
    };
}

const LockedPostCard: React.FC<LockedPostCardProps> = ({ createdAt, accountTier, reactions }) => {
    const navigate = useNavigate();

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Unknown date';

        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleUpgrade = () => {
        navigate('/upgrade');
    };

    // Default reactions if none provided
    const displayReactions = reactions || {
        like: 0,
        dislike: 0,
        hot: 0,
        sequel_request: 0
    };

    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900
                      rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500
                      border-2 border-gray-300 dark:border-gray-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-700/10
                          dark:from-primary-400/10 dark:to-primary-600/10
                          backdrop-blur-[2px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col items-center justify-center flex-grow space-y-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-300 to-primary-500
                                  dark:from-primary-600 dark:to-primary-800
                                  flex items-center justify-center shadow-xl
                                  group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon
                            icon={faLock}
                            className="w-8 h-8 text-white dark:text-gray-100"
                        />
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 font-serif">
                            Locked Content
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 font-sans">
                            This story is private
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium
                                  bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20
                                  text-amber-700 dark:text-amber-300 px-4 py-2 rounded-full
                                  border border-amber-200 dark:border-amber-700/50">
                        <FontAwesomeIcon
                            icon={faCrown}
                            className="w-3 h-3 text-amber-500 dark:text-amber-400"
                        />
                        <span>Tier "{accountTier}" and above</span>
                    </div>

                    <button
                        onClick={handleUpgrade}
                        className="group/btn flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600
                                 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-700
                                 dark:hover:from-primary-700 dark:hover:to-primary-800 text-white text-sm font-medium
                                 rounded-xl shadow-md hover:shadow-lg transition-all duration-300
                                 transform hover:scale-105 active:scale-95 border border-primary-400 dark:border-primary-600"
                    >
                        <FontAwesomeIcon
                            icon={faArrowUp}
                            className="w-3 h-3 group-hover/btn:translate-y-[-1px] transition-transform duration-300"
                        />
                        <span>Upgrade Account</span>
                    </button>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400
                                  bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full
                                  border border-gray-200 dark:border-gray-700">
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className="w-3 h-3 text-primary-500 dark:text-primary-400"
                        />
                        <span className="font-medium">
                            Created: {formatDate(createdAt)}
                        </span>
                    </div>
                </div>

                <div className="flex-grow"></div>

                <div className="w-full max-w-xs pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2 group">
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faThumbsUp}
                                    className="text-green-500 group-hover:text-green-600 transition-colors duration-200"
                                    size="sm"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[20px]">
                                {displayReactions.like}
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
                                {displayReactions.dislike}
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
                                {displayReactions.hot}
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
                                {displayReactions.sequel_request}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LockedPostCard;