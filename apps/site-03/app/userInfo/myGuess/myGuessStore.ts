import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type {
    GetMemberIndividualGuessMatchesResponse,
    GetMemberIndividualGuessResponse,
    GuessType,
    Pagination,
    MemberGuessViewingRecord
} from 'data-center';

export interface GuessRecordList {
    recordList: MemberGuessViewingRecord[];
    pagination: Pagination;
}
interface InitState {
    myGuess: {
        myPlans: GetMemberIndividualGuessMatchesResponse;
        recentPerformance: GetMemberIndividualGuessResponse;
        guessRecordList: GuessRecordList;
    };
}

interface MyGuessState extends InitState {
    setMyPlans: (myPlans: GetMemberIndividualGuessMatchesResponse) => void;
    setRecentPerformance: (recentPerformance: GetMemberIndividualGuessResponse) => void;
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
    setMyPlans: (myPlans: GetMemberIndividualGuessMatchesResponse) => {
        set(state => ({
            ...state,
            myGuess: { ...state.myGuess, myPlans }
        }));
    },
    setRecentPerformance: (recentPerformance: GetMemberIndividualGuessResponse) => {
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
