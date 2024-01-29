import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetProDistribResponse, ProGuess } from 'data-center';
import defaultTeamLogo from '@/app/football/[matchId]/img/defaultTeamLogo.png';

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
        leagueName: '',
        dateTime: 1672502400,
        homeTeamLogo: defaultTeamLogo.src,
        homeTeamName: '-',
        awayTeamLogo: defaultTeamLogo.src,
        awayTeamName: '-',
        participants: 0,
        handicap: 0,
        handicapInChinese: '-',
        overUnder: 0,
        guessHomeAway: 'none',
        guessBigSmall: 'none',
        home: 0,
        away: 0,
        big: 0,
        small: 0
    } as DetailType,
    highWinRateTrend: {
        home: 0,
        away: 0,
        over: 0,
        under: 0,
        enoughProData: true,
        memberPermission: false,
        unlockPrice: 0,
        proMemberNum: 0
    },
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
