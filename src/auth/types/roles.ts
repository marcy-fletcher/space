export const RoleKeys = [
    'guest',
    'admin',
    'moderator',
    'acolyte',
    'high-priest',
    'cult-leader'
] as const;

export const Roles = {
    GUEST: 'guest',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    ACOLYTE: 'acolyte',
    HIGH_PRIEST: 'high-priest',
    CULT_LEADER: 'cult-leader'
} as const;

export type RoleKey = typeof RoleKeys[number]

export interface UserIdentity {
    username?: string;
    pictureUrl?: string;
}