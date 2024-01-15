import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ContestInfoType, ContestListType } from 'data-center';

interface ContestList {
    contestList: ContestListType;
    contestInfo: ContestInfoType;
}

let isInit = true;
let useContestListGlobalStore: StoreWithSelectors<ContestList>;

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

const createContestListGlobalStore = (init: ContestList) => {
    if (isInit) {
        const params = {
            contestList: init.contestList,
            contestInfo: init.contestInfo
        };

        useContestListGlobalStore = initStore<ContestList>(initialState, params);
        isInit = false;
    }
};

export { createContestListGlobalStore, useContestListGlobalStore };
