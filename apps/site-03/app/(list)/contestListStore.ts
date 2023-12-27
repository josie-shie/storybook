import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ContestInfoType, ContestListType } from 'data-center';

interface InitState {
    contestList: ContestListType;
    contestInfo: ContestInfoType;
}

interface ContestList extends InitState {
    setContestList: ({ contestList }: { contestList: ContestListType }) => void;
    setContestInfo: ({ contestInfo }: { contestInfo: ContestInfoType }) => void;
    reset: () => void;
}

let isInit = true;
let useContestListStore: StoreWithSelectors<ContestList>;

const initialState = (set: (updater: (state: ContestList) => Partial<ContestList>) => void) => ({
    contestList: [],
    contestInfo: {},
    setContestList: ({ contestList }: { contestList: ContestListType }) => {
        set(() => ({ contestList }));
    },
    setContestInfo: ({ contestInfo }: { contestInfo: ContestInfoType }) => {
        set(() => ({ contestInfo }));
    },
    reset: () => {
        set(() => ({ contestList: [], contestInfo: {} }));
    }
});

const creatContestListStore = (init: InitState) => {
    if (isInit) {
        const params = {
            contestList: init.contestList,
            contestInfo: init.contestInfo
        };

        useContestListStore = initStore<ContestList>(initialState, params);
        isInit = false;
    }
};

export { creatContestListStore, useContestListStore };
