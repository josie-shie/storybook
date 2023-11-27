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
}

interface InitState {
    rankList: Rank[];
}

interface RankState extends InitState {
    setRankList?: (rankList: Rank[]) => void;
}

let useRankStore: StoreWithSelectors<RankState>;

const initialState = (set: (data: Partial<RankState>) => void) => ({
    rankList: [],
    setRankList: (rankList: Rank[]) => {
        set({ rankList });
    }
});

const creatRankStore = (init: InitState) =>
    (useRankStore = initStore<RankState>(initialState, init));

export { creatRankStore, useRankStore };
