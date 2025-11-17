import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCrown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface LockedRelatedStoryProps {
    createdAt?: string;
    accountTier?: string;
}

const LockedRelatedStory: React.FC<LockedRelatedStoryProps> = ({ createdAt, accountTier }) => {
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

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900
                      rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700
                      hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-500/5 dark:bg-primary-400/5 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-300 to-primary-500
                                  dark:from-primary-600 dark:to-primary-800
                                  flex items-center justify-center shadow-md
                                  group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon
                            icon={faLock}
                            className="w-4 h-4 text-white dark:text-gray-100"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-700 dark:text-gray-200 font-serif text-lg">
                            Private Story
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Content locked
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium
                              bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20
                              text-amber-600 dark:text-amber-300 px-3 py-1.5 rounded-full
                              border border-amber-200 dark:border-amber-700/50 mb-3">
                    <FontAwesomeIcon
                        icon={faCrown}
                        className="w-3 h-3 text-amber-500 dark:text-amber-400"
                    />
                    <span>Tier {accountTier}+</span>
                </div>

                <button
                    onClick={handleUpgrade}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 mb-3
                             bg-gradient-to-r from-primary-500 to-primary-600
                             hover:from-primary-600 hover:to-primary-700
                             dark:from-primary-600 dark:to-primary-700
                             dark:hover:from-primary-700 dark:hover:to-primary-800
                             text-white text-xs font-medium
                             rounded-lg shadow-sm hover:shadow transition-all duration-300
                             transform hover:scale-[1.02] active:scale-95
                             border border-primary-400 dark:border-primary-600"
                >
                    <FontAwesomeIcon
                        icon={faArrowUp}
                        className="w-2.5 h-2.5 group-hover/btn:translate-y-[-1px] transition-transform duration-300"
                    />
                    <span>Upgrade to Unlock</span>
                </button>

                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Created {formatDate(createdAt)}
                </div>

                <div className="flex gap-1.5 mt-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 dark:bg-primary-500"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-300 dark:bg-primary-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 dark:bg-primary-500"></div>
                </div>
            </div>
        </div>
    );
};

export default LockedRelatedStory;