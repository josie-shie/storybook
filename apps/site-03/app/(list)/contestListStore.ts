import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ContestInfoType, ContestListType } from 'data-center';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

const endOfToday = dayjs().endOf('day').toDate();

interface InitState {
    contestList: ContestListType;
    contestInfo: ContestInfoType;
    pinnedContest: number[];
}

interface ContestList extends InitState {
    setContestList: ({ contestList }: { contestList: ContestListType }) => void;
    setContestInfo: ({ contestInfo }: { contestInfo: ContestInfoType }) => void;
    reset: () => void;
    setPinnedContest: ({ matchId }: { matchId: number }) => void;
}

let isInit = true;
let useContestListStore: StoreWithSelectors<ContestList>;

const initialState = (set: (updater: (state: ContestList) => Partial<ContestList>) => void) => ({
    contestList: [],
    contestInfo: {},
    pinnedContest: [],
    setContestList: ({ contestList }: { contestList: ContestListType }) => {
        set(() => ({ contestList }));
    },
    setContestInfo: ({ contestInfo }: { contestInfo: ContestInfoType }) => {
        set(() => ({ contestInfo }));
    },
    reset: () => {
        set(() => ({ contestList: [], contestInfo: {} }));
    },
    setPinnedContest: ({ matchId }: { matchId: number }) => {
        set(state => {
            const newPinned = [...state.pinnedContest];
            const matchIndex = newPinned.indexOf(matchId);
            if (matchIndex > -1) {
                newPinned.splice(matchIndex, 1);
            } else {
                newPinned.push(matchId);
            }
            Cookies.set('pinnedContest', JSON.stringify(newPinned), {
                expires: endOfToday
            });
            return { pinnedContest: newPinned };
        });
    }
});

const createContestListStore = (init: InitState) => {
    if (isInit) {
        const params = {
            contestList: init.contestList,
            contestInfo: init.contestInfo,
            pinnedContest: init.pinnedContest
        };

        useContestListStore = initStore<ContestList>(initialState, params);
        isInit = false;
    }
};

export { createContestListStore, useContestListStore };
