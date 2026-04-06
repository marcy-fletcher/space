import {getSupabase} from "../../utils/supabase.ts";
import type {
    OverviewCard,
    OverviewChartPoint,
    PostSeriesPoint,
    RankedPostRow,
    ReactionTotal,
    SelectedPostDetail
} from "../types/dashboard.ts";
import {getDailyBucketLabel, toOpenEndedEndBoundary, toOpenEndedStartBoundary} from "../utils/dateRange.ts";
import type {DashboardEffectiveFilters} from "../hooks/useDashboardFilters.ts";

interface DashboardPostRowDto {
    id: number;
    created_at: string;
    is_published: boolean;
    post_contents: {
        title: string;
    } | Array<{
        title: string;
    }> | null;
    post_views: {
        views: number | null;
    } | Array<{
        views: number | null;
    }> | null;
    post_comment_counts: {
        comment_count: number | null;
    } | Array<{
        comment_count: number | null;
    }> | null;
}

interface DashboardCommentDto {
    post_id: number | null;
    created_at: string;
}

interface DashboardDebugLogDto {
    created_at: string;
}

interface DashboardReactionDto {
    post_id: number;
    reaction: string;
}

interface DashboardPostOption {
    id: string;
    title: string;
}

const PERIOD_HINT = "Period";
const LIFETIME_HINT = "Lifetime";

function applyDateRange<TQuery extends {
    gte: (column: string, value: string) => TQuery;
    lte: (column: string, value: string) => TQuery;
}>(query: TQuery, filters: DashboardEffectiveFilters, column: string): TQuery {
    const startBoundary = toOpenEndedStartBoundary(filters.start);
    const endBoundary = toOpenEndedEndBoundary(filters.end);

    if (startBoundary) {
        query = query.gte(column, startBoundary.toISOString());
    }

    if (endBoundary) {
        query = query.lte(column, endBoundary.toISOString());
    }

    return query;
}

function buildBuckets(start: string | null, end: string | null, dates: string[]): string[] {
    const sortedDates = dates
        .map((value) => new Date(value))
        .filter((value) => !Number.isNaN(value.getTime()))
        .sort((left, right) => left.getTime() - right.getTime());

    const firstDate = start ? new Date(start) : sortedDates[0];
    const lastDate = end ? new Date(end) : sortedDates[sortedDates.length - 1];

    if (!firstDate || !lastDate || Number.isNaN(firstDate.getTime()) || Number.isNaN(lastDate.getTime())) {
        return [];
    }

    const buckets: string[] = [];
    const cursor = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    const finalDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());

    while (cursor.getTime() <= finalDate.getTime()) {
        const label = getDailyBucketLabel(cursor);
        if (label) {
            buckets.push(label);
        }

        cursor.setDate(cursor.getDate() + 1);
    }

    return buckets;
}

function countByDay(rows: Array<{created_at: string}>): Map<string, number> {
    return rows.reduce((accumulator, row) => {
        const label = getDailyBucketLabel(row.created_at);
        if (!label) {
            return accumulator;
        }

        accumulator.set(label, (accumulator.get(label) ?? 0) + 1);
        return accumulator;
    }, new Map<string, number>());
}

function toIsoDate(value: string): string {
    const label = getDailyBucketLabel(value);
    return label ?? value;
}

function readSingleRelation<T>(value: T | T[] | null | undefined): T | null {
    if (Array.isArray(value)) {
        return value[0] ?? null;
    }

    return value ?? null;
}

function getPostTitleLabel(post: DashboardPostRowDto): string {
    return readSingleRelation(post.post_contents)?.title ?? `Post #${post.id}`;
}

function getPostViews(post: DashboardPostRowDto): number {
    return readSingleRelation(post.post_views)?.views ?? 0;
}

function getPostCommentCount(post: DashboardPostRowDto): number {
    return readSingleRelation(post.post_comment_counts)?.comment_count ?? 0;
}

