import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface MasterRank {
    ranking: number;
    avatar?: string;
    name?: string;
    currentStreak?: number;
    highestStreak?: number;
}

interface InitState {
    masterRankList: MasterRank[];
}

interface MasterRankState extends InitState {
    setMasterRankList?: (masterRankList: MasterRank[]) => void;
}

let useMasterRankStore: StoreWithSelectors<MasterRankState>;

const initialState = (set: (data: Partial<MasterRankState>) => void) => ({
    masterRankList: [],
    setMasterRankList: (masterRankList: MasterRank[]) => {
        set({ masterRankList });
    }
});

const creatMasterRankStore = (init: InitState) =>
    (useMasterRankStore = initStore<MasterRankState>(initialState, init));

export { creatMasterRankStore, useMasterRankStore };
