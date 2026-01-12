import React from 'react';
import {cn} from "../utils/cn.ts";

interface ContentProps {
    className?: string;
    children?: React.ReactNode;
}

const Content = ({children, className}: ContentProps) => {
    return (
        <div
            className={cn(
                "min-h-screen bg-linear-to-br from-mono-50 to-mono-100 dark:from-mono-900 dark:to-mono-800 py-8 px-4 flex flex-col justify-between items-start",
                className
            )}
        >
            {children}
        </div>

    );
};

export default Content;