function sumValues<T>(values: T[], selector: (value: T) => number): number {
    return values.reduce((accumulator, value) => accumulator + selector(value), 0);
}

async function getPostsBaseRows(): Promise<DashboardPostRowDto[]> {
    const supabase = await getSupabase();
    const {data, error} = await supabase
        .schema("blog")
        .from("posts")
        .select(`
            id,
            created_at,
            is_published,
            post_contents(title),
            post_views(views),
            post_comment_counts(comment_count)
        `);

    if (error) {
        throw error;
    }

    return (data ?? []) as unknown as DashboardPostRowDto[];
}

async function getCommentsInRange(filters: DashboardEffectiveFilters): Promise<DashboardCommentDto[]> {
    const supabase = await getSupabase();
    let query = supabase
        .schema("blog")
        .from("comments")
        .select("post_id, created_at")
        .eq("is_deleted", false);

    query = applyDateRange(query, filters, "created_at");

    const {data, error} = await query;

    if (error) {
        throw error;
    }

    return (data ?? []) as DashboardCommentDto[];
}

async function getGlobalDebugLogsInRange(filters: DashboardEffectiveFilters): Promise<DashboardDebugLogDto[]> {
    const supabase = await getSupabase();
    let query = supabase
        .schema("logging")
        .from("debug_logs")
        .select("created_at");

    query = applyDateRange(query, filters, "created_at");

    const {data, error} = await query;

    if (error) {
        throw error;
    }

    return (data ?? []) as DashboardDebugLogDto[];
}

async function getVisitsInRange(filters: DashboardEffectiveFilters): Promise<DashboardDebugLogDto[]> {
    const supabase = await getSupabase();
    let query = supabase
        .schema("logging")
        .from("visits")
        .select("created_at");

    query = applyDateRange(query, filters, "created_at");

    const {data, error} = await query;

    if (error) {
        throw error;
    }

    return (data ?? []) as DashboardDebugLogDto[];
}

async function getPostsCreatedInRange(filters: DashboardEffectiveFilters): Promise<Array<{created_at: string}>> {
    const supabase = await getSupabase();
    let query = supabase
        .schema("blog")
        .from("posts")
        .select("created_at");

    query = applyDateRange(query, filters, "created_at");

    const {data, error} = await query;

    if (error) {
        throw error;
    }

    return (data ?? []) as Array<{created_at: string}>;
}

async function getAllReactions(): Promise<DashboardReactionDto[]> {
    const supabase = await getSupabase();
    const {data, error} = await supabase
        .schema("blog")
        .from("post_reactions")
        .select("post_id, reaction");

    if (error) {
        throw error;
    }

    return (data ?? []) as DashboardReactionDto[];
}

async function getPostTitle(postId: string): Promise<string | null> {
    const supabase = await getSupabase();
    const {data, error} = await supabase
        .schema("blog")
        .from("posts")
        .select("post_contents(title)")
        .eq("id", postId)
        .single();

    if (error) {
        throw error;
    }

    const row = data as unknown as {post_contents: {title: string} | Array<{title: string}> | null} | null;
    return readSingleRelation(row?.post_contents)?.title ?? null;
}

async function getPostDebugLogsInRange(filters: DashboardEffectiveFilters, title: string): Promise<DashboardDebugLogDto[]> {
    const supabase = await getSupabase();
    let query = supabase
        .schema("logging")
        .from("debug_logs")
        .select("created_at")
        .eq("metadata->>pageName", "Post")
        .eq("metadata->>name", title);

    query = applyDateRange(query, filters, "created_at");

    const {data, error} = await query;

    if (error) {
        throw error;
    }

    return (data ?? []) as DashboardDebugLogDto[];
}

