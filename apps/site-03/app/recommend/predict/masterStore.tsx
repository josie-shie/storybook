import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface Master {
    id: number;
    name: string;
    hotStreak: number;
    ranking: number;
    followed: boolean;
    unlockNumber: number;
    fansNumber: number;
    description: string;
}

interface InitState {
    masterItem: Master[];
}

interface MasterState extends InitState {
    setMasterList?: (masterItem: Master[]) => void;
}

let useMasterStore: StoreWithSelectors<MasterState>;

const initialState = (set: (data: Partial<MasterState>) => void) => ({
    masterItem: [],
    setMasterList: (masterItem: Master[]) => {
        set({ masterItem });
    }
});

const creatMasterStore = (init: InitState) =>
    (useMasterStore = initStore<MasterState>(initialState, init));

export { creatMasterStore, useMasterStore };
