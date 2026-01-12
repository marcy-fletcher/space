import * as React from "react";
import {cn} from "../../utils/cn.ts";
import FoldoutIcon from "./FoldoutIcon.tsx";

interface FoldoutProps {
    className?: string;
    children?: React.ReactNode;
    title: string;
    defaultOpen?: boolean;
}

const Foldout = ({ className, children, title, defaultOpen = false }: FoldoutProps) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className={cn("bg-white dark:bg-mono-800 rounded-2xl shadow-lg border border-mono-200 dark:border-mono-700 p-4", className)}>
            <div
                onClick={toggleOpen}
                className="cursor-pointer flex items-center justify-between">
                <h3 className="text-lg font-semibold">{title}</h3>
                <FoldoutIcon isOpen={isOpen} />
            </div>

            {isOpen && (
                <div>{children}</div>
            )}
        </div>
    );
};

export default Foldout;
