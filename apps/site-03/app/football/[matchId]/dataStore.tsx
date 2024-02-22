import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type {
    GetRecentMatchResponse,
    GetRecentMatchScheduleResponse,
    HalfFullWinCounts,
    HalfFullWinCountsTotal
} from 'data-center';

interface OptionType {
    homeAway: number;
    leagueId: number;
    dataCount: number;
}

interface RecentMatchOptionType {
    homeOption: OptionType;
    awayOption: OptionType;
}

interface InitState {
    recentMatchData: GetRecentMatchResponse;
    recentMatchSchedule: GetRecentMatchScheduleResponse;
    halfFullWinCounts: HalfFullWinCounts;
    halfFullWinTotal: HalfFullWinCountsTotal;
}

interface DataState extends InitState {
    recentMatchOption: RecentMatchOptionType;
    halfFullWinCountsOption: OptionType;
    setRecentMatchOption: ({
        team,
        target,
        newValue
    }: {
        team: 'homeOption' | 'awayOption';
        target: 'homeAway' | 'leagueId' | 'dataCount';
        newValue: number;
    }) => void;
    setRecentMatchData: ({
        target,
        matchData
    }: {
        target: 'home' | 'away';
        matchData: GetRecentMatchResponse;
    }) => void;
    setHalfFullWinCountsOption: ({
        target,
        newValue
    }: {
        target: 'homeAway' | 'leagueId' | 'dataCount';
        newValue: number;
    }) => void;
    setHalfFullWinCounts: ({ newValue }: { newValue: HalfFullWinCounts }) => void;
    setHalfFullWinTotal: ({ newValue }: { newValue: HalfFullWinCountsTotal }) => void;
}

let useDataStore: StoreWithSelectors<DataState>;

const initialState = (set: (updater: (state: DataState) => Partial<DataState>) => void) => ({
    recentMatchData: {
        homeMatch: [],
        awayMatch: [],
        dashboard: {
            home: {
                goalMissRate: {
                    goal: 0,
                    miss: 0
                },
                victoryMinusRate: {
                    victory: 0,
                    minus: 0,
                    tie: 0
                },
                winLoseRate: {
                    win: 0,
                    lose: 0,
                    go: 0
                },
                bigSmallRate: {
                    big: 0,
                    small: 0,
                    go: 0
                }
            },
            away: {
                goalMissRate: {
                    goal: 0,
                    miss: 0
                },
                victoryMinusRate: {
                    victory: 0,
                    minus: 0,
                    tie: 0
                },
                winLoseRate: {
                    win: 0,
                    lose: 0,
                    go: 0
                },
                bigSmallRate: {
                    big: 0,
                    small: 0,
                    go: 0
                }
            }
        }
    } as GetRecentMatchResponse,
    recentMatchOption: {
        homeOption: {
            homeAway: 0,
            leagueId: 0,
            dataCount: 10
        },
        awayOption: {
            homeAway: 0,
            leagueId: 0,
            dataCount: 10
        }
    },
    recentMatchSchedule: {
        home: [],
        away: []
    },
    halfFullWinCounts: {} as HalfFullWinCounts,
    halfFullWinTotal: {
        home: { homeField: 0, awayField: 0, allField: 0 },
        away: { homeField: 0, awayField: 0, allField: 0 }
    } as HalfFullWinCountsTotal,
    halfFullWinCountsOption: {
        homeAway: 0,
        leagueId: 0,
        dataCount: 10
    },
    setRecentMatchOption: ({
        team,
        target,
        newValue
    }: {
        team: 'homeOption' | 'awayOption';
        target: 'homeAway' | 'leagueId' | 'dataCount';
        newValue: number;
    }) => {
        set(state => {
            const newData = JSON.parse(
                JSON.stringify(state.recentMatchOption)
            ) as RecentMatchOptionType;
            newData[team][target] = newValue;

            return { ...state, recentMatchOption: newData };
        });
    },
    setRecentMatchData: ({
        target,
        matchData
    }: {
        target: 'home' | 'away';
        matchData: GetRecentMatchResponse;
    }) => {
        set(state => {
            const targetMatch = target === 'home' ? 'homeMatch' : 'awayMatch';
            const newData = JSON.parse(
                JSON.stringify(state.recentMatchData)
            ) as GetRecentMatchResponse;

            newData[targetMatch] = matchData[targetMatch];
            newData.dashboard[target] = matchData.dashboard[target];

            return { ...state, recentMatchData: newData };
        });
    },
    setHalfFullWinCountsOption: ({
        target,
        newValue
    }: {
        target: 'homeAway' | 'leagueId' | 'dataCount';
        newValue: number;
    }) => {
        set(state => {
            const newData = JSON.parse(JSON.stringify(state.halfFullWinCountsOption)) as OptionType;
            newData[target] = newValue;

            return { ...state, halfFullWinCountsOption: newData };
        });
    },
    setHalfFullWinCounts: ({ newValue }: { newValue: HalfFullWinCounts }) => {
        set(state => {
            return { ...state, halfFullWinCounts: newValue };
        });
    },
    setHalfFullWinTotal: ({ newValue }: { newValue: HalfFullWinCountsTotal }) => {
        set(state => {
            return { ...state, halfFullWinTotal: newValue };
        });
    }
});

const createDataStore = (init: InitState) =>
    (useDataStore = initStore<DataState>(initialState, init));

export { createDataStore, useDataStore };
