import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCalendar, faCrown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface LockedPostCardProps {
    createdAt?: string;
    accountTier?: string;
}

const LockedPostCard: React.FC<LockedPostCardProps> = ({ createdAt, accountTier }) => {
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
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900
                      rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500
                      border-2 border-gray-300 dark:border-gray-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-700/10
                          dark:from-primary-400/10 dark:to-primary-600/10
                          backdrop-blur-[2px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] space-y-6">
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

                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-400 dark:bg-primary-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-primary-400 dark:bg-primary-500 animate-pulse delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-primary-400 dark:bg-primary-500 animate-pulse delay-200"></div>
                </div>
            </div>
        </div>
    );
};

export default LockedPostCard;