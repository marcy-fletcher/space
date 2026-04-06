export type DashboardDatePreset = '7d' | '30d' | '90d' | 'all';

export type DashboardDateString = string;

export interface DashboardDateFilter {
    preset: DashboardDatePreset;
    start: DashboardDateString | null;
    end: DashboardDateString | null;
    selectedPostId: string | null;
}

export type DashboardCardKind = 'number' | 'currency' | 'percentage' | 'trend' | 'text';

export interface OverviewCard {
    label: string;
    value: string | number;
    kind: DashboardCardKind;
    hint: string | null;
}

export interface OverviewChartPoint {
    date: DashboardDateString;
    visits: number;
    debugLogs: number;
    posts: number;
    comments: number;
}

export interface PostSeriesPoint {
    date: DashboardDateString;
    comments: number;
}

export interface RankedPostRow {
    postId: string;
    title: string;
    publicationState: 'draft' | 'published' | 'scheduled' | 'archived';
    createdAt: DashboardDateString;
    lifetimeViews: number;
    lifetimeComments: number;
    lifetimeReactions: number;
    periodCommentsCreated: number;
}

export interface ReactionTotal {
    reaction: string;
    total: number;
}

export interface SelectedPostDetail {
    postId: string;
    title: string;
    cards: OverviewCard[];
    activityPoints: PostSeriesPoint[];
    reactionTotals: ReactionTotal[];
}
