import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetSingleMatchResponse, GetGuessProportionResponse } from 'data-center';

interface InitState {
    matchDetail: GetSingleMatchResponse;
}

interface ContestDetail extends InitState {
    layoutDisplayed: boolean;
    companyNameMap: Record<number, string>;
    guessProportion: GetGuessProportionResponse;
    setGuessProportion: (guessProportion: GetGuessProportionResponse) => void;
    setMatchDetailData: ({ matchDetail }: { matchDetail: GetSingleMatchResponse }) => void;
    setCoveredType: (layoutDisplayed: boolean) => void;
}

let useContestDetailStore: StoreWithSelectors<ContestDetail>;

const initialState = (set: (data: Partial<ContestDetail>) => void): ContestDetail => ({
    matchDetail: {} as GetSingleMatchResponse,
    guessProportion: {
        home: {
            peopleNum: 0,
            itemType: ''
        },
        away: {
            peopleNum: 0,
            itemType: ''
        },
        over: {
            peopleNum: 0,
            itemType: ''
        },
        under: {
            peopleNum: 0,
            itemType: ''
        },
        remainingGuessTimes: 0
    },
    layoutDisplayed: true,
    companyNameMap: {
        1: '澳*',
        3: 'Crow*',
        4: '立*',
        8: '36*',
        9: '威廉*',
        12: '易胜*',
        14: '韦*',
        17: '明*',
        19: 'Interwet*',
        22: '10*',
        23: '金宝*',
        24: '12*',
        31: '利*',
        35: '盈*',
        42: '18*',
        47: '平*',
        48: '香港马*',
        49: 'Bwi*'
    },
    setGuessProportion: (guessProportion: GetGuessProportionResponse) => {
        set({ guessProportion });
    },
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
