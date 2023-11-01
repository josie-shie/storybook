import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ContestInfoType, ContestListType } from 'data-center';

interface InitState {
    contestList: ContestListType;
    contestInfo: ContestInfoType;
}

interface ContestList extends InitState {
    setContestList: ({ contestList }: { contestList: ContestListType }) => void;
    reset: () => void;
}

let useContestListStore: StoreWithSelectors<ContestList>;

const initialState = (set: (data: Partial<ContestList>) => void): ContestList => ({
    contestList: [],
    contestInfo: {},
    setContestList: ({ contestList }) => {
        set({ contestList });
    },
    reset: () => {
        set({ contestList: [], contestInfo: {} });
    }
});

const creatContestListStore = (init: InitState) =>
    (useContestListStore = initStore<ContestList>(initialState, init));

export { creatContestListStore, useContestListStore };
