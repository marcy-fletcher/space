import type {ReactNode} from "react";
import {cn} from "../../utils/cn.ts";

interface DashboardShellProps {
    title?: string;
    description?: string;
    actions?: ReactNode;
    children?: ReactNode;
    className?: string;
}

interface DashboardSectionProps {
    title?: string;
    description?: string;
    children?: ReactNode;
    className?: string;
}

export function DashboardSection({
    title,
    description,
    children,
    className
}: DashboardSectionProps) {
    return (
        <section className={cn("flex flex-col gap-4", className)}>
            {(title || description) && (
                <div className="flex flex-col gap-1">
                    {title && (
                        <h2 className="text-lg font-semibold text-mono-900 dark:text-mono-50">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-sm text-mono-500 dark:text-mono-400">
                            {description}
                        </p>
                    )}
                </div>
            )}
            {children}
        </section>
    );
}

const DashboardShell = ({
    title,
    description,
    actions,
    children,
    className
}: DashboardShellProps) => {
    return (
        <div className={cn("container mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 md:py-8", className)}>
            {(title || description || actions) && (
                <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="flex flex-col gap-2">
                        {title && (
                            <h1 className="text-3xl font-semibold tracking-tight text-mono-900 dark:text-mono-50">
                                {title}
                            </h1>
                        )}
                        {description && (
                            <p className="max-w-3xl text-sm text-mono-500 dark:text-mono-400 md:text-base">
                                {description}
                            </p>
                        )}
                    </div>
                    {actions && (
                        <div className="flex flex-wrap items-center gap-3">
                            {actions}
                        </div>
                    )}
                </header>
            )}

            <div className="flex flex-col gap-8">
                {children}
            </div>
        </div>
    );
};

export default DashboardShell;
