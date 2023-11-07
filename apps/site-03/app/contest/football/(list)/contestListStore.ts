import { initStore, formatFilterMap } from 'lib';
import type { StoreWithSelectors, FilterMap } from 'lib';
import type { ContestInfoType, ContestListType } from 'data-center';

interface InitState {
    contestList: ContestListType;
    contestInfo: ContestInfoType;
}

interface ContestList extends InitState {
    filterInfo: { league: FilterMap; country: FilterMap };
    filterSelected: { league: FilterMap['infoObj']; country: FilterMap['infoObj'] };
    setContestList: ({ contestList }: { contestList: ContestListType }) => void;
    setFilterInit: ({ league, country }: { league: FilterMap; country: FilterMap }) => void;
    reset: () => void;
}

let isInit = true;
let useContestListStore: StoreWithSelectors<ContestList>;

const initialState = (set: (data: Partial<ContestList>) => void): ContestList => ({
    contestList: [],
    contestInfo: {},
    filterInfo: {
        league: {
            countMap: {},
            infoObj: {}
        },
        country: {
            countMap: {},
            infoObj: {}
        }
    },
    filterSelected: {
        league: {},
        country: {}
    },
    setContestList: ({ contestList }) => {
        set({ contestList });
    },
    setFilterInit: data => {
        set({ filterInfo: data });
    },
    reset: () => {
        set({ contestList: [], contestInfo: {} });
    }
});

const creatContestListStore = (init: InitState) => {
    if (isInit) {
        const league = formatFilterMap(init.contestInfo, 'leagueChsShort');
        const country = formatFilterMap(init.contestInfo, 'countryCn');
        const params = {
            contestList: init.contestList,
            contestInfo: init.contestInfo,
            filterInfo: {
                league,
                country
            }
        };
        useContestListStore = initStore<ContestList>(initialState, params);
        isInit = false;
    }
};

export { creatContestListStore, useContestListStore };
