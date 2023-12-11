import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

// 競猜詳情 上半部預測
export interface DetailType {
    leagueName: string; // 賽事名稱
    dateTime: string; // 日期時間
    homeTeamLogo: string;
    homeTeamName: string;
    awayTeamLogo: string;
    awayTeamName: string;
    participants: number; // 參與競猜人數
    guessHomeAway: 'home' | 'away' | 'none'; // 猜 主客
    guessBigSmall: 'over' | 'under' | 'none'; // 猜 大小
    home: number; // 猜 主隊 人數
    away: number; // 猜 客隊 人數
    big: number; // 猜 大 人數
    small: number; // 猜 小 人數
}

// 高勝率玩家風向
interface HighWinRateTrend {
    unlockPrice: number; // 解鎖價格
    trendHome: number; // 猜 主隊 人數
    trendAway: number; // 猜 客隊 人數
    trendBig: number; // 猜 大 人數
    trendSmall: number; // 猜 小 人數
}

// 高手方案
interface MasterPlan {
    id: number; // 方案id
    avatar: string; // 頭像
    name: string; // 暱稱
    hotStreak: number; // 連紅次數
    ranking: number; // 月榜排名
    homeTeam: string; // 主隊名
    awayTeam: string; // 客隊名
    unlock: boolean; // 是否已解鎖
    unlockPrice: number; // 解鎖價格
    history: ('win' | 'lose' | 'draw')[]; // 歷史戰績
    guess: 'home' | 'away' | 'big' | 'small'; // 競猜方向
    result?: 'win' | 'lose' | 'draw'; // 競猜結果
    guessValue: number; // 讓分
}

interface InitState {
    guessesLeft: number; // 競猜剩餘次數
    unlockTrend: boolean; // 解鎖高勝率玩家風向
    detail: DetailType;
    highWinRateTrend: HighWinRateTrend;
    masterPlanList: MasterPlan[];
}

interface GuessDetailState extends InitState {
    setDetail: (detail: DetailType) => void;
    setGuessesLeft: (leftNumber: number) => void;
    setUnlockTrend: (isUnlocked: boolean) => void;
    setMasterPlanList: (masterPlanList: MasterPlan[]) => void;
}

let useGuessDetailStore: StoreWithSelectors<GuessDetailState>;

const initialState = (set: (data: Partial<GuessDetailState>) => void) => ({
    guessesLeft: 0,
    unlockTrend: false,
    detail: {} as DetailType,
    highWinRateTrend: {} as HighWinRateTrend,
    masterPlanList: [],
    setDetail: (detail: DetailType) => {
        set({ detail });
    },
    setGuessesLeft: (leftNumber: number) => {
        set({ guessesLeft: leftNumber });
    },
    setUnlockTrend: (isUnlocked: boolean) => {
        set({ unlockTrend: isUnlocked });
    },
    setMasterPlanList: (masterPlanList: MasterPlan[]) => {
        set({ masterPlanList });
    }
});

const creatGuessDetailStore = (init: InitState) =>
    (useGuessDetailStore = initStore<GuessDetailState>(initialState, init));

export { creatGuessDetailStore, useGuessDetailStore };
