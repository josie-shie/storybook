import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface Master {
    id: number;
    avatar: string;
    name: string;
    hotStreak: number;
    ranking: number;
    followed: boolean;
    unlockNumber: number;
    fansNumber: number;
    description: string;
}

interface InitState {
    expertItem: Master[];
}

interface MasterState extends InitState {
    setExpertItem?: (masterItem: Master[]) => void;
}

let useMasterStore: StoreWithSelectors<MasterState>;

const initialState = (set: (data: Partial<MasterState>) => void) => ({
    expertItem: [],
    setExpertItem: (expertItem: Master[]) => {
        set({ expertItem });
    }
});

const creatMasterStore = (init: InitState) =>
    (useMasterStore = initStore<MasterState>(initialState, init));

export { creatMasterStore, useMasterStore };
