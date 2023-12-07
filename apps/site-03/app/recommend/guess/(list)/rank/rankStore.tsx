import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface Rank {
    ranking: number;
    avatar?: string;
    name?: string;
    record?: number;
    victory?: number;
    defeat?: number;
    winRate?: number;
    isToday: boolean;
}

interface InitState {
    onlyShowToday: boolean;
    rankList: Rank[];
}

interface RankState extends InitState {
    setRankList: (rankList: Rank[]) => void;
    setOnlyShowToday: (show: boolean) => void;
}

let useRankStore: StoreWithSelectors<RankState>;

const initialState = (set: (data: Partial<RankState>) => void) => ({
    rankList: [],
    onlyShowToday: true,
    setRankList: (rankList: Rank[]) => {
        set({ rankList });
    },
    setOnlyShowToday: (show: boolean) => {
        set({ onlyShowToday: show });
    }
});

const creatRankStore = (init: InitState) =>
    (useRankStore = initStore<RankState>(initialState, init));

export { creatRankStore, useRankStore };
