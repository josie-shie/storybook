import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ContestListType, ContestInfoType } from 'data-center';

interface InitState {
    contestList: ContestListType;
    contestInfo: ContestInfoType;
}

let useHomeStore: StoreWithSelectors<InitState>;

const initialState = (set: (data: InitState) => void) => ({
    contestList: [],
    contestInfo: {},
    setTodayContest: ({ contestList, contestInfo }: InitState) => {
        set({ contestList, contestInfo });
    }
});

const creatHomeStore = (init: InitState) =>
    (useHomeStore = initStore<InitState>(initialState, init));

export { creatHomeStore, useHomeStore };
