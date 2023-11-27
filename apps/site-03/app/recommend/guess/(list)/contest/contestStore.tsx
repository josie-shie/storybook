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
}

let isInit = true;
let useGuessContestListStore: StoreWithSelectors<ContestList>;

const initialState = (set: (updater: (state: ContestList) => Partial<ContestList>) => void) => ({
    contestList: [],
    contestInfo: {},
    setContestList: ({ contestList }: { contestList: ContestListType }) => {
        set(() => ({ contestList }));
    },
    setContestInfo: ({ contestInfo }: { contestInfo: ContestInfoType }) => {
        set(() => ({ contestInfo }));
    }
});

const creatGuessContestListStore = (init: InitState) => {
    if (isInit) {
        const params = {
            contestList: init.contestList,
            contestInfo: init.contestInfo
        };

        useGuessContestListStore = initStore<ContestList>(initialState, params);
        isInit = false;
    }
};

export { creatGuessContestListStore, useGuessContestListStore };
