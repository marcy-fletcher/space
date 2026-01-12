import {cn} from "../../utils/cn.ts";
import React from "react";

interface TooltipProps {
    text: string;
    className?: string;
    children?: React.ReactNode;
    enabled?: boolean;
}

const Tooltip = ({text, enabled=true, children, className}: TooltipProps) => {
    return (
        <div className={cn("group relative", className)}>

            {children}

            <span className={cn(`text-xs font-medium text-white bg-gray-900 dark:bg-gray-100 
                dark:text-gray-900 rounded-md pointer-events-none
                transition-opacity whitespace-nowrap z-10 opacity-0 
                absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5`,
                enabled && "group-hover:opacity-100 transition-opacity")}>

                {text}

                <span className={`absolute top-full left-1/2 -translate-x-1/2 -mt-1 
                rotate-45 w-2 h-2 bg-gray-900 dark:bg-gray-100`}/>
            </span>
        </div>
    );
};

export default Tooltip;