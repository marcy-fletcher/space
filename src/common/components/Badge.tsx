import {type ReactNode} from 'react';
import {cn} from "../../utils/cn.ts";

type Variant = 'red' | 'gold' | 'green' | 'primary' | 'gray';

interface BadgeProps {
    children?: ReactNode;
    variant?: Variant;
    className?: string;
    onClick?: () => void;
}

const getColor = (color: Variant) => {
    switch (color) {
        case "green":
            return "bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700/50";
        case "gold":
            return "bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/50";
        case "primary":
            return "bg-gradient-to-r from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-700/50";
        case "gray":
            return "text-mono-500 dark:text-mono-400 bg-white/50 dark:bg-mono-800/50 px-4 border-mono-200 dark:border-mono-700";
        case "red":
            return "bg-gradient-to-r from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700/50";
        default:
            return "bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800/30 dark:to-gray-700/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700/50";
    }
}

const Badge = ({children, className, onClick, variant = 'primary'}: BadgeProps) => {
    return (
        <div
            onClick={onClick}
            className={cn(`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border`, getColor(variant), className)}>
            {children}
        </div>
    );
};

export default Badge;