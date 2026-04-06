# Admin Dashboard Design

## Summary

Build a read-only admin dashboard that lets admins inspect site activity and content performance without changing the existing Supabase schema. The dashboard must support both site-wide totals and per-post analysis, include charts, and allow filtering by preset or custom date ranges.

## Goals

- Give admins one place to inspect high-level activity across the app.
- Show both lifetime totals and period-based activity without mixing their meanings.
- Provide per-post comparison and a selectable post drilldown in the same screen.
- Keep the implementation fully read-only and compatible with the current `blog` and `logging` schemas.

## Non-Goals

- No database schema changes, migrations, new RPC functions, or new database views.
- No write actions from the dashboard.
- No attempt to map `logging.visits` records to specific posts.
- No DB-focused automated test coverage for Supabase queries.

## Existing Constraints

### Access Control

- The app already protects admin-only routes using `ProtectedRoute` and the existing role policies.
- The dashboard should follow the same pattern and be available only to admins.

### Data Sources

- `blog.posts` contains post identity, publication state, author, and timestamps.
- `blog.post_contents` contains post titles needed for ranking and selectors.
- `blog.post_views` stores cumulative view counters per post.
- `blog.post_comment_counts` stores cumulative comment counters per post.
- `blog.comments` contains timestamped comment activity and can support period filtering.
- `blog.post_reactions` stores current reactions per post and reaction type, but the schema documentation does not show a creation timestamp.
- `logging.visits` stores timestamped site visit records and must remain dashboard-wide only.
- `logging.debug_logs` stores timestamped event records and may be used for site-wide activity and post-specific activity only when existing metadata already identifies a post.

### Metric Semantics

- Period-based metrics must come only from timestamped records.
- Lifetime metrics must remain visible even when they cannot be filtered by date.
- The UI must explicitly label period-based and lifetime metrics so admins do not misread cumulative counters as filtered results.

## Recommended Approach

Implement a client-side dashboard page backed by a dedicated frontend stats service layer that composes existing Supabase reads into dashboard-specific view models.

This approach fits the current React and React Query app structure, respects the schema freeze, and keeps the analytics-specific shaping out of the page components. It also avoids inventing backend objects just to simplify the query layer.

## Route and Page Structure

Add an admin-only route at `/admin/dashboard`.

The page should contain four sections:

1. Filter bar
   - Preset ranges: `7d`, `30d`, `90d`, `all time`
   - Custom start and end date inputs
   - Post selector for the drilldown panel

2. Overview cards
   - Period-based cards for activity in the selected range
   - Lifetime cards for cumulative blog metrics

3. Overview charts and ranked post list
   - Site-wide activity chart across the selected range
   - Ranked post table for comparison

4. Post drilldown
   - Detailed cards and charts for the selected post
   - Clear distinction between lifetime and period-based metrics

## Information Architecture

### Global Dashboard View

Show a compact summary of site activity:

- Visits in selected period from `logging.visits`
- Debug log volume in selected period from `logging.debug_logs`
- Posts created in selected period from `blog.posts.created_at`
- Comments created in selected period from `blog.comments.created_at`
- Lifetime published and draft post counts from `blog.posts`
- Lifetime total views from `blog.post_views`
- Lifetime total comments from `blog.post_comment_counts`
- Lifetime reaction totals by type from `blog.post_reactions`

### Per-Post View

Provide two complementary ways to inspect post performance:

- Ranked posts table for side-by-side comparison
- Single-post drilldown for deeper inspection

Per-post lifetime metrics:

- Title
- Publication state
- Created date
- Total views
- Total comments
- Reaction counts by type

Per-post period metrics, where the underlying records are timestamped:

- Comments created in selected period
- Debug log activity in selected period when the existing metadata identifies the post

Per-post traffic from `logging.visits` is intentionally unsupported.

## Data Layer Design

Create a dedicated admin dashboard service layer in the frontend.

Responsibilities:

- Build the dashboard filter state into query parameters.
- Fetch global summary data and post-level data through focused Supabase queries.
- Normalize raw query results into dashboard view models that components can render directly.
- Keep period-based aggregation logic out of presentational components.

The service layer should expose separate queries for:

