import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetProDistribResponse, ProGuess } from 'data-center';

// 競猜詳情 上半部預測
export interface DetailType {
    leagueName: string;
    dateTime: number;
    homeTeamLogo: string;
    homeTeamName: string;
    awayTeamLogo: string;
    awayTeamName: string;
    participants: number; // 參與競猜人數
    handicap: number;
    handicapInChinese: string;
    overUnder: number;
    guessHomeAway: 'home' | 'away' | 'none'; // 猜 主客
    guessBigSmall: 'over' | 'under' | 'none'; // 猜 大小
    home: number; // 猜 主隊 人數
    away: number; // 猜 客隊 人數
    big: number; // 猜 大 人數
    small: number; // 猜 小 人數
}

interface InitState {
    masterPlanList: ProGuess[];
}

interface GuessDetailState extends InitState {
    guessesLeft: number;
    detail: DetailType;
    highWinRateTrend: GetProDistribResponse;
    masterPlanPrice: number;
    setDetail: (detail: DetailType) => void;
    setGuessesLeft: (leftNumber: number) => void;
    setMasterPlanPrice: (price: number) => void;
    setMasterPlanList: (masterPlanList: ProGuess[]) => void;
    setHighWinRateTrend: (highWinRateTrend: GetProDistribResponse) => void;
}

let useGuessDetailStore: StoreWithSelectors<GuessDetailState>;

const initialState = (set: (data: Partial<GuessDetailState>) => void) => ({
    guessesLeft: 0,
    detail: {
        leagueName: '歐錦U20A',
        dateTime: 1678880400,
        homeTeamLogo: '',
        homeTeamName: '-',
        awayTeamLogo: '',
        awayTeamName: '-',
        participants: 200,
        handicap: 0,
        handicapInChinese: '平手',
        overUnder: 0,
        guessHomeAway: 'none',
        guessBigSmall: 'none',
        home: 721,
        away: 84,
        big: 996,
        small: 355
    } as DetailType,
    highWinRateTrend: {
        home: 50,
        away: 50,
        over: 50,
        under: 50,
        enoughProData: true,
        memberPermission: false,
        unlockPrice: 10
    },
    masterPlanPrice: 20,
    masterPlanList: [],
    setHighWinRateTrend: (highWinRateTrend: GetProDistribResponse) => {
        set({ highWinRateTrend });
    },
    setDetail: (detail: DetailType) => {
        set({ detail });
    },
    setGuessesLeft: (leftNumber: number) => {
        set({ guessesLeft: leftNumber });
    },
    setMasterPlanPrice: (price: number) => {
        set({ masterPlanPrice: price });
    },
    setMasterPlanList: (masterPlanList: ProGuess[]) => {
        set({ masterPlanList });
    }
});

const createGuessDetailStore = (init: InitState) =>
    (useGuessDetailStore = initStore<GuessDetailState>(initialState, init));

export { createGuessDetailStore, useGuessDetailStore };
