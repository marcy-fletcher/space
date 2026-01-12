import type {WarningLevel} from "../../types/warning.ts";
import {capitalizeWords} from "../../../utils/capitalizeWords.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {cn} from "../../../utils/cn.ts";
import {faExclamationTriangle, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import type {WarningSummary} from "../../types/postSummary.ts";

interface WarningProps {
    warning: WarningSummary
}

const getColor = (level: WarningLevel) => {
    switch (level) {
        case 'extreme':
        case 'graphic':
            return 'bg-danger-500 dark:bg-danger-600 text-white border-danger-200 dark:border-danger-500';
        case 'moderate':
        case 'mild':
            return 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 border-warning-200 dark:border-warning-700';
        default:
            return 'bg-green-100 dark:bg-mono-900/30 text-mono-700 dark:text-mono-300 border-mono-200 dark:border-mono-700';
    }
};

const getIcon = (level: WarningLevel) => {
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

const Warning = ({warning}: WarningProps) => {
    return (
        <span className={cn(`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs border`, getColor(warning.level))}>
            <FontAwesomeIcon
                icon={getIcon(warning.level)}
                className="text-xs"
            />
            {capitalizeWords(warning.text)}
            <span className="ml-1 opacity-70">
                ({warning.level})
            </span>
        </span>
    );
};

export default Warning;