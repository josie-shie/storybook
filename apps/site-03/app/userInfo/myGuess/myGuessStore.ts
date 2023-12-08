import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { TagType } from 'data-center';

interface PerformanceDetail {
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
// 競猜玩法 ( 0: 全部, 1: 讓球, 2: 大小球 )
export type GuessType = 0 | 1 | 2;

export interface RecordItem {
    recordMemberId: number;
    avatarPath: string;
    memberName: string;
    homeTeamName: string;
    awayTeamName: string;
    latestPredictionResult: PredictionResultType[];
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
    guessType: GuessType;
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
            guessType: 0,
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

const creatMyGuessStoreStore = (init: InitState) =>
    (useMyGuessStore = initStore<MyGuessState>(set => {
        return {
            ...initialState(set),
            ...init
        };
    }));
export { creatMyGuessStoreStore, useMyGuessStore };
