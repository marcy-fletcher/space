import React from 'react';
import {cn} from "../../utils/cn.ts";

interface SubtitleProps {
    className?: string;
    children: React.ReactNode;
}

const Subtitle = ({children, className}: SubtitleProps) => {
    return (
        <p className={cn("text-mono-600 dark:text-mono-400 text-sm", className)}>
            {children}
        </p>
    );
};

export default Subtitle;