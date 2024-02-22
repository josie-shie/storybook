import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetBattleMatchCompareResponse, GetRecentMatchCompareResponse } from 'data-center';

interface OptionType {
    homeAway: number;
    leagueId: number;
    dataCount: number;
}

interface InitState {
    battleMatchCompare: GetBattleMatchCompareResponse;
    recentMatchCompare: GetRecentMatchCompareResponse;
}

interface DataState extends InitState {
    battleMatchCompareOption: OptionType;
    recentMatchOption: OptionType;
    setBattleMatchCompareOption: ({
        target,
        newValue
    }: {
        target: 'homeAway' | 'leagueId' | 'dataCount';
        newValue: number;
    }) => void;
    setBattleMatchCompare: ({
        battleMatchCompare
    }: {
        battleMatchCompare: GetBattleMatchCompareResponse;
    }) => void;
    setRecentMatchOption: ({
        target,
        newValue
    }: {
        target: 'homeAway' | 'leagueId' | 'dataCount';
        newValue: number;
    }) => void;
    setRecentMatchCompare: ({
        recentMatchCompare
    }: {
        recentMatchCompare: GetRecentMatchCompareResponse;
    }) => void;
}

let useDataComparedStore: StoreWithSelectors<DataState>;

const initialState = (set: (updater: (state: DataState) => Partial<DataState>) => void) => ({
    battleMatchCompare: {} as GetBattleMatchCompareResponse,
    battleMatchCompareOption: {
        homeAway: 0,
        leagueId: 0,
        dataCount: 10
    },
    recentMatchCompare: {} as GetRecentMatchCompareResponse,
    recentMatchOption: {
        homeAway: 0,
        leagueId: 0,
        dataCount: 10
    },
    setBattleMatchCompareOption: ({
        target,
        newValue
    }: {
        target: 'homeAway' | 'leagueId' | 'dataCount';
        newValue: number;
    }) => {
        set(state => {
            const newData = JSON.parse(
                JSON.stringify(state.battleMatchCompareOption)
            ) as OptionType;
            newData[target] = newValue;

            return { ...state, battleMatchCompareOption: newData };
        });
    },
    setBattleMatchCompare: ({
        battleMatchCompare
    }: {
        battleMatchCompare: GetBattleMatchCompareResponse;
    }) => {
        set(state => {
            return { ...state, battleMatchCompare };
        });
    },
    setRecentMatchOption: ({
        target,
        newValue
    }: {
        target: 'homeAway' | 'leagueId' | 'dataCount';
        newValue: number;
    }) => {
        set(state => {
            const newData = JSON.parse(JSON.stringify(state.recentMatchOption)) as OptionType;
            newData[target] = newValue;

            return { ...state, recentMatchOption: newData };
        });
    },
    setRecentMatchCompare: ({
        recentMatchCompare
    }: {
        recentMatchCompare: GetRecentMatchCompareResponse;
    }) => {
        set(state => {
            return { ...state, recentMatchCompare };
        });
    }
});

const createDataComparedStore = (init: InitState) =>
    (useDataComparedStore = initStore<DataState>(initialState, init));

export { createDataComparedStore, useDataComparedStore };
