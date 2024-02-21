import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetRecentMatchResponse } from 'data-center';

interface RecentMatchOptionType {
    homeOption: { homeAway: number; leagueId: number; dataCount: number };
    awayOption: { homeAway: number; leagueId: number; dataCount: number };
}

interface InitState {
    recentMatchData: GetRecentMatchResponse;
}

interface DataState extends InitState {
    recentMatchOption: RecentMatchOptionType;
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
    }
});

const createDataStore = (init: InitState) =>
    (useDataStore = initStore<DataState>(initialState, init));

export { createDataStore, useDataStore };
