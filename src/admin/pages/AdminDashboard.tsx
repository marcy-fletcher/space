import {useEffect} from "react";
import {useDocumentTitle} from "../../layout/hooks/useDocumentTitle.ts";
import {useDashboardFilters} from "../hooks/useDashboardFilters.ts";
import {useDashboardData} from "../hooks/useDashboardData.ts";
import DashboardShell, {DashboardSection} from "../components/DashboardShell.tsx";
import DashboardFilterBar from "../components/DashboardFilterBar.tsx";
import MetricCardsGrid from "../components/MetricCardsGrid.tsx";
import ChartCard from "../components/ChartCard.tsx";
import OverviewActivityChart from "../components/charts/OverviewActivityChart.tsx";
import TopPostsChart from "../components/charts/TopPostsChart.tsx";
import RankedPostsTable from "../components/RankedPostsTable.tsx";
import PostDrilldown from "../components/PostDrilldown.tsx";
import Card from "../../layout/Card.tsx";

const AdminDashboard = () => {
    const {
        filters,
        effectiveFilters,
        hasCustomRange,
        hasInvalidCustomRange,
        validationMessage,
        initialized,
        actions
    } = useDashboardFilters();

    const {
        overviewQuery,
        overviewSeriesQuery,
        rankedPostsQuery,
        postOptionsQuery,
        selectedPostDetailQuery,
        selectedPostSeriesQuery,
        filtersAreValid,
        topRankedPosts
    } = useDashboardData(effectiveFilters, filters.selectedPostId, initialized);

    useDocumentTitle("Admin dashboard");

    const rankedPosts = rankedPostsQuery.data ?? [];
    const selectedPostDetail = selectedPostDetailQuery.data;

    useEffect(() => {
        if (!filtersAreValid || rankedPostsQuery.isLoading || rankedPostsQuery.isError) {
            return;
        }

        if (rankedPosts.length === 0) {
            if (filters.selectedPostId !== null) {
                actions.setSelectedPostId(null);
            }

            return;
        }

        const selectedPostStillVisible = filters.selectedPostId != null &&
            rankedPosts.some((post) => post.postId === filters.selectedPostId);

        if (!selectedPostStillVisible) {
            const nextSelectedPostId = rankedPosts[0].postId;

            if (filters.selectedPostId !== nextSelectedPostId) {
                actions.setSelectedPostId(nextSelectedPostId);
            }
        }
    }, [actions, filters.selectedPostId, filtersAreValid, rankedPosts, rankedPostsQuery.isError, rankedPostsQuery.isLoading]);

    return (
        <DashboardShell
            title="Admin dashboard"
            description="Read-only analytics for traffic, content activity, and post-level performance."
        >
            <DashboardSection
                title="Filters"
                description="Adjust the reporting window and keep the drilldown selection synchronized across the dashboard."
            >
                <DashboardFilterBar
                    filters={filters}
                    activePreset={hasCustomRange ? null : filters.preset}
                    validationMessage={validationMessage}
                    postOptions={postOptionsQuery.data ?? []}
                    postsLoading={postOptionsQuery.isLoading}
                    onPresetChange={actions.setPreset}
                    onStartChange={actions.setStart}
                    onEndChange={actions.setEnd}
                    onSelectedPostChange={actions.setSelectedPostId}
                />
            </DashboardSection>

            <DashboardSection
                title="Overview"
                description="Period cards respond to the current range. Lifetime cards stay stable."
            >
                <MetricCardsGrid
                    cards={overviewQuery.data ?? []}
                    emptyMessage={hasInvalidCustomRange
                        ? "Fix the custom date range to load overview metrics."
                        : "No overview metrics are available for this selection."
                    }
                />
            </DashboardSection>

            <DashboardSection
                title="Activity and ranked posts"
                description="Use the chart for aggregate trends and the table to drive the post drilldown."
            >
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <ChartCard
                        title="Overview activity by day"
                        description="Visits, debug logs, comments, and posts created within the selected period."
                        loading={overviewSeriesQuery.isLoading}
                        error={overviewSeriesQuery.error}
                        isEmpty={!overviewSeriesQuery.isLoading && !overviewSeriesQuery.error && (overviewSeriesQuery.data ?? []).length === 0}
                        emptyMessage={hasInvalidCustomRange
                            ? "Fix the custom date range to load overview activity."
                            : "No overview activity exists for this selection."
                        }
                    >
                        <OverviewActivityChart data={overviewSeriesQuery.data ?? []}/>
                    </ChartCard>

                    <ChartCard
                        title="Top posts by lifetime views"
                        description="The top five ranked posts based on the current ranked list."
                        loading={rankedPostsQuery.isLoading}
                        error={rankedPostsQuery.error}
                        isEmpty={!rankedPostsQuery.isLoading && !rankedPostsQuery.error && topRankedPosts.length === 0}
                        emptyMessage={hasInvalidCustomRange
                            ? "Fix the custom date range to load ranked posts."
                            : "No ranked posts are available for this selection."
                        }
                    >
                        <TopPostsChart posts={topRankedPosts}/>
                    </ChartCard>
                </div>

                {rankedPostsQuery.error ? (
                    <Card className="border border-red-200 bg-red-50/70 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                        {rankedPostsQuery.error.message}
                    </Card>
                ) : (
                    <RankedPostsTable
                        posts={rankedPosts}
                        selectedPostId={filters.selectedPostId}
                        onSelectPostId={actions.setSelectedPostId}
                    />
                )}
            </DashboardSection>

            <PostDrilldown
                title={selectedPostDetail?.title}
                cards={selectedPostDetail?.cards ?? []}
                activitySeries={selectedPostSeriesQuery.data ?? []}
                reactionTotals={selectedPostDetail?.reactionTotals ?? []}
                detailLoading={selectedPostDetailQuery.isLoading}
                detailError={selectedPostDetailQuery.error}
                activityLoading={selectedPostSeriesQuery.isLoading}
                activityError={selectedPostSeriesQuery.error}
            />
        </DashboardShell>
    );
};

export default AdminDashboard;
