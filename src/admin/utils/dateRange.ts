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

function toLocalDate(value: Date | DashboardDateString): Date | null {
    if (value instanceof Date) {
        if (Number.isNaN(value.getTime())) {
            return null;
        }

        return new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }

    if (isDateOnlyString(value)) {
        const [year, month, day] = value.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) {
            return null;
        }

        return date;
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatLocalDate(value: Date): DashboardDateString {
    return [
        value.getFullYear(),
        pad(value.getMonth() + 1),
        pad(value.getDate())
    ].join('-');
}

function toDateString(value: Date | DashboardDateString | null | undefined): DashboardDateString | null {
    if (value == null || value === '') {
        return null;
    }

    const date = toLocalDate(value);
    if (!date) {
        return null;
    }

    return formatLocalDate(date);
}

export function normalizeInclusiveStart(value: string | Date | null | undefined): DashboardDateString | null {
    return toDateString(value);
}

export function normalizeInclusiveEnd(value: string | Date | null | undefined): DashboardDateString | null {
    return toDateString(value);
}

export function normalizeDateRange(range: DashboardDateRange): DashboardDateRange {
    return {
        start: normalizeInclusiveStart(range.start),
        end: normalizeInclusiveEnd(range.end)
    };
}

export function isInvertedDateRange(range: DashboardDateRange): boolean {
    if (!range.start || !range.end) {
        return false;
    }

    const start = toLocalDate(range.start);
    const end = toLocalDate(range.end);

    if (!start || !end) {
        return false;
    }

    return start.getTime() > end.getTime();
}

export function resolveDateRangePreset(
    preset: DashboardDatePreset,
    anchorDate: Date = new Date()
): DashboardDateRange {
    const today = toLocalDate(anchorDate) ?? new Date();

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
    const date = toLocalDate(value ?? '');
    if (!date) {
        return null;
    }

    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

export function toOpenEndedEndBoundary(value: DashboardDateString | null | undefined): Date | null {
    const date = toLocalDate(value ?? '');
    if (!date) {
        return null;
    }

    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

export function getDailyBucketLabel(value: string | Date): DashboardDateString | null {
    const date = toLocalDate(value);
    if (!date) {
        return null;
    }

    return formatLocalDate(date);
}
