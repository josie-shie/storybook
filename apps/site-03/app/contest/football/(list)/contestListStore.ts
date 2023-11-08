import { initStore, formatFilterMap } from 'lib';
import type { StoreWithSelectors, FilterMap } from 'lib';
import type { ContestInfoType, ContestListType } from 'data-center';

interface InitState {
    contestList: ContestListType;
    contestInfo: ContestInfoType;
}

interface ContestList extends InitState {
    filterInfo: { league: FilterMap; country: FilterMap };
    filterSelected: { league: Record<string, boolean>; country: Record<string, boolean> };
    setContestList: ({ contestList }: { contestList: ContestListType }) => void;
    setFilterInit: ({ league, country }: { league: FilterMap; country: FilterMap }) => void;
    setFilterSelected: (name: string, group: string) => void;
    reset: () => void;
}

let isInit = true;
let useContestListStore: StoreWithSelectors<ContestList>;

const initialState = (set: (updater: (state: ContestList) => Partial<ContestList>) => void) => ({
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
    setContestList: ({ contestList }: { contestList: ContestListType }) => {
        set(() => ({ contestList }));
    },
    setFilterInit: (filterInfo: { league: FilterMap; country: FilterMap }) => {
        set(() => ({ filterInfo }));
    },
    setFilterSelected: (name: string, group: string) => {
        set(state => {
            const groupState = state.filterSelected[group] as Record<string, boolean> | undefined;

            const newFilterSelected = {
                ...state.filterSelected,
                [group]: {
                    ...groupState,
                    [name]: !groupState?.[name]
                }
            };

            return { filterSelected: newFilterSelected };
        });
    },
    reset: () => {
        set(() => ({ contestList: [], contestInfo: {} }));
    }
});

const creatContestListStore = (init: InitState) => {
    if (isInit) {
        const league = formatFilterMap(init.contestInfo, 'leagueChsShort');
        const country = formatFilterMap(init.contestInfo, 'countryCn');

        const filterSelected = {
            league: {},
            country: {}
        };
        Object.values(league.infoObj).forEach((value: string[]) => {
            value.forEach(leagueName => {
                filterSelected.league[leagueName] = true;
            });
        });
        Object.values(country.infoObj).forEach((value: string[]) => {
            value.forEach(leagueName => {
                filterSelected.country[leagueName] = true;
            });
        });

        const params = {
            contestList: init.contestList,
            contestInfo: init.contestInfo,
            filterInfo: {
                league,
                country
            },
            filterSelected
        };
        useContestListStore = initStore<ContestList>(initialState, params);
        isInit = false;
    }
};

export { creatContestListStore, useContestListStore };
