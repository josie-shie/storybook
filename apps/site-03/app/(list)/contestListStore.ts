import { initStore, getUTCDateTime } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ContestInfoType, ContestListType } from 'data-center';
import Cookies from 'js-cookie';

const expires = getUTCDateTime();

interface InitState {
    contestList: ContestListType;
    contestInfo: ContestInfoType;
    pinnedContest: number[];
}

interface ContestList extends InitState {
    scheduleContestList: ContestListType;
    scheduleContestInfo: ContestInfoType;
    resultContestList: ContestListType;
    resultContestInfo: ContestInfoType;
    setContestList: ({ contestList }: { contestList: ContestListType }) => void;
    setContestInfo: ({ contestInfo }: { contestInfo: ContestInfoType }) => void;
    setScheduleContestList: ({
        scheduleContestList
    }: {
        scheduleContestList: ContestListType;
    }) => void;
    setScheduleContestInfo: ({
        scheduleContestInfo
    }: {
        scheduleContestInfo: ContestInfoType;
    }) => void;
    setResultContestList: ({ resultContestList }: { resultContestList: ContestListType }) => void;
    setResultContestInfo: ({ resultContestInfo }: { resultContestInfo: ContestInfoType }) => void;
    reset: () => void;
    setPinnedContest: ({ matchId }: { matchId: number }) => void;
}

let isInit = true;
let useContestListStore: StoreWithSelectors<ContestList>;

const initialState = (set: (updater: (state: ContestList) => Partial<ContestList>) => void) => ({
    contestList: [],
    contestInfo: {},
    scheduleContestList: [],
    scheduleContestInfo: {},
    resultContestList: [],
    resultContestInfo: {},
    pinnedContest: [],
    setContestList: ({ contestList }: { contestList: ContestListType }) => {
        set(() => ({ contestList }));
    },
    setContestInfo: ({ contestInfo }: { contestInfo: ContestInfoType }) => {
        set(() => ({ contestInfo }));
    },
    setScheduleContestList: ({ scheduleContestList }: { scheduleContestList: ContestListType }) => {
        set(() => ({ scheduleContestList }));
    },
    setScheduleContestInfo: ({ scheduleContestInfo }: { scheduleContestInfo: ContestInfoType }) => {
        set(() => ({ scheduleContestInfo }));
    },
    setResultContestList: ({ resultContestList }: { resultContestList: ContestListType }) => {
        set(() => ({ resultContestList }));
    },
    setResultContestInfo: ({ resultContestInfo }: { resultContestInfo: ContestInfoType }) => {
        set(() => ({ resultContestInfo }));
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
                expires
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
            scheduleContestList: init.contestList,
            scheduleContestInfo: init.contestInfo,
            resultContestList: init.contestList,
            resultContestInfo: init.contestInfo,
            pinnedContest: init.pinnedContest
        };

        useContestListStore = initStore<ContestList>(initialState, params);
        isInit = false;
    }
};

export { createContestListStore, useContestListStore };
