import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

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

export interface RecordItem {
    id: number;
    avatar: string;
    name: string;
    hotStreak: number;
    homeTeam: string;
    awayTeam: string;
    history: ('win' | 'lose' | 'draw')[];
    guess: 'home' | 'away' | 'big' | 'small';
    result: 'win' | 'lose' | 'draw';
    guessValue: number;
}

export interface Plan {
    id: number;
    matchId: number;
    matchTime: number;
    bettingType: 'draw' | 'size';
    leagueId: number;
    leagueName: string;
    homeTeamName: string;
    awayTeamName: string;
    handicapOdds: string;
    overUnderOdds: number;
    predictedPlay: 'over' | 'under' | 'home' | 'away';
    predictionResult: 'win' | 'lose' | 'draw' | 'none';
    isPaidToRead: string;
}

export interface MyPlans {
    totale: Plan[];
    handicap: Plan[];
    size: Plan[];
}

export interface RecordItem {
    id: number;
    avatar: string;
    name: string;
    hotStreak: number;
    homeTeam: string;
    awayTeam: string;
    history: ('win' | 'lose' | 'draw')[];
    guess: 'home' | 'away' | 'big' | 'small';
    result: 'win' | 'lose' | 'draw';
    guessValue: number;
}

interface InitState {
    myGuess: {
        rank: number;
        myPlans: MyPlans;
        recentPerformance: RecentPerformance;
        guessRecordList: RecordItem[];
    };
}

interface MyGuessState extends InitState {
    setMyPlans: (myPlans: MyPlans) => void;
    setRecentPerformance: (recentPerformance: RecentPerformance) => void;
    setGuessRecordList: (guessRecordList: RecordItem[]) => void;
}

let useMyGuessStore: StoreWithSelectors<MyGuessState>;

const initialState = (set: (updater: (state: MyGuessState) => Partial<MyGuessState>) => void) => ({
    myGuess: {
        rank: 0,
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
            totale: [],
            handicap: [],
            size: []
        },
        guessRecordList: []
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
    setGuessRecordList: (guessRecordList: RecordItem[]) => {
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
