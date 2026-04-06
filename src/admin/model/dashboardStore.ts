import type {StateCreator} from "zustand/vanilla";
import {create} from "zustand";
import {devtools} from "zustand/middleware";
import type {DashboardDatePreset, DashboardDateString, DashboardFilterPatch} from "../types/dashboard.ts";

export const defaultDashboardPreset: DashboardDatePreset = "30d";

export interface DashboardStoreState {
    preset: DashboardDatePreset;
    start: DashboardDateString | null;
    end: DashboardDateString | null;
    selectedPostId: string | null;
    initialized: boolean;
}

export interface DashboardStoreActions {
    setPreset: (preset: DashboardDatePreset) => void;
    setStart: (start: DashboardDateString | null) => void;
    setEnd: (end: DashboardDateString | null) => void;
    setSelectedPostId: (postId: string | null) => void;
    setFilters: (filters?: DashboardFilterPatch) => void;
    clearCustomRange: () => void;
    resetSelectedPost: () => void;
    resetFilters: () => void;
}

const initialState: DashboardStoreState = {
    preset: defaultDashboardPreset,
    start: null,
    end: null,
    selectedPostId: null,
    initialized: false
};

const dashboardStoreSlice: StateCreator<
    DashboardStoreState & DashboardStoreActions,
    [["zustand/devtools", never]]
> = (set, get) => ({
    ...initialState,
    setPreset: (preset) => {
        set({preset, initialized: true}, false, "setPreset");
    },
    setStart: (start) => {
        set({start, initialized: true}, false, "setStart");
    },
    setEnd: (end) => {
        set({end, initialized: true}, false, "setEnd");
    },
    setSelectedPostId: (selectedPostId) => {
        set({selectedPostId, initialized: true}, false, "setSelectedPostId");
    },
    setFilters: (filters) => {
        const state = get();

        if (!filters) {
            set({...state, initialized: true}, false, "setFilters");
            return;
        }

        set({
            preset: Object.prototype.hasOwnProperty.call(filters, "preset") ? filters.preset ?? state.preset : state.preset,
            start: Object.prototype.hasOwnProperty.call(filters, "start") ? filters.start ?? null : state.start,
            end: Object.prototype.hasOwnProperty.call(filters, "end") ? filters.end ?? null : state.end,
            selectedPostId: Object.prototype.hasOwnProperty.call(filters, "selectedPostId")
                ? filters.selectedPostId ?? null
                : state.selectedPostId,
            initialized: true
        }, false, "setFilters");
    },
    clearCustomRange: () => {
        set({start: null, end: null, initialized: true}, false, "clearCustomRange");
    },
    resetSelectedPost: () => {
        set({selectedPostId: null, initialized: true}, false, "resetSelectedPost");
    },
    resetFilters: () => {
        set(initialState, false, "resetFilters");
    }
});

export const useDashboardStore = create<DashboardStoreState & DashboardStoreActions>()(
    devtools(dashboardStoreSlice, {name: "dashboardStore"})
);

export const getDashboardState = () => useDashboardStore.getState();
