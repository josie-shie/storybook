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
    showAnimate: string;
    showNotification: boolean;
    notificationMessage: string;
    setNotificationMessage: (notificationMessage: string) => void;
    setShowNotification: (showNotification: boolean) => void;
    setGuessProportion: (guessProportion: GetGuessProportionResponse) => void;
    setMatchDetailData: ({ matchDetail }: { matchDetail: GetSingleMatchResponse }) => void;
    setCoveredType: (layoutDisplayed: boolean) => void;
    setShowAnimate: (showAnimate: string) => void;
}

let useContestDetailStore: StoreWithSelectors<ContestDetail>;

const initialState = (set: (data: Partial<ContestDetail>) => void): ContestDetail => ({
    matchDetail: {} as GetSingleMatchResponse,
    showNotification: false,
    guessProportion: {
        handicap: 0,
        handicapInChinese: '-',
        overUnder: 0,
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
        guessNum: 0,
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
    showAnimate: '',
    notificationMessage: '',
    setNotificationMessage: (notificationMessage: string) => {
        set({ notificationMessage });
    },
    setShowNotification: (showNotification: boolean) => {
        set({ showNotification });
    },
    setGuessProportion: (guessProportion: GetGuessProportionResponse) => {
        set({ guessProportion });
    },
    setMatchDetailData: ({ matchDetail }: { matchDetail: GetSingleMatchResponse }) => {
        set({ matchDetail });
    },
    setCoveredType: (layoutDisplayed: boolean) => {
        set({ layoutDisplayed });
    },
    setShowAnimate: (showAnimate: string) => {
        set({ showAnimate });
    }
});

const createContestDetailStore = (init: InitState) =>
    (useContestDetailStore = initStore<ContestDetail>(initialState, init));

export { createContestDetailStore, useContestDetailStore };
