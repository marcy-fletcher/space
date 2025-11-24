import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCalendar, faCrown, faArrowUp, faThumbsUp, faThumbsDown, faFire, faStar, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface LockedPostCardProps {
    createdAt?: string;
    accountTierName?: string;
    accountTierLevel?: number;
    reactions?: {
        like: number;
        dislike: number;
        hot: number;
        sequel_request: number;
    };
}

const LockedPostCard: React.FC<LockedPostCardProps> = ({ createdAt, accountTierName, accountTierLevel, reactions }) => {
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
        if (accountTierLevel === 1) {
            navigate('/register');
        } else {
            navigate('/upgrade');
        }
    };

    // Default reactions if none provided
    const displayReactions = reactions || {
        like: 0,
        dislike: 0,
        hot: 0,
        sequel_request: 0
    };

    const isTierOne = accountTierLevel === 1;

    return (
        <div className={`bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900
                      rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500
                      border-2 ${isTierOne ? 'border-green-300 dark:border-green-700' : 'border-gray-300 dark:border-gray-700'} relative overflow-hidden group`}>
            <div className={`absolute inset-0 backdrop-blur-[2px] pointer-events-none
                          ${isTierOne
                ? 'bg-gradient-to-br from-green-500/10 to-green-700/10 dark:from-green-400/10 dark:to-green-600/10'
                : 'bg-gradient-to-br from-primary-500/10 to-primary-700/10 dark:from-primary-400/10 dark:to-primary-600/10'}`}></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex flex-col items-center justify-center flex-grow space-y-6">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl
                                  group-hover:scale-110 transition-transform duration-300
                                  ${isTierOne
                        ? 'bg-gradient-to-br from-green-300 to-green-500 dark:from-green-600 dark:to-green-800'
                        : 'bg-gradient-to-br from-primary-300 to-primary-500 dark:from-primary-600 dark:to-primary-800'}`}>
                        <FontAwesomeIcon
                            icon={isTierOne ? faUserPlus : faLock}
                            className="w-8 h-8 text-white dark:text-gray-100"
                        />
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 font-serif">
                            {isTierOne ? 'Exclusive Content' : 'Locked Content'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 font-sans">
                            {isTierOne ? 'Create an account to access this story' : 'This story is private'}
                        </p>
                    </div>

                    <div className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border
                                  ${isTierOne
                        ? 'bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700/50'
                        : 'bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/50'}`}>
                        <FontAwesomeIcon
                            icon={faCrown}
                            className={`w-3 h-3 ${isTierOne ? 'text-green-500 dark:text-green-400' : 'text-amber-500 dark:text-amber-400'}`}
                        />
                        <span>
                            {isTierOne
                                ? 'Website exclusive content'
                                : `Tier "${accountTierName}" and above`}
                        </span>
                    </div>

                    <button
                        onClick={handleUpgrade}
                        className={`group/btn flex items-center gap-2 px-4 py-2 text-white text-sm font-medium
                                 rounded-xl shadow-md hover:shadow-lg transition-all duration-300
                                 transform hover:scale-105 active:scale-95 border
                                 ${isTierOne
                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 border-green-400 dark:border-green-600'
                            : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-700 dark:hover:from-primary-700 dark:hover:to-primary-800 border-primary-400 dark:border-primary-600'}`}
                    >
                        <FontAwesomeIcon
                            icon={isTierOne ? faUserPlus : faArrowUp}
                            className="w-3 h-3 group-hover/btn:translate-y-[-1px] transition-transform duration-300"
                        />
                        <span>{isTierOne ? 'Create Account' : 'Upgrade Account'}</span>
                    </button>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400
                                  bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full
                                  border border-gray-200 dark:border-gray-700">
                        <FontAwesomeIcon
                            icon={faCalendar}
                            className={`w-3 h-3 ${isTierOne ? 'text-green-500 dark:text-green-400' : 'text-primary-500 dark:text-primary-400'}`}
                        />
                        <span className="font-medium">
                            Created: {formatDate(createdAt)}
                        </span>
                    </div>
                </div>

                <div className="flex-grow mt-4"></div>

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