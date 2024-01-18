import { initStore, formatArticleFilterMap } from 'lib';
import type { StoreWithSelectors, FilterMap } from 'lib';
import type { RecommendPost, GetLeagueOfPostListResponse } from 'data-center';

type GroupType = 'league' | 'country';
interface InitState {
    filterIsOpen: boolean;
}

interface ArticleState extends InitState {
    filterResultIsOpen: boolean;
    filterInfo: { league: FilterMap; country: FilterMap };
    filterOriginalInfo: {
        league: Record<string, boolean>;
        country: Record<string, boolean>;
    };
    filterSelected: { league: Record<string, boolean>; country: Record<string, boolean> };
    filterList: { group: GroupType; selectedId: number[] };
    filterContestList: Record<number, RecommendPost[]>;
    filterMatchList: number[];
    filterSelectedMatchList: RecommendPost[];
    setFilterIsOpen: ({ status }: { status: boolean }) => void;
    setFilterResultIsOpen: ({ status }: { status: boolean }) => void;
    setFilterInit: ({
        filterOriginList
    }: {
        filterOriginList: GetLeagueOfPostListResponse;
    }) => void;
    setFilterSelected: (name: string, group: GroupType) => void;
    setFilterList: (group: GroupType) => void;
    selectAll: (group: GroupType) => void;
    revertFilterList: (group: GroupType) => void;
    setFilterResult: ({
        filterContestList,
        filterMatchList
    }: {
        filterContestList: Record<number, RecommendPost[]>;
        filterMatchList: number[];
    }) => void;
    setSelectedMatchList: ({
        filterSelectedMatchList
    }: {
        filterSelectedMatchList: RecommendPost[];
    }) => void;
}

let useArticleStore: StoreWithSelectors<ArticleState>;

const formatCounterAndSelected = (league: FilterMap, country: FilterMap) => {
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
        value.forEach(countryName => {
            filterSelected.country[countryName] = true;
        });
    });

    return filterSelected;
};

const initialState = (set: (updater: (state: ArticleState) => Partial<ArticleState>) => void) => ({
    filterIsOpen: false,
    filterResultIsOpen: false,
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
    filterOriginalInfo: {
        league: {},
        country: {}
    },
    filterSelected: {
        league: {},
        country: {}
    },
    filterList: {
        group: 'league' as GroupType,
        selectedId: []
    },
    filterContestList: {},
    filterMatchList: [],
    filterSelectedMatchList: [],
    setFilterIsOpen: ({ status }: { status: boolean }) => {
        set(() => ({
            filterIsOpen: status
        }));
    },
    setFilterResultIsOpen: ({ status }: { status: boolean }) => {
        set(() => ({
            filterResultIsOpen: status
        }));
    },
    setFilterInit: ({ filterOriginList }: { filterOriginList: GetLeagueOfPostListResponse }) => {
        const filterInfo = formatArticleFilterMap(filterOriginList);
        const filterSelected = formatCounterAndSelected(filterInfo.league, filterInfo.country);

        set(() => ({
            filterInfo,
            filterSelected,
            filterOriginalInfo: {
                league: filterSelected.league,
                country: filterSelected.country
            }
        }));
    },
    setFilterSelected: (name: string, group: GroupType) => {
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
    setFilterList: (group: GroupType) => {
        set(state => {
            const selectedId = Object.keys(state.filterSelected[group])
                .filter(key => state.filterSelected[group][key])
                .map(key => state.filterInfo[group].countMap[key]);

            const filterList = {
                group,
                selectedId
            };

            const filterSelected = {
                league: state.filterSelected.league,
                country: state.filterSelected.country
            };

            const theOtherOne = group === 'league' ? 'country' : 'league';
            filterSelected[theOtherOne] = state.filterOriginalInfo[theOtherOne];

            return { filterList, filterSelected };
        });
    },
    selectAll: (group: GroupType) => {
        set(state => {
            const filterSelected = {
                ...state.filterSelected,
                [group]: state.filterOriginalInfo[group]
            };

            return {
                filterSelected
            };
        });
    },
    revertFilterList: (group: GroupType) => {
        set(state => {
            const filterSelected = {};

            Object.entries(state.filterSelected[group]).forEach(([key, value]) => {
                filterSelected[key] = !value;
            });

            return {
                filterSelected: { ...state.filterSelected, [group]: filterSelected }
            };
        });
    },
    setFilterResult: ({
        filterContestList,
        filterMatchList
    }: {
        filterContestList: Record<number, RecommendPost[]>;
        filterMatchList: number[];
    }) => {
        set(() => ({ filterContestList, filterMatchList }));
    },
    setSelectedMatchList: ({
        filterSelectedMatchList
    }: {
        filterSelectedMatchList: RecommendPost[];
    }) => {
        set(() => ({ filterSelectedMatchList }));
    }
});

const creatArticleStore = (init: InitState) =>
    (useArticleStore = initStore<ArticleState>(initialState, init));

export { creatArticleStore, useArticleStore };
