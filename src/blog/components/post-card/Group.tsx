import React from "react";
import {cn} from "../../../utils/cn.ts";

interface GroupProps {
    name: string;
    children?: React.ReactNode;
    className?: string;
}

const Group = ({name, children, className}: GroupProps) => {
    return (
        <div className={cn("mb-6", className)}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-mono-500 dark:text-mono-400 uppercase tracking-wide font-sans">
                    {name}
                </h3>
            </div>

            {children}
        </div>
    );
};

export default Group;