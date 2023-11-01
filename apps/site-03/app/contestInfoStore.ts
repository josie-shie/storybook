import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ContestInfoType } from 'data-center';

interface InitState {
    contestInfo: ContestInfoType;
}
interface ContestInfoContest extends InitState {
    setContestInfoContest: ({ contestInfo }: InitState) => void;
}

let useContestInfoStore: StoreWithSelectors<ContestInfoContest>;

const initialState = (set: (data: Partial<ContestInfoContest>) => void) => ({
    contestInfo: {},
    setContestInfoContest: ({ contestInfo }: InitState) => {
        set({ contestInfo });
    }
});

const creatContestInfoStore = (init: InitState) =>
    (useContestInfoStore = initStore<ContestInfoContest>(initialState, init));

export { creatContestInfoStore, useContestInfoStore };
