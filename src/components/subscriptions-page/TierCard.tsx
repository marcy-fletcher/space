import React from 'react';

export interface WarningInfo {
    title: string;
    description?: string;
    icon: 'warning' | 'strong-warning';
    severity: 'medium' | 'high';
}

export interface TierCardProps {
    id: string;
    userLevel?: number;
    level: number;
    title: string;
    color: 'pink' | 'red' | 'purple';
    description: string;
    warning?: WarningInfo;
    onRequestTier?: (tierId: string) => void;
}

const TierCard: React.FC<TierCardProps> = ({
                                               id,
                                               userLevel,
                                               level,
                                               title,
                                               color,
                                               description,
                                               warning,
                                               onRequestTier
                                           }) => {
    const colorClasses = {
        pink: {
            border: 'border-pink-200 dark:border-gray-700',
            text: 'text-pink-600 dark:text-pink-400',
            bg: 'bg-white dark:bg-gray-800',
            warningBg: undefined,
            warningBorder: undefined,
            warningText: undefined,
            warningIcon: undefined,
            button: 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-500 text-white'
        },
        red: {
            border: 'border-red-200 dark:border-red-800',
            text: 'text-red-600 dark:text-red-400',
            bg: 'bg-white dark:bg-gray-800',
            warningBg: 'bg-red-50 dark:bg-red-900/20',
            warningBorder: 'border-red-400 dark:border-red-500',
            warningText: 'text-red-700 dark:text-red-200',
            warningIcon: 'text-red-400 dark:text-red-300',
            button: 'bg-red-500 hover:bg-red-600 focus:ring-red-500 text-white'
        },
        purple: {
            border: 'border-purple-200 dark:border-purple-800',
            text: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-white dark:bg-gray-800',
            warningBg: 'bg-purple-50 dark:bg-purple-900/20',
            warningBorder: 'border-purple-500 dark:border-purple-400',
            warningText: 'text-purple-800 dark:text-purple-200',
            warningIcon: 'text-purple-500 dark:text-purple-300',
            button: 'bg-purple-500 hover:bg-purple-600 focus:ring-purple-500 text-white'
        }
    };

    const getWarningIcon = (iconType: string) => {
        if (iconType === 'strong-warning') {
            return (
                <svg className="h-5 w-5 text-purple-500 dark:text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            );
        }

        return (
            <svg className="h-5 w-5 text-red-400 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        );
    };

    const shouldShowButton = userLevel !== undefined && userLevel < level;
    const isButtonDisabled = userLevel === undefined;

    console.log('user level', userLevel);

    const handleRequestClick = () => {
        if (onRequestTier && !isButtonDisabled && shouldShowButton) {
            onRequestTier(id);
        }
    };

    return (
        <div className={`${colorClasses[color].bg} rounded-lg p-5 shadow-lg border ${colorClasses[color].border} transition-all duration-300`}>
            <div className="flex justify-between items-start mb-3">
                <h2 className={`text-2xl font-bold ${colorClasses[color].text} font-serif`}>
                    {title}
                </h2>
                {shouldShowButton && (
                    <button
                        onClick={handleRequestClick}
                        disabled={isButtonDisabled}
                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            isButtonDisabled
                                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400'
                                : colorClasses[color].button
                        }`}
                    >
                        Request
                    </button>
                )}
            </div>

            <p className="text-gray-700 dark:text-gray-300 font-sans mb-3">
                {description}
            </p>

            {warning && colorClasses[color].warningBg && (
                <div className={`${colorClasses[color].warningBg} border-l-4 ${colorClasses[color].warningBorder} p-4 my-4 rounded-r-lg`}>
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            {getWarningIcon(warning.icon)}
                        </div>
                        <div className="ml-3">
                            <p className={`text-sm ${colorClasses[color].warningText} font-medium ${warning.severity === 'high' ? 'font-semibold' : ''}`}>
                                {warning.title}
                            </p>
                            {warning.description && (
                                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                                    {warning.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TierCard;