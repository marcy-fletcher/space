import {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faExclamationTriangle,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import {Post} from "../types/post.ts";

type WarningType = NonNullable<Post['warnings']>[number];

const capitalizeWords = (text: string): string => {
    return text.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

interface WarningSectionProps {
    warnings: WarningType[] | undefined;
}

export const getWarningLevelColor = (level: string) => {
    switch (level) {
        case 'extreme':
        case 'graphic':
            return 'bg-red-500 dark:bg-red-500 text-white border-red-200';
        case 'moderate':
        case 'mild':
            return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
        default:
            return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700';
    }
};

const WarningSection = ({warnings}: WarningSectionProps) => {
    const [showAllWarnings, setShowAllWarnings] = useState(false);

    const groupedWarnings = warnings?.reduce((acc, warning) => {
        if (!acc[warning.level]) {
            acc[warning.level] = [];
        }
        acc[warning.level].push(warning);
        return acc;
    }, {} as Record<string, typeof warnings>) || {};

    const hasWarnings = warnings && warnings.length > 0;
    const hasMultipleWarningLevels = Object.keys(groupedWarnings).length > 1;

    const getWarningLevelIcon = (level: string) => {
        switch (level) {
            case 'extreme':
            case 'graphic':
                return faTriangleExclamation;
            case 'moderate':
            case 'mild':
            default:
                return faExclamationTriangle;
        }
    };

    const getWarningLevelText = (level: string) => {
        return level.charAt(0).toUpperCase() + level.slice(1);
    };

    if (!hasWarnings)
        return <></>

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide font-sans transition-colors duration-300">
                    Content Warnings
                </h3>
                {hasMultipleWarningLevels && (
                    <button
                        onClick={() => setShowAllWarnings(!showAllWarnings)}
                        className="flex items-center gap-1 text-xs text-primary-500 dark:text-primary-400
                                             hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                    >
                        {showAllWarnings ? 'Show Less' : 'Show All'}
                        <FontAwesomeIcon
                            icon={showAllWarnings ? faChevronUp : faChevronDown}
                            className="text-xs"
                        />
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                {
                    Object.entries(groupedWarnings).map(([level, warnings]) => (
                        <div key={level} className="flex flex-wrap gap-2">
                            {warnings?.map((warning, index) => (
                                <span
                                    key={index}
                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs border ${getWarningLevelColor(level)}`}
                                >
                                    <FontAwesomeIcon
                                        icon={getWarningLevelIcon(level)}
                                        className="text-xs"
                                    />
                                    {capitalizeWords(warning.type)}
                                    <span className="ml-1 opacity-70">
                                        ({getWarningLevelText(level)})
                                    </span>
                                </span>
                            ))}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default WarningSection;