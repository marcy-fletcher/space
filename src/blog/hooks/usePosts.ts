import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedPosts } from "../services/posts.service";
import type { PaginatedPostsResponse } from "../dtos/paginatedPosts.response";
import { useSearchStore } from "../model/searchStore";
import { useUrlStorage } from "../../common/hooks/useUrlStorage";
import { queryClient } from "../../main";
import {useAuth} from "../../auth/hooks/useAuth.ts";

export const usePosts = () => {
    const { user } = useAuth();
    const { params, setParams, resetParams, initialized } = useSearchStore();

    useUrlStorage(params, setParams, initialized);

    const query = useQuery<PaginatedPostsResponse, Error>({
        queryKey: ["posts", params, user?.id],
        queryFn: () => getPaginatedPosts(),
        staleTime: 1000 * 60 * 5,
        retry: 2,
        enabled: initialized
    });

    useEffect(() => {
        if (query.isError) {
            queryClient.setQueryData<PaginatedPostsResponse>(
                ["posts", params],
                {
                    posts: [],
                    total: 0,
                }
            );
        }
    }, [query.isError, params]);

    useEffect(() => {
        return () => {
            resetParams();
        }
    }, []);

    return {
        ...query,
        posts: query.data?.posts ?? [],
        total: query.data?.total ?? 0,
        params,
        resetParams
    };
};
