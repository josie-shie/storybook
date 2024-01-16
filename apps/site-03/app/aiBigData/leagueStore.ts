import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    loading: boolean;
}

interface LeagueState extends InitState {
    setLoading: (loading: boolean) => void;
}

let useLeagueStore: StoreWithSelectors<LeagueState>;

const initialState = (set: (updater: (state: LeagueState) => Partial<LeagueState>) => void) => ({
    loading: false,
    setLoading: (loading: boolean) => {
        set(state => {
            return {
                ...state,
                loading
            };
        });
    }
});

const creatLeagueStore = (init: InitState) =>
    (useLeagueStore = initStore<LeagueState>(initialState, init));

export { creatLeagueStore, useLeagueStore };