function buildReactionTotals(reactions: DashboardReactionDto[]): ReactionTotal[] {
    const counts = reactions.reduce((accumulator, reaction) => {
        accumulator.set(reaction.reaction, (accumulator.get(reaction.reaction) ?? 0) + 1);
        return accumulator;
    }, new Map<string, number>());

    return Array.from(counts.entries())
        .map(([reaction, total]) => ({reaction, total}))
        .sort((left, right) => right.total - left.total || left.reaction.localeCompare(right.reaction));
}

export async function getDashboardOverview(filters: DashboardEffectiveFilters): Promise<OverviewCard[]> {
    const [
        visits,
        debugLogs,
        createdPosts,
        comments,
        posts,
        reactions
    ] = await Promise.all([
        getVisitsInRange(filters),
        getGlobalDebugLogsInRange(filters),
        getPostsCreatedInRange(filters),
        getCommentsInRange(filters),
        getPostsBaseRows(),
        getAllReactions()
    ]);

    const publishedCount = posts.filter((post) => post.is_published).length;
    const draftCount = posts.length - publishedCount;
    const totalViews = sumValues(posts, getPostViews);
    const totalComments = sumValues(posts, getPostCommentCount);

    return [
        {label: "Visits", value: visits.length, kind: "number", hint: PERIOD_HINT},
        {label: "Debug logs", value: debugLogs.length, kind: "number", hint: PERIOD_HINT},
        {label: "Posts created", value: createdPosts.length, kind: "number", hint: PERIOD_HINT},
        {label: "Comments created", value: comments.length, kind: "number", hint: PERIOD_HINT},
        {label: "Published posts", value: publishedCount, kind: "number", hint: LIFETIME_HINT},
        {label: "Draft posts", value: draftCount, kind: "number", hint: LIFETIME_HINT},
        {label: "Total views", value: totalViews, kind: "number", hint: LIFETIME_HINT},
        {label: "Total comments", value: totalComments, kind: "number", hint: LIFETIME_HINT},
        {label: "Total reactions", value: reactions.length, kind: "number", hint: LIFETIME_HINT}
    ];
}

export async function getDashboardOverviewSeries(filters: DashboardEffectiveFilters): Promise<OverviewChartPoint[]> {
    const [visits, debugLogs, createdPosts, comments] = await Promise.all([
        getVisitsInRange(filters),
        getGlobalDebugLogsInRange(filters),
        getPostsCreatedInRange(filters),
        getCommentsInRange(filters)
    ]);

    const allDates = [
        ...visits.map((row) => row.created_at),
        ...debugLogs.map((row) => row.created_at),
        ...createdPosts.map((row) => row.created_at),
        ...comments.map((row) => row.created_at)
    ];

    const buckets = buildBuckets(filters.start, filters.end, allDates);
    if (buckets.length === 0) {
        return [];
    }

    const visitsByDay = countByDay(visits);
    const debugLogsByDay = countByDay(debugLogs);
    const postsByDay = countByDay(createdPosts);
    const commentsByDay = countByDay(comments);

    return buckets.map((date) => ({
        date,
        visits: visitsByDay.get(date) ?? 0,
        debugLogs: debugLogsByDay.get(date) ?? 0,
        posts: postsByDay.get(date) ?? 0,
        comments: commentsByDay.get(date) ?? 0
    }));
}

export async function getRankedPosts(filters: DashboardEffectiveFilters): Promise<RankedPostRow[]> {
    const [posts, comments, reactions] = await Promise.all([
        getPostsBaseRows(),
        getCommentsInRange(filters),
        getAllReactions()
    ]);

    const commentsByPost = comments.reduce((accumulator, comment) => {
        if (comment.post_id == null) {
            return accumulator;
        }

        accumulator.set(comment.post_id, (accumulator.get(comment.post_id) ?? 0) + 1);
        return accumulator;
    }, new Map<number, number>());

    const reactionsByPost = reactions.reduce((accumulator, reaction) => {
        accumulator.set(reaction.post_id, (accumulator.get(reaction.post_id) ?? 0) + 1);
        return accumulator;
    }, new Map<number, number>());

    return posts
        .map((post) => {
            const publicationState: RankedPostRow["publicationState"] = post.is_published ? "published" : "draft";

            return {
            postId: String(post.id),
            title: getPostTitleLabel(post),
            publicationState,
            createdAt: toIsoDate(post.created_at),
            lifetimeViews: getPostViews(post),
            lifetimeComments: getPostCommentCount(post),
            lifetimeReactions: reactionsByPost.get(post.id) ?? 0,
            periodCommentsCreated: commentsByPost.get(post.id) ?? 0
        };
        })
        .sort((left, right) =>
            right.lifetimeViews - left.lifetimeViews ||
            right.lifetimeComments - left.lifetimeComments ||
            new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
        );
}

