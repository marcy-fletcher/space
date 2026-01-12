import {cn} from "../../../utils/cn.ts";
import React from "react";

interface TagBadgeProps {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

const TagBadge = ({children, className, onClick}: TagBadgeProps) => {
    return (
        <span
            onClick={onClick}
            className={cn(`px-3 py-1 bg-primary-100 dark:bg-primary-800
                    text-primary-700 dark:text-primary-200 rounded-full text-sm font-medium font-sans
                    shadow-sm select-none`, className)}
        >
            {children}
        </span>
    );
};

export default TagBadge;