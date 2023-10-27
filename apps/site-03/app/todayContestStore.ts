import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ContestListType, ContestInfoType } from 'data-center';

interface InitState {
    contestList: ContestListType;
    contestInfo: ContestInfoType;
}

let useTodayStore: StoreWithSelectors<InitState>;

const initialState = (set: (data: InitState) => void) => ({
    contestList: [],
    contestInfo: {},
    setTodayContest: ({ contestList, contestInfo }: InitState) => {
        set({ contestList, contestInfo });
    }
});

const creatTodayStore = (init: InitState) =>
    (useTodayStore = initStore<InitState>(initialState, init));

export { creatTodayStore, useTodayStore };
