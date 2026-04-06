import type { DashboardDatePreset, DashboardDateString } from '../types/dashboard';

export interface DashboardDateRange {
    start: DashboardDateString | null;
    end: DashboardDateString | null;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function pad(value: number): string {
    return String(value).padStart(2, '0');
}

function isDateOnlyString(value: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function toLocalDate(value: Date | DashboardDateString): Date {
    if (value instanceof Date) {
        return new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }

    if (isDateOnlyString(value)) {
        const [year, month, day] = value.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    const date = new Date(value);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatLocalDate(value: Date): DashboardDateString {
    return [
        value.getFullYear(),
        pad(value.getMonth() + 1),
        pad(value.getDate())
    ].join('-');
}

export function normalizeInclusiveStart(value: string | Date | null | undefined): DashboardDateString | null {
    if (value == null || value === '') {
        return null;
    }

    return formatLocalDate(toLocalDate(value));
}

export function normalizeInclusiveEnd(value: string | Date | null | undefined): DashboardDateString | null {
    if (value == null || value === '') {
        return null;
    }

    return formatLocalDate(toLocalDate(value));
}

export function normalizeDateRange(range: DashboardDateRange): DashboardDateRange {
    const start = normalizeInclusiveStart(range.start);
    const end = normalizeInclusiveEnd(range.end);

    if (start && end && isInvertedDateRange({ start, end })) {
        return { start: end, end: start };
    }

    return { start, end };
}

export function isInvertedDateRange(range: DashboardDateRange): boolean {
    if (!range.start || !range.end) {
        return false;
    }

    return toLocalDate(range.start).getTime() > toLocalDate(range.end).getTime();
}

export function resolveDateRangePreset(
    preset: DashboardDatePreset,
    anchorDate: Date = new Date()
): DashboardDateRange {
    const today = toLocalDate(anchorDate);

    if (preset === 'all') {
        return { start: null, end: null };
    }

    const daysBack = preset === '7d' ? 6 : preset === '30d' ? 29 : 89;
    const start = new Date(today.getTime() - (daysBack * DAY_MS));

    return {
        start: formatLocalDate(start),
        end: formatLocalDate(today)
    };
}

export function toOpenEndedStartBoundary(value: DashboardDateString | null | undefined): Date | null {
    if (!value) {
        return null;
    }

    const date = toLocalDate(value);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

export function toOpenEndedEndBoundary(value: DashboardDateString | null | undefined): Date | null {
    if (!value) {
        return null;
    }

    const date = toLocalDate(value);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

export function getDailyBucketLabel(value: string | Date): DashboardDateString {
    return formatLocalDate(toLocalDate(value));
}
