import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ContestGuessList, ContestGuessInfo } from 'data-center';

interface InitState {
    contestGuessList: ContestGuessList;
    contestGuessInfo: ContestGuessInfo;
}

interface ContestList extends InitState {
    setContestGuessList: ({ contestGuessList }: { contestGuessList: ContestGuessList }) => void;
    setContestGuessInfo: ({ contestGuessInfo }: { contestGuessInfo: ContestGuessInfo }) => void;
    setTotalNum: ({ matchId, totalNum }: { matchId: number; totalNum: number }) => void;
}

let isInit = true;
let useGuessContestListStore: StoreWithSelectors<ContestList>;

const initialState = (set: (updater: (state: ContestList) => Partial<ContestList>) => void) => ({
    contestGuessList: [],
    contestGuessInfo: {},
    setContestGuessList: ({ contestGuessList }: { contestGuessList: ContestGuessList }) => {
        set(() => ({ contestGuessList }));
    },
    setContestGuessInfo: ({ contestGuessInfo }: { contestGuessInfo: ContestGuessInfo }) => {
        set(() => ({ contestGuessInfo }));
    },
    setTotalNum: ({ matchId, totalNum }: { matchId: number; totalNum: number }) => {
        set(state => ({
            contestGuessInfo: {
                ...state.contestGuessInfo,
                [matchId]: { ...state.contestGuessInfo[matchId], totalNum }
            }
        }));
    }
});

const creatGuessContestListStore = (init: InitState) => {
    if (isInit) {
        const params = {
            contestGuessList: init.contestGuessList,
            contestGuessInfo: init.contestGuessInfo
        };

        useGuessContestListStore = initStore<ContestList>(initialState, params);
        isInit = false;
    }
};

export { creatGuessContestListStore, useGuessContestListStore };
