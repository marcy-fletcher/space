import type {RoleKey} from "./roles.ts";

export const SubscriptionKeys = [
    'guest',
    'acolyte',
    'high-priest',
    'cult-leader',
    'deity',
    'goddess'
] as const;

export const Subscriptions: { key: SubscriptionKey, role: RoleKey, name: string, rank: number }[] = [
    {key: 'guest', role: 'guest', rank: 0, name: 'Guest'},
    {key: 'acolyte', role: 'acolyte', rank: 1, name: 'The Acolyte'},
    {key: 'high-priest', role: 'high-priest', rank: 2, name: 'The High Priest'},
    {key: 'cult-leader', role: 'cult-leader', rank: 3, name: 'The Cult Leader'},
    {key: 'deity', role: 'moderator', rank: 100, name: 'The Deity'},
    {key: 'goddess', role: 'admin', rank: 1000, name: 'The Goddess'},
]

export function getSubscriptionByRoleKey(role?: RoleKey) : {
    key: SubscriptionKey;
    role: RoleKey;
    name: string;
    rank: number
} | undefined {
    return Subscriptions.find(s => s.role === role);
}


export type SubscriptionKey = typeof SubscriptionKeys[number];

export interface SubscriptionTier {
    id: number;
    key: SubscriptionKey;
    name: string;
    roleKey: RoleKey;
    rank: number;
}

export type Subscription = SubscriptionTier & {
    userId: string;
    startDate: string;
    endDate: string;
}