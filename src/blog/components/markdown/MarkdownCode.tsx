import React from 'react';
import {cn} from "../../../utils/cn.ts";

interface MarkdownCodeProps {
    inline?: boolean;
    children?: React.ReactNode;
    className?: string;
}
const MarkdownCode = ({inline, children, className}:MarkdownCodeProps) => {
    if (inline) {
        return (
            <code className="bg-mono-100 dark:bg-mono-700 px-2 py-1 rounded
                        text-mono-800 dark:text-mono-200 text-sm font-mono
                        border border-mono-200 dark:border-mono-600">
                {children}
            </code>
        );
    }
    return (
        <code className={cn(`block bg-mono-900 text-mono-100 p-4 rounded-lg 
                         overflow-x-auto my-6 font-mono text-sm border border-mono-700`, className)}>
            {children}
        </code>
    );
};

export default MarkdownCode;