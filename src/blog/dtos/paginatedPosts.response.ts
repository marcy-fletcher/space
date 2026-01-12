import type {PostSummary} from "../types/postSummary.ts";

export interface PaginatedPostsResponse {
    total: number;
    posts: PostSummary[];
}