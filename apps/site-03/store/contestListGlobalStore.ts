import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ContestInfoType, ContestListType } from 'data-center';

interface ContestList {
    contestList: ContestListType;
    contestInfo: ContestInfoType;
}

interface ContestListGlobal extends ContestList {
    setContestList: ({ contestList }: { contestList: ContestListType }) => void;
    setContestInfo: ({ contestInfo }: { contestInfo: ContestInfoType }) => void;
}

let isInit = true;
let useContestListGlobalStore: StoreWithSelectors<ContestListGlobal>;

const initialState = (
    set: (updater: (state: ContestListGlobal) => Partial<ContestListGlobal>) => void
) => ({
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

        useContestListGlobalStore = initStore<ContestListGlobal>(initialState, params);
        isInit = false;
    }
};

export { createContestListGlobalStore, useContestListGlobalStore };
