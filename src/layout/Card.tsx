import * as React from "react";
import {cn} from "../utils/cn.ts";

interface CardProps {
    className?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    variant?: "rounded" | "squared";
}

const Card = ({children, className, onClick, variant = "rounded"}: CardProps) => {
    const borderRadiusClass = variant === "squared" ? "rounded-lg" : "rounded-2xl";

    return (
        <div
            onClick={onClick}
            className={cn(
                "bg-white dark:bg-mono-800 shadow-lg border border-mono-200 dark:border-mono-700 p-6",
                borderRadiusClass,
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;