- Global overview data
- Overview chart series
- Ranked posts data
- Single-post detail data
- Single-post chart series

This avoids one oversized query, improves loading behavior, and lets the UI degrade section by section when one query fails.

## Charts

The dashboard must include charts, but the chart set should stay small and defensible:

- Overview time-series chart for site-wide activity over the selected period
- Overview categorical chart for the top posts by lifetime views
- Post drilldown chart for post-specific period activity where timestamped data exists
- Post drilldown categorical chart for reaction breakdown

### Chart Contract

#### Overview Time-Series Chart

- One chart only
- X-axis: day buckets in the selected range
- Y-axis: counts
- Series:
  - visits per day from `logging.visits`
  - debug logs per day from `logging.debug_logs`
  - comments created per day from `blog.comments`
  - posts created per day from `blog.posts`

#### Overview Top Posts Chart

- One chart only
- Show the top 5 posts ranked by lifetime views from `blog.post_views.views`
- Label each bar with the post title from `blog.post_contents.title`
- Use lifetime values only, unaffected by period filters except for post-selection context in the rest of the page

#### Post Drilldown Activity Chart

- One chart only
- X-axis: day buckets in the selected range
- Y-axis: counts
- Series:
  - comments created per day for the selected post
  - debug log events per day for the selected post only when existing metadata can identify the post

#### Post Drilldown Reaction Chart

- One chart only
- Categorical breakdown by reaction type for the selected post
- Values come from lifetime reaction counts because reaction timestamps are not guaranteed by the documented schema

If the selected period has no data, render an explicit empty state instead of a misleading zero-filled chart.

## Filter Behavior

### Period Selector

- Preset buttons update the active range immediately.
- Custom start and end dates override presets once applied.
- `All time` disables date bucketing limits and returns full-range totals for period-capable metrics.
- Date boundaries are inclusive for both start and end dates.
- Use the user's local browser timezone for date inputs and day bucketing in charts.
- If only one custom boundary is provided, treat the missing boundary as open-ended.
- If the user enters an inverted range, disable apply behavior until the range is valid and show an inline validation message.

### Post Selection

- The ranked table and selector should both control the same selected post state.
- If no post is selected yet, default to the first ranked result when available.
- If the selected post is no longer available under the current filter context, clear or replace it gracefully.

### Ranked Post Table Contract

- Default ranking: lifetime views descending
- Secondary tie-breaker: lifetime comment count descending
- Final tie-breaker: post creation date descending
- Columns:
  - title
  - publication state
  - created date
  - lifetime views
  - lifetime comments
  - lifetime total reactions
  - period comments created
- The table remains lifetime-ranked even when the date filter changes. The period column is supplemental only.

## UX and Error Handling

- The dashboard is read-only, so there are no save states or mutation toasts.
- Each section should show its own loading and error state without blanking the whole page.
- Cards should label values as `Period` or `Lifetime`.
- Empty states should explain whether there is no data for the range or whether a query failed.

## Security

- Reuse the existing admin role protection already used for post management routes.
- Do not loosen any policy or data-access rules in the database.
- Only read from currently accessible tables and views.

## Verification Strategy

Do not add DB tests.

Verify through:

- TypeScript build
- ESLint
- Manual admin flow validation:
  - admin can open `/admin/dashboard`
  - non-admin users are blocked by existing route protection
  - preset and custom ranges update the right sections
  - ranked table and post selector stay in sync
  - charts render with data and with empty states
  - lifetime metrics remain stable when date filters change

## Risks and Mitigations

### Mixed Metric Semantics

Risk:
- Admins may assume every number is filtered by the selected range.

Mitigation:
- Label all cards and table columns clearly as period-based or lifetime.

### Missing Reaction Timestamps

Risk:
- Reactions cannot be shown as true period-based activity if the schema has no creation timestamp.

Mitigation:
- Keep reactions lifetime-only unless the real readable table includes a timestamp that is already present in the live schema.

### Weak Post Linkage in Debug Logs

Risk:
- Some debug logs may not contain enough metadata to attribute activity to a post.

Mitigation:
- Only use post-specific debug activity when the existing metadata already identifies the post. Otherwise, keep it in global activity only.
