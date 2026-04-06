import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import type {DashboardQueryFilters} from "../types/dashboard.ts";
import {isInvertedDateRange} from "../utils/dateRange.ts";
import {
    getDashboardOverview,
    getDashboardOverviewSeries,
    getDashboardPostDetail,
    getDashboardPostSeries,
    getPostOptions,
    getRankedPosts
} from "../services/dashboard.service.ts";

function buildFilterKey(filters: DashboardQueryFilters): [string, string, string] {
    return [
        filters.preset,
        filters.start ?? "",
        filters.end ?? ""
    ];
}

export const useDashboardData = (
    effectiveFilters: DashboardQueryFilters,
    selectedPostId: string | null,
    enabled: boolean
) => {
    const filterKey = useMemo(() => buildFilterKey(effectiveFilters), [effectiveFilters]);
    const filtersAreValid = useMemo(
        () => !isInvertedDateRange({start: effectiveFilters.start, end: effectiveFilters.end}),
        [effectiveFilters.end, effectiveFilters.start]
    );
    const queriesEnabled = enabled && filtersAreValid;

    const overviewQuery = useQuery({
        queryKey: ["admin-dashboard", "overview", ...filterKey],
        queryFn: () => getDashboardOverview(effectiveFilters),
        enabled: queriesEnabled,
        staleTime: 1000 * 60 * 5,
        retry: 2
    });

    const overviewSeriesQuery = useQuery({
        queryKey: ["admin-dashboard", "overview-series", ...filterKey],
        queryFn: () => getDashboardOverviewSeries(effectiveFilters),
        enabled: queriesEnabled,
        staleTime: 1000 * 60 * 5,
        retry: 2
    });

    const rankedPostsQuery = useQuery({
        queryKey: ["admin-dashboard", "ranked-posts", ...filterKey],
        queryFn: () => getRankedPosts(effectiveFilters),
        enabled: queriesEnabled,
        staleTime: 1000 * 60 * 5,
        retry: 2
    });

    const postOptionsQuery = useQuery({
        queryKey: ["admin-dashboard", "post-options"],
        queryFn: getPostOptions,
        enabled,
        staleTime: 1000 * 60 * 5,
        retry: 2
    });

    const selectedPostDetailQuery = useQuery({
        queryKey: ["admin-dashboard", "selected-post-detail", ...filterKey, selectedPostId ?? ""],
        queryFn: () => getDashboardPostDetail(effectiveFilters, selectedPostId!),
        enabled: queriesEnabled && Boolean(selectedPostId),
        staleTime: 1000 * 60 * 5,
        retry: 2
    });

    const selectedPostSeriesQuery = useQuery({
        queryKey: ["admin-dashboard", "selected-post-series", ...filterKey, selectedPostId ?? ""],
        queryFn: () => getDashboardPostSeries(effectiveFilters, selectedPostId!),
        enabled: queriesEnabled && Boolean(selectedPostId),
        staleTime: 1000 * 60 * 5,
        retry: 2
    });

    const topRankedPosts = useMemo(
        () => (rankedPostsQuery.data ?? []).slice(0, 5),
        [rankedPostsQuery.data]
    );

    return {
        overviewQuery,
        overviewSeriesQuery,
        rankedPostsQuery,
        postOptionsQuery,
        selectedPostDetailQuery,
        selectedPostSeriesQuery,
        filtersAreValid,
        topRankedPosts
    };
};