export async function getDashboardPostDetail(
    filters: DashboardEffectiveFilters,
    postId: string
): Promise<SelectedPostDetail> {
    const [posts, comments, reactions, title] = await Promise.all([
        getPostsBaseRows(),
        getCommentsInRange(filters),
        getAllReactions(),
        getPostTitle(postId)
    ]);

    const post = posts.find((entry) => String(entry.id) === postId);
    if (!post) {
        throw new Error("Post not found.");
    }

    const postReactions = reactions.filter((entry) => String(entry.post_id) === postId);
    const periodComments = comments.filter((entry) => String(entry.post_id) === postId).length;

    const postDebugLogs = title
        ? await getPostDebugLogsInRange(filters, title)
        : [];

    return {
        postId,
        title: getPostTitleLabel(post),
        cards: [
            {label: "Publication state", value: post.is_published ? "Published" : "Draft", kind: "text", hint: LIFETIME_HINT},
            {label: "Created", value: toIsoDate(post.created_at), kind: "text", hint: LIFETIME_HINT},
            {label: "Views", value: getPostViews(post), kind: "number", hint: LIFETIME_HINT},
            {label: "Comments", value: getPostCommentCount(post), kind: "number", hint: LIFETIME_HINT},
            {label: "Comments created", value: periodComments, kind: "number", hint: PERIOD_HINT},
            {label: "Debug logs", value: postDebugLogs.length, kind: "number", hint: PERIOD_HINT}
        ],
        activityPoints: [],
        reactionTotals: buildReactionTotals(postReactions)
    };
}

export async function getDashboardPostSeries(
    filters: DashboardEffectiveFilters,
    postId: string
): Promise<PostSeriesPoint[]> {
    const [comments, title] = await Promise.all([
        getCommentsInRange(filters),
        getPostTitle(postId)
    ]);

    const postComments = comments.filter((entry) => String(entry.post_id) === postId);
    const postDebugLogs = title
        ? await getPostDebugLogsInRange(filters, title)
        : [];

    const allDates = [
        ...postComments.map((row) => row.created_at),
        ...postDebugLogs.map((row) => row.created_at)
    ];

    const buckets = buildBuckets(filters.start, filters.end, allDates);
    if (buckets.length === 0) {
        return [];
    }

    const commentsByDay = countByDay(postComments);
    const debugLogsByDay = countByDay(postDebugLogs);

    return buckets.map((date) => ({
        date,
        comments: commentsByDay.get(date) ?? 0,
        debugLogs: debugLogsByDay.get(date) ?? 0
    }));
}

export async function getPostOptions(): Promise<DashboardPostOption[]> {
    const supabase = await getSupabase();
    const {data, error} = await supabase
        .schema("blog")
        .from("posts")
        .select(`
            id,
            post_contents(title)
        `)
        .order("created_at", {ascending: false});

    if (error) {
        throw error;
    }

    const rows = (data ?? []) as Array<{
        id: number;
        post_contents: {title: string} | Array<{title: string}> | null;
    }>;

    return rows.map((row) => ({
        id: String(row.id),
        title: readSingleRelation(row.post_contents)?.title ?? `Post #${row.id}`
    }));
}
