import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface Contest {
    matchId?: string;
    sport?: string;
    time?: string;
    homeTeam?: string;
    awayTeam?: string;
    member?: number;
    plan?: boolean;
    odds?: number;
    score?: string;
    status?: number;
}

interface InitState {
    contestList: Contest[];
}

interface ContestState extends InitState {
    setContestList?: (contestList: Contest[]) => void;
}

let useContestStore: StoreWithSelectors<ContestState>;

const initialState = (set: (data: Partial<ContestState>) => void) => ({
    contestList: [],
    setContestList: (contestList: Contest[]) => {
        set({ contestList });
    }
});

const creatContestStore = (init: InitState) =>
    (useContestStore = initStore<ContestState>(initialState, init));

export { creatContestStore, useContestStore };
