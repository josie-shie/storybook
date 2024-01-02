import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { TagType } from 'data-center';

export interface PerformanceDetail {
    play: number;
    win: number;
    draw: number;
    lose: number;
}

export interface Performance {
    rank: number;
    summary: PerformanceDetail;
    handicap: PerformanceDetail;
    size: PerformanceDetail;
}

export interface RecentPerformance {
    byWeek: Performance;
    byMonth: Performance;
    byQuarter: Performance;
}

interface Pagination {
    pageCount: number;
    totalCount: number;
}

type PredictionResultType = 'WIN' | 'LOSE' | 'DRAW' | 'NONE';
type PredictedPlayType = 'OVER' | 'UNDER' | 'HOME' | 'AWAY' | 'LOCK' | 'HANDICAP' | 'OVERUNDER';
// 競猜玩法 ( 0: 全部, 1: 讓球, 2: 大小球 -1: 沒資料 )
export type ApiGuessType = -1 | 0 | 1 | 2;
export type GuessType = 0 | 1 | 2;

export interface RecordItem {
    recordMemberId: number;
    avatarPath: string;
    memberName: string;
    homeTeamName: string;
    awayTeamName: string;
    latestPredictionResult: { predictionResults: PredictionResultType[] };
    predictedPlay: PredictedPlayType;
    predictionResult: PredictionResultType;
    matchId: number;
    matchTime: number;
    leagueId: number;
    leagueName: string;
    handicapOdds: number;
    overUnderOdds: number;
    viewingTime: number;
    highlights: TagType;
}

export interface Plan {
    id: number;
    matchId: number;
    matchTime: number;
    leagueId: number;
    leagueName: string;
    homeTeamName: string;
    awayTeamName: string;
    playType: string;
    handicapOdds: number;
    overUnderOdds: number;
    handicapInChinese: string;
    predictedPlay: PredictedPlayType;
    predictionResult: PredictionResultType;
    isPaidToRead: boolean;
}

export interface MyPlans {
    guessType: ApiGuessType;
    guessMatchList: Plan[];
    pagination: Pagination;
}
export interface GuessRecordList {
    recordList: RecordItem[];
    pagination: Pagination;
}

interface InitState {
    myGuess: {
        myPlans: MyPlans;
        recentPerformance: RecentPerformance;
        guessRecordList: GuessRecordList;
    };
}

interface MyGuessState extends InitState {
    setMyPlans: (myPlans: MyPlans) => void;
    setRecentPerformance: (recentPerformance: RecentPerformance) => void;
    setGuessRecordList: (guessRecordList: GuessRecordList) => void;
}

let useMyGuessStore: StoreWithSelectors<MyGuessState>;

const initialState = (set: (updater: (state: MyGuessState) => Partial<MyGuessState>) => void) => ({
    myGuess: {
        recentPerformance: {
            byWeek: {
                rank: 0,
                summary: { play: 0, win: 0, draw: 0, lose: 0 },
                handicap: { play: 0, win: 0, draw: 0, lose: 0 },
                size: { play: 0, win: 0, draw: 0, lose: 0 }
            },
            byMonth: {
                rank: 0,
                summary: { play: 0, win: 0, draw: 0, lose: 0 },
                handicap: { play: 0, win: 0, draw: 0, lose: 0 },
                size: { play: 0, win: 0, draw: 0, lose: 0 }
            },
            byQuarter: {
                rank: 0,
                summary: { play: 0, win: 0, draw: 0, lose: 0 },
                handicap: { play: 0, win: 0, draw: 0, lose: 0 },
                size: { play: 0, win: 0, draw: 0, lose: 0 }
            }
        },
        myPlans: {
            guessType: 0 as GuessType,
            guessMatchList: [],
            pagination: {
                pageCount: 0,
                totalCount: 0
            }
        },
        guessRecordList: {
            recordList: [],
            pagination: {
                pageCount: 0,
                totalCount: 0
            }
        }
    },
    setMyPlans: (myPlans: MyPlans) => {
        set(state => ({
            ...state,
            myGuess: { ...state.myGuess, myPlans }
        }));
    },
    setRecentPerformance: (recentPerformance: RecentPerformance) => {
        set(state => ({
            ...state,
            myGuess: { ...state.myGuess, recentPerformance }
        }));
    },
    setGuessRecordList: (guessRecordList: GuessRecordList) => {
        set(state => ({
            ...state,
            myGuess: { ...state.myGuess, guessRecordList }
        }));
    }
});

let isInit = true;
const creatMyGuessStore = () => {
    if (isInit) {
        useMyGuessStore = initStore<MyGuessState>(initialState);
        isInit = false;
    }
};

export { creatMyGuessStore, useMyGuessStore };
