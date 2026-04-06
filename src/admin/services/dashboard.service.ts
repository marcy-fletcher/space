import {getSupabase} from "../../utils/supabase.ts";
import type {
    DashboardQueryFilters,
    OverviewCard,
    OverviewChartPoint,
    PostSeriesPoint,
    RankedPostRow,
    ReactionTotal,
    SelectedPostDetail
} from "../types/dashboard.ts";
import {getDailyBucketLabel, toOpenEndedEndBoundary, toOpenEndedStartBoundary} from "../utils/dateRange.ts";

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
}>(query: TQuery, filters: DashboardQueryFilters, column: string): TQuery {
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

async function getPostBaseRow(postId: string): Promise<DashboardPostRowDto | null> {
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
        `)
        .eq("id", postId)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data ? data as unknown as DashboardPostRowDto : null;
}

async function countRowsInRange(
    schema: "blog" | "logging",
    table: string,
    column: string,
    filters: DashboardQueryFilters,
    configure?: (query: {
        eq: (column: string, value: unknown) => unknown;
        gte: (column: string, value: string) => unknown;
        lte: (column: string, value: string) => unknown;
    }) => unknown
): Promise<number> {
    const supabase = await getSupabase();
    let query: any = supabase
        .schema(schema)
        .from(table)
        .select("*", {count: "exact", head: true});

    if (configure) {
        query = configure(query);
    }

    query = applyDateRange(query, filters, column);

    const {count, error} = await query;

    if (error) {
        throw error;
    }

    return count ?? 0;
}

async function countRows(
    schema: "blog" | "logging",
    table: string,
    configure?: (query: {
        eq: (column: string, value: unknown) => unknown;
    }) => unknown
): Promise<number> {
    const supabase = await getSupabase();
    let query: any = supabase
        .schema(schema)
        .from(table)
        .select("*", {count: "exact", head: true});

    if (configure) {
        query = configure(query);
    }

    const {count, error} = await query;

    if (error) {
        throw error;
    }

    return count ?? 0;
}

async function getTotalViews(): Promise<number> {
    const supabase = await getSupabase();
    const {data, error} = await supabase
        .schema("blog")
        .from("post_views")
        .select("views");

    if (error) {
        throw error;
    }

    return sumValues(
        data ?? [],
        (row) => typeof row.views === "number" ? row.views : 0
    );
}

async function getTotalComments(): Promise<number> {
    const supabase = await getSupabase();
    const {data, error} = await supabase
        .schema("blog")
        .from("post_comment_counts")
        .select("comment_count");

    if (error) {
        throw error;
    }

    return sumValues(
        data ?? [],
        (row) => typeof row.comment_count === "number" ? row.comment_count : 0
    );
}

async function getCommentsInRange(filters: DashboardQueryFilters): Promise<DashboardCommentDto[]> {
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

async function getCommentsForPostInRange(filters: DashboardQueryFilters, postId: string): Promise<DashboardCommentDto[]> {
    const supabase = await getSupabase();
    let query = supabase
        .schema("blog")
        .from("comments")
        .select("post_id, created_at")
        .eq("is_deleted", false)
        .eq("post_id", postId);

    query = applyDateRange(query, filters, "created_at");

    const {data, error} = await query;

    if (error) {
        throw error;
    }

    return (data ?? []) as DashboardCommentDto[];
}

async function getGlobalDebugLogsInRange(filters: DashboardQueryFilters): Promise<DashboardDebugLogDto[]> {
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

async function getVisitsInRange(filters: DashboardQueryFilters): Promise<DashboardDebugLogDto[]> {
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

async function getPostsCreatedInRange(filters: DashboardQueryFilters): Promise<Array<{created_at: string}>> {
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

async function getReactionsForPost(postId: string): Promise<DashboardReactionDto[]> {
    const supabase = await getSupabase();
    const {data, error} = await supabase
        .schema("blog")
        .from("post_reactions")
        .select("post_id, reaction")
        .eq("post_id", postId);

    if (error) {
        throw error;
    }

    return (data ?? []) as DashboardReactionDto[];
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

function getEmptyPostDebugSeries(filters: DashboardQueryFilters, comments: DashboardCommentDto[]): PostSeriesPoint[] {
    const buckets = buildBuckets(filters.start, filters.end, comments.map((row) => row.created_at));

    if (buckets.length === 0) {
        return [];
    }

    const commentsByDay = countByDay(comments);

    return buckets.map((date) => ({
        date,
        comments: commentsByDay.get(date) ?? 0,
        debugLogs: 0
    }));
}

export async function getDashboardOverview(filters: DashboardQueryFilters): Promise<OverviewCard[]> {
    const [
        visitCount,
        debugLogCount,
        createdPostCount,
        commentCount,
        publishedCount,
        draftCount,
        totalViews,
        totalComments,
        reactionCount
    ] = await Promise.all([
        countRowsInRange("logging", "visits", "created_at", filters),
        countRowsInRange("logging", "debug_logs", "created_at", filters),
        countRowsInRange("blog", "posts", "created_at", filters),
        countRowsInRange("blog", "comments", "created_at", filters, (query) => query.eq("is_deleted", false)),
        countRows("blog", "posts", (query) => query.eq("is_published", true)),
        countRows("blog", "posts", (query) => query.eq("is_published", false)),
        getTotalViews(),
        getTotalComments(),
        countRows("blog", "post_reactions")
    ]);

    return [
        {label: "Visits", value: visitCount, kind: "number", hint: PERIOD_HINT},
        {label: "Debug logs", value: debugLogCount, kind: "number", hint: PERIOD_HINT},
        {label: "Posts created", value: createdPostCount, kind: "number", hint: PERIOD_HINT},
        {label: "Comments created", value: commentCount, kind: "number", hint: PERIOD_HINT},
        {label: "Published posts", value: publishedCount, kind: "number", hint: LIFETIME_HINT},
        {label: "Draft posts", value: draftCount, kind: "number", hint: LIFETIME_HINT},
        {label: "Total views", value: totalViews, kind: "number", hint: LIFETIME_HINT},
        {label: "Total comments", value: totalComments, kind: "number", hint: LIFETIME_HINT},
        {label: "Total reactions", value: reactionCount, kind: "number", hint: LIFETIME_HINT}
    ];
}

export async function getDashboardOverviewSeries(filters: DashboardQueryFilters): Promise<OverviewChartPoint[]> {
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

export async function getRankedPosts(filters: DashboardQueryFilters): Promise<RankedPostRow[]> {
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
    filters: DashboardQueryFilters,
    postId: string
): Promise<SelectedPostDetail> {
    const [post, comments, reactions] = await Promise.all([
        getPostBaseRow(postId),
        getCommentsForPostInRange(filters, postId),
        getReactionsForPost(postId)
    ]);

    if (!post) {
        throw new Error("Post not found.");
    }

    const periodComments = comments.length;

    return {
        postId,
        title: getPostTitleLabel(post),
        cards: [
            {label: "Publication state", value: post.is_published ? "Published" : "Draft", kind: "text", hint: LIFETIME_HINT},
            {label: "Created", value: toIsoDate(post.created_at), kind: "text", hint: LIFETIME_HINT},
            {label: "Views", value: getPostViews(post), kind: "number", hint: LIFETIME_HINT},
            {label: "Comments", value: getPostCommentCount(post), kind: "number", hint: LIFETIME_HINT},
            {label: "Comments created", value: periodComments, kind: "number", hint: PERIOD_HINT},
            {label: "Debug logs", value: 0, kind: "number", hint: PERIOD_HINT}
        ],
        reactionTotals: buildReactionTotals(reactions)
    };
}

export async function getDashboardPostSeries(
    filters: DashboardQueryFilters,
    postId: string
): Promise<PostSeriesPoint[]> {
    const comments = await getCommentsForPostInRange(filters, postId);
    return getEmptyPostDebugSeries(filters, comments);
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
