import Card from "../../layout/Card.tsx";
import Button from "../../common/components/Button.tsx";
import Select from "../../common/components/Select.tsx";
import type {DashboardDateFilter, DashboardDatePreset, DashboardDateString} from "../types/dashboard.ts";
import {cn} from "../../utils/cn.ts";

interface DashboardPostOption {
    id: string;
    title: string;
}

interface DashboardFilterBarProps {
    filters: DashboardDateFilter;
    validationMessage?: string | null;
    postOptions: DashboardPostOption[];
    disabled?: boolean;
    postsLoading?: boolean;
    className?: string;
    onPresetChange: (preset: DashboardDatePreset) => void;
    onStartChange: (value: DashboardDateString | null) => void;
    onEndChange: (value: DashboardDateString | null) => void;
    onSelectedPostChange: (postId: string | null) => void;
}

const presetLabels: Record<DashboardDatePreset, string> = {
    "7d": "7d",
    "30d": "30d",
    "90d": "90d",
    all: "All time"
};

function toInputValue(value: DashboardDateString | null): string {
    return value ?? "";
}

const DashboardFilterBar = ({
    filters,
    validationMessage,
    postOptions,
    disabled = false,
    postsLoading = false,
    className,
    onPresetChange,
    onStartChange,
    onEndChange,
    onSelectedPostChange
}: DashboardFilterBarProps) => {
    return (
        <Card className={cn("flex flex-col gap-4", className)}>
            <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-mono-900 dark:text-mono-100">
                        Date range
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {(Object.keys(presetLabels) as DashboardDatePreset[]).map((preset) => {
                            const isActive = filters.preset === preset;

                            return (
                                <Button
                                    key={preset}
                                    type="button"
                                    size="small"
                                    shape="square"
                                    variant={isActive ? "primary" : "outline"}
                                    disabled={disabled}
                                    className="min-w-18 justify-center"
                                    onClick={() => onPresetChange(preset)}
                                >
                                    {presetLabels[preset]}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:min-w-[22rem]">
                    <label className="flex flex-col gap-2 text-sm font-medium text-mono-700 dark:text-mono-300">
                        Start date
                        <input
                            type="date"
                            value={toInputValue(filters.start)}
                            disabled={disabled}
                            onChange={(event) => onStartChange(event.target.value || null)}
                            className="rounded-md border border-mono-300 bg-white px-3 py-2 text-sm text-mono-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-mono-600 dark:bg-mono-700 dark:text-mono-50"
                        />
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-medium text-mono-700 dark:text-mono-300">
                        End date
                        <input
                            type="date"
                            value={toInputValue(filters.end)}
                            disabled={disabled}
                            onChange={(event) => onEndChange(event.target.value || null)}
                            className="rounded-md border border-mono-300 bg-white px-3 py-2 text-sm text-mono-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-mono-600 dark:bg-mono-700 dark:text-mono-50"
                        />
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-h-5 text-sm">
                    {validationMessage ? (
                        <p className="font-medium text-red-600 dark:text-red-400">
                            {validationMessage}
                        </p>
                    ) : (
                        <p className="text-mono-500 dark:text-mono-400">
                            Choose a preset or provide a custom inclusive date range.
                        </p>
                    )}
                </div>

                <Select
                    label="Selected post"
                    className="w-full md:max-w-md"
                    value={filters.selectedPostId ?? ""}
                    options={[
                        {
                            label: postsLoading ? "Loading posts..." : "All posts",
                            value: ""
                        },
                        ...postOptions.map((option) => ({
                            label: option.title,
                            value: option.id
                        }))
                    ]}
                    onChange={(value) => onSelectedPostChange(value || null)}
                />
            </div>
        </Card>
    );
};

export default DashboardFilterBar;
