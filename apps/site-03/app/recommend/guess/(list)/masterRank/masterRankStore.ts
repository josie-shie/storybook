import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface MasterRank {
    id: number;
    ranking: number;
    avatar?: string;
    name?: string;
    currentStreak?: number;
    highestStreak?: number;
    isToday: boolean;
}

interface InitState {
    onlyShowToday: boolean;
    masterRankList: MasterRank[];
}

interface MasterRankState extends InitState {
    setMasterRankList?: (masterRankList: MasterRank[]) => void;
    setOnlyShowToday: (show: boolean) => void;
}

let useMasterRankStore: StoreWithSelectors<MasterRankState>;

const initialState = (set: (data: Partial<MasterRankState>) => void) => ({
    masterRankList: [],
    onlyShowToday: true,
    setMasterRankList: (masterRankList: MasterRank[]) => {
        set({ masterRankList });
    },
    setOnlyShowToday: (show: boolean) => {
        set({ onlyShowToday: show });
    }
});

const creatMasterRankStore = (init: InitState) =>
    (useMasterRankStore = initStore<MasterRankState>(initialState, init));

export { creatMasterRankStore, useMasterRankStore };
