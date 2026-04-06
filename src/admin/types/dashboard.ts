export type DashboardDatePreset = '7d' | '30d' | '90d' | 'all';

export type DashboardDateString = string;

export interface DashboardDateFilter {
    preset: DashboardDatePreset;
    start: DashboardDateString | null;
    end: DashboardDateString | null;
    selectedPostId: string | null;
}

export type DashboardCardKind = 'number' | 'currency' | 'percentage' | 'ratio' | 'trend' | 'text';

export interface OverviewCard {
    label: string;
    value: string | number;
    kind: DashboardCardKind;
    hint: string | null;
}

export interface OverviewChartPoint {
    date: DashboardDateString;
    posts: number;
    comments: number;
    reactions: number;
}

export interface PostSeriesPoint {
    date: DashboardDateString;
    comments: number;
    reactions: number;
}

export interface RankedPostRow {
    postId: string;
    title: string;
    slug: string | null;
    rank: number;
    lifetimeComments: number;
    periodComments: number;
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
