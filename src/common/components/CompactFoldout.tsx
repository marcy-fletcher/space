import * as React from "react";
import {cn} from "../../utils/cn.ts";
import FoldoutIcon from "./FoldoutIcon.tsx";

interface CompactFoldoutProps {
    className?: string;
    children?: React.ReactNode;
    title: string;
    defaultOpen?: boolean;
}

const CompactFoldout = ({className, children, title, defaultOpen = false}: CompactFoldoutProps) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div
            className={cn("bg-white dark:bg-mono-800 rounded-lg shadow-sm border border-mono-200 dark:border-mono-700 p-2", className)}>
            <div
                onClick={toggleOpen}
                className="cursor-pointer flex items-center justify-between text-sm">
                <h3 className="font-semibold">{title}</h3>
                <FoldoutIcon isOpen={isOpen}/>
            </div>

            {isOpen && (
                <div className="mt-2">{children}</div>
            )}
        </div>
    );
};

export default CompactFoldout;