import {useEffect, useMemo} from "react";
import {useUrlStorage} from "../../common/hooks/useUrlStorage.ts";
import {
    defaultDashboardPreset,
    useDashboardStore
} from "../model/dashboardStore.ts";
import type {
    DashboardDateFilter,
    DashboardDatePreset,
    DashboardDateString,
    DashboardQueryFilters
} from "../types/dashboard.ts";
import {
    isInvertedDateRange,
    normalizeInclusiveEnd,
    normalizeInclusiveStart,
    resolveDateRangePreset
} from "../utils/dateRange.ts";

export interface DashboardUrlParams {
    preset?: DashboardDatePreset;
    start?: string;
    end?: string;
    selectedPostId?: string;
}

function toUrlParams(filters: DashboardDateFilter): DashboardUrlParams {
    return {
        preset: filters.preset === defaultDashboardPreset ? undefined : filters.preset,
        start: filters.start ?? undefined,
        end: filters.end ?? undefined,
        selectedPostId: filters.selectedPostId ?? undefined
    };
}

function toStoredFilters(params?: DashboardUrlParams): DashboardDateFilter {
    return {
        preset: params?.preset ?? defaultDashboardPreset,
        start: normalizeInclusiveStart(params?.start),
        end: normalizeInclusiveEnd(params?.end),
        selectedPostId: params?.selectedPostId ?? null
    };
}

export function resolveEffectiveDashboardRange(filters: DashboardDateFilter): DashboardQueryFilters {
    if (filters.start || filters.end) {
        return {
            preset: filters.preset,
            start: filters.start,
            end: filters.end
        };
    }

    const presetRange = resolveDateRangePreset(filters.preset);

    return {
        preset: filters.preset,
        start: presetRange.start,
        end: presetRange.end
    };
}

export const useDashboardFilters = () => {
    const {
        preset,
        start,
        end,
        selectedPostId,
        initialized,
        setPreset,
        setStart,
        setEnd,
        setSelectedPostId,
        setFilters,
        clearCustomRange,
        resetSelectedPost,
        resetFilters
    } = useDashboardStore();

    const filters = useMemo<DashboardDateFilter>(() => ({
        preset,
        start,
        end,
        selectedPostId
    }), [preset, start, end, selectedPostId]);

    const effectiveFilters = useMemo(
        () => resolveEffectiveDashboardRange(filters),
        [filters]
    );

    const hasCustomRange = Boolean(start || end);
    const hasInvalidCustomRange = hasCustomRange && isInvertedDateRange({start, end});
    const validationMessage = hasInvalidCustomRange
        ? "Start date must be on or before end date."
        : null;

    useUrlStorage(
        toUrlParams(filters) as Record<string, string>,
        (params) => setFilters(toStoredFilters(params as DashboardUrlParams)),
        initialized
    );

    useEffect(() => {
        return () => {
            resetFilters();
        };
    }, [resetFilters]);

    const actions = useMemo(() => ({
        setPreset,
        setStart: (value: DashboardDateString | null) => setStart(normalizeInclusiveStart(value)),
        setEnd: (value: DashboardDateString | null) => setEnd(normalizeInclusiveEnd(value)),
        setSelectedPostId,
        setCustomRange: (nextStart: DashboardDateString | null, nextEnd: DashboardDateString | null) => {
            setFilters({
                start: normalizeInclusiveStart(nextStart),
                end: normalizeInclusiveEnd(nextEnd)
            });
        },
        clearCustomRange,
        resetSelectedPost,
        resetFilters
    }), [
        clearCustomRange,
        resetFilters,
        resetSelectedPost,
        setEnd,
        setFilters,
        setPreset,
        setSelectedPostId,
        setStart
    ]);

    return {
        filters,
        effectiveFilters,
        hasCustomRange,
        hasInvalidCustomRange,
        validationMessage,
        initialized,
        actions
    };
};
