export function parseBoolean(str?: string) {
    return (/true/i).test(str ?? 'false');
}

export function serializeBoolean(bool?: boolean) {
    return bool ? 'true' : 'false';
}