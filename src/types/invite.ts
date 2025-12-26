export interface Invite {
    key: string; // GUID key of an invite, to share with the one who will use it as invite key
    ownerId: string; // Id of user who created invite (should not be displayed on page, as user can only see their own keys)
    userId?: string; // Id of the user who used invite code
    userName?: string; // Name of the user who used invite code
    expiresAt: string; // Expiration timestamp with timezone of the invite key (usually 3 days from createdAt time)
    usedAt?: string; // Used timestamp
    createdAt: string; // Created at timestamp with timezone
}