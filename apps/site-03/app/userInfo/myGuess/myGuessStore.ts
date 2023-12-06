import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface PerformanceDetail {
    play: number;
    win: number;
    draw: number;
    lose: number;
}

export interface Performance {
    summary: PerformanceDetail;
    handicap: PerformanceDetail;
    size: PerformanceDetail;
}

export interface RecentPerformance {
    byWeek: Performance;
    byMonth: Performance;
    byQuarter: Performance;
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

interface InitState {
    myGuess: {
        rank: number;
        myPlans: MyPlans;
        recentPerformance: RecentPerformance;
    };
}

interface MyGuessState extends InitState {
    setMyPlans?: (myPlans: MyPlans) => void;
    setRecentPerformance?: (recentPerformance: RecentPerformance) => void;
}

let useMyGuessStore: StoreWithSelectors<MyGuessState>;

const initialState = (set: (updater: (state: MyGuessState) => Partial<MyGuessState>) => void) => ({
    myGuess: {
        rank: 0,
        recentPerformance: {
            byWeek: {
                summary: { play: 0, win: 0, draw: 0, lose: 0 },
                handicap: { play: 0, win: 0, draw: 0, lose: 0 },
                size: { play: 0, win: 0, draw: 0, lose: 0 }
            },
            byMonth: {
                summary: { play: 0, win: 0, draw: 0, lose: 0 },
                handicap: { play: 0, win: 0, draw: 0, lose: 0 },
                size: { play: 0, win: 0, draw: 0, lose: 0 }
            },
            byQuarter: {
                summary: { play: 0, win: 0, draw: 0, lose: 0 },
                handicap: { play: 0, win: 0, draw: 0, lose: 0 },
                size: { play: 0, win: 0, draw: 0, lose: 0 }
            }
        },
        myPlans: {
            totale: [],
            handicap: [],
            size: []
        }
    },
    setRank: (rank: number) => {
        set(state => ({
            ...state,
            myGuess: { ...state.myGuess, rank }
        }));
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
