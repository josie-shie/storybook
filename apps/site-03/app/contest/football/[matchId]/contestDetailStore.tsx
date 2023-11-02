import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetSingleMatchResponse } from 'data-center';

interface InitState {
    matchDetail: GetSingleMatchResponse;
}

interface ContestDetail extends InitState {
    layoutDisplayed: boolean;
    setMatchDetailData: ({ matchDetail }: { matchDetail: GetSingleMatchResponse }) => void;
    setCoveredType: (layoutDisplayed: boolean) => void;
}

let useContestDetailStore: StoreWithSelectors<ContestDetail>;

const initialState = (set: (data: Partial<ContestDetail>) => void): ContestDetail => ({
    matchDetail: {} as GetSingleMatchResponse,
    layoutDisplayed: true,
    setMatchDetailData: ({ matchDetail }: { matchDetail: GetSingleMatchResponse }) => {
        set({ matchDetail });
    },
    setCoveredType: (layoutDisplayed: boolean) => {
        set({ layoutDisplayed });
    }
});

const createContestDetailStore = (init: InitState) =>
    (useContestDetailStore = initStore<ContestDetail>(initialState, init));

export { createContestDetailStore, useContestDetailStore };
