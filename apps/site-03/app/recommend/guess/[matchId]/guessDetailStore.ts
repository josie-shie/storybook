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
    detail: DetailType;
    highWinRateTrend: GetProDistribResponse;
    masterPlanPrice: number;
    masterPlanList: ProGuess[];
}

interface GuessDetailState extends InitState {
    guessesLeft: number;
    setDetail: (detail: DetailType) => void;
    setGuessesLeft: (leftNumber: number) => void;
    setMasterPlanPrice: (price: number) => void;
    setMasterPlanList: (masterPlanList: ProGuess[]) => void;
    setHighWinRateTrend: (highWinRateTrend: GetProDistribResponse) => void;
}

let useGuessDetailStore: StoreWithSelectors<GuessDetailState>;

const initialState = (set: (data: Partial<GuessDetailState>) => void) => ({
    guessesLeft: 0,
    detail: {} as DetailType,
    highWinRateTrend: {} as GetProDistribResponse,
    masterPlanPrice: 0,
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
