import type {StateCreator} from "zustand/vanilla";
import {create} from "zustand";
import {devtools} from "zustand/middleware";
import type {Order, SortBy} from "../types/postSummary.ts";

export const defaultPage = 1;
export const defaultLimit = 9;

export type PostsSearchParams = {
    page?: string;
    limit?: string;
    order?: Order;
    sortBy?: SortBy;
    hideUnavailable?: string;
    term?: string;
}

type SearchState = {
    params: PostsSearchParams;
    initialized: boolean;
}

type SearchActions = {
    setParams: (params?: PostsSearchParams) => void;
    resetParams: () => void;
}

const searchSlice: StateCreator<
    SearchState & SearchActions,
    [
        ["zustand/devtools", never],
        //["zustand/persist", unknown]
    ]
> = (set, get, store) => ({
    params: {
        term: undefined,
        order: undefined,
        limit: undefined,
        sortBy: undefined,
        page: undefined,
        hideUnavailable: undefined,
    },
    initialized: false,
    setParams: (newParams?: PostsSearchParams) => {
        const {params} = get();
        set({params: {...params, ...newParams}, initialized:true}, false, "setParams");
    },
    resetParams: () => {
        set(store.getInitialState, true, "resetParams");
    }
})

export const useSearchStore = create<SearchActions & SearchState>()(
    devtools(searchSlice, {name: "searchStore"})
);

export const getSearchState = () => useSearchStore.getState();