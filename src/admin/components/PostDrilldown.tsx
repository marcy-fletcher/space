import Card from "../../layout/Card.tsx";
import type {OverviewCard, PostSeriesPoint, ReactionTotal} from "../types/dashboard.ts";
import MetricCardsGrid from "./MetricCardsGrid.tsx";
import ChartCard from "./ChartCard.tsx";
import PostActivityChart from "./charts/PostActivityChart.tsx";
import PostReactionChart from "./charts/PostReactionChart.tsx";
import {DashboardSection} from "./DashboardShell.tsx";

interface PostDrilldownProps {
    title?: string;
    cards: OverviewCard[];
    activitySeries: PostSeriesPoint[];
    reactionTotals: ReactionTotal[];
    detailLoading?: boolean;
    detailError?: string | Error | null;
    activityLoading?: boolean;
    activityError?: string | Error | null;
    className?: string;
}

const PostDrilldown = ({
    title,
    cards,
    activitySeries,
    reactionTotals,
    detailLoading = false,
    detailError = null,
    activityLoading = false,
    activityError = null,
    className
}: PostDrilldownProps) => {
    if (!title && !detailLoading && !detailError) {
        return (
            <Card className="text-sm text-mono-500 dark:text-mono-400">
                Select a post to inspect post-level metrics and chart breakdowns.
            </Card>
        );
    }

    return (
        <DashboardSection
            title={title ? `Post drilldown: ${title}` : "Post drilldown"}
            description="Period metrics respond to the current date filter. Lifetime cards and reaction totals stay stable."
            className={className}
        >
            {detailLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({length: 6}).map((_, index) => (
                        <Card key={index} className="h-32 animate-pulse bg-mono-50 dark:bg-mono-800"/>
                    ))}
                </div>
            ) : detailError ? (
                <Card className="border border-red-200 bg-red-50/70 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                    {typeof detailError === "string" ? detailError : detailError.message}
                </Card>
            ) : (
                <MetricCardsGrid
                    cards={cards}
                    emptyMessage="No drilldown metrics are available for the selected post."
                />
            )}

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <ChartCard
                    title="Post activity by day"
                    description="Comments and post-attributed debug logs for the selected post."
                    loading={activityLoading}
                    error={activityError}
                    isEmpty={!activityLoading && !activityError && activitySeries.length === 0}
                    emptyMessage="No period activity exists for the selected post."
                >
                    <PostActivityChart data={activitySeries}/>
                </ChartCard>

                <ChartCard
                    title="Reaction mix"
                    description="Lifetime reaction distribution for the selected post."
                    loading={detailLoading}
                    error={detailError}
                    isEmpty={!detailLoading && !detailError && reactionTotals.length === 0}
                    emptyMessage="This post has no recorded reactions yet."
                >
                    <PostReactionChart data={reactionTotals}/>
                </ChartCard>
            </div>
        </DashboardSection>
    );
};

export default PostDrilldown;
