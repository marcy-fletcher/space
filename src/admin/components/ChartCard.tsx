import type {ReactNode} from "react";
import Card from "../../layout/Card.tsx";
import {cn} from "../../utils/cn.ts";

interface ChartCardProps {
    title: string;
    description?: string;
    loading?: boolean;
    error?: string | Error | null;
    isEmpty?: boolean;
    emptyMessage?: string;
    minHeightClassName?: string;
    children?: ReactNode;
    className?: string;
}

function getErrorMessage(error: string | Error | null | undefined): string {
    if (!error) {
        return "Unable to load this chart.";
    }

    if (typeof error === "string") {
        return error;
    }

    return error.message || "Unable to load this chart.";
}

const ChartCard = ({
    title,
    description,
    loading = false,
    error = null,
    isEmpty = false,
    emptyMessage = "No data is available for this selection.",
    minHeightClassName = "min-h-[22rem]",
    children,
    className
}: ChartCardProps) => {
    let content: ReactNode = children;

    if (loading) {
        content = (
            <div className="flex h-full flex-col justify-center gap-4">
                <div className="h-4 w-40 animate-pulse rounded bg-mono-200 dark:bg-mono-700"/>
                <div className="h-48 animate-pulse rounded-2xl bg-mono-100 dark:bg-mono-800"/>
            </div>
        );
    } else if (error) {
        content = (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50/70 p-6 text-center text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                {getErrorMessage(error)}
            </div>
        );
    } else if (isEmpty) {
        content = (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-mono-200 bg-mono-50/70 p-6 text-center text-sm text-mono-500 dark:border-mono-700 dark:bg-mono-800/50 dark:text-mono-400">
                {emptyMessage}
            </div>
        );
    }

    return (
        <Card className={cn("flex h-full flex-col gap-4", className)}>
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-mono-900 dark:text-mono-50">
                    {title}
                </h3>
                {description && (
                    <p className="text-sm text-mono-500 dark:text-mono-400">
                        {description}
                    </p>
                )}
            </div>

            <div className={cn("flex-1", minHeightClassName)}>
                {content}
            </div>
        </Card>
    );
};

export default ChartCard;
