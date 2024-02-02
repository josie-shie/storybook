import { initStore, formatFilterMap } from 'lib';
import type { StoreWithSelectors, FilterMap } from 'lib';
import type { GetFootballLeague } from 'data-center';

type ContestInfoType = Record<number, GetFootballLeague>;

type GroupType = 'league' | 'country';
interface InitState {
    contestList: number[];
    contestInfo: ContestInfoType;
}

interface ContestList extends InitState {
    filterOriginalInfo: {
        league: Record<string, boolean>;
        country: Record<string, boolean>;
        counter: {
            league: number;
            country: number;
        };
    };
    filterInfo: { league: FilterMap; country: FilterMap; leagueIdMap: Record<string, number> };
    filterCounter: { league: number; country: number };
    filterSelected: { league: Record<string, boolean>; country: Record<string, boolean> };
    filterList: { group: GroupType; selectedTable: Record<string, boolean> };
    selectedleagueIdList: number[];
    setContestList: ({ contestList }: { contestList: GetFootballLeague[] }) => void;
    setContestInfo: ({ contestList }: { contestList: GetFootballLeague[] }) => void;
    setFilterInit: () => void;
    setFilterSelected: (name: string, group: GroupType) => void;
    setFilterList: (group: GroupType) => void;
    selectAll: (group: GroupType) => void;
    revertFilterList: (group: GroupType) => void;
    resetFilter: (group: GroupType) => void;
    reset: () => void;
    resetQuery: () => void;
}

let isInit = true;
let useMatchFilterStore: StoreWithSelectors<ContestList>;

const formatCounterAndSelected = () => {
    const filterSelected = {
        league: {},
        country: {}
    };
    const filterCounter = {
        league: 0,
        country: 0
    };

    return { filterSelected, filterCounter };
};

const formatLeagueIdMap = (contestInfo: ContestInfoType) => {
    const mapping = {};

    for (const leagueId in contestInfo) {
        const item = contestInfo[leagueId];
        mapping[item.leagueChsShort] = item.leagueId;
    }

    return mapping;
};

const initFilter = (contestInfo: ContestInfoType) => {
    const league = formatFilterMap(contestInfo, 'leagueChsShort');
    const country = formatFilterMap(contestInfo, 'countryCn');
    const leagueIdMap = formatLeagueIdMap(contestInfo);

    const { filterSelected, filterCounter } = formatCounterAndSelected();
    return { filterSelected, filterCounter, league, country, leagueIdMap };
};

const initialState = (set: (updater: (state: ContestList) => Partial<ContestList>) => void) => ({
    contestList: [],
    contestInfo: {},
    filterOriginalInfo: {
        league: {},
        country: {},
        counter: {
            league: 0,
            country: 0
        }
    },
    filterCounter: {
        league: 0,
        country: 0
    },
    filterInfo: {
        league: {
            countMap: {},
            infoObj: {}
        },
        country: {
            countMap: {},
            infoObj: {}
        },
        leagueIdMap: {}
    },
    filterSelected: {
        league: {},
        country: {}
    },
    filterList: {
        group: 'league' as GroupType,
        selectedTable: {}
    },
    selectedleagueIdList: [],
    setContestList: ({ contestList }: { contestList: GetFootballLeague[] }) => {
        set(state => {
            const newContestList: number[] = [];
            contestList.forEach((match: GetFootballLeague) => {
                newContestList.push(match.leagueId);
            });
            return {
                ...state,
                contestList: newContestList
            };
        });
    },
    setContestInfo: ({ contestList }: { contestList: GetFootballLeague[] }) => {
        set(state => {
            const newContestInfo: ContestInfoType = {};
            contestList.forEach((match: GetFootballLeague) => {
                newContestInfo[match.leagueId] = {
                    ...match
                };
            });
            return {
                ...state,
                contestInfo: newContestInfo
            };
        });
    },
    setFilterInit: () => {
        set(state => {
            const newInfo = {};
            for (const item of state.contestList) {
                newInfo[item] = state.contestInfo[item];
            }

            const { filterSelected, filterCounter, league, country, leagueIdMap } =
                initFilter(newInfo);

            const params = {
                filterInfo: {
                    league,
                    country,
                    leagueIdMap
                },
                filterSelected,
                filterCounter,
                filterOriginalInfo: {
                    league: filterSelected.league,
                    country: filterSelected.country,
                    counter: {
                        league: filterCounter.league,
                        country: filterCounter.country
                    }
                },
                filterList: {
                    group: 'league' as GroupType,
                    selectedTable: {}
                }
            };
            return {
                ...state,
                ...params
            };
        });
    },
    setFilterSelected: (name: string, group: GroupType) => {
        set(state => {
            const groupState = state.filterSelected[group] as Record<string, boolean> | undefined;
            const currentSelectedState = !groupState?.[name];

            const newFilterSelected = {
                ...state.filterSelected,
                [group]: {
                    ...groupState,
                    [name]: !groupState?.[name]
                }
            };

            let counter = 0;
            for (const [key, value] of Object.entries(newFilterSelected[group])) {
                counter += value ? state.filterInfo[group].countMap[key] : 0;
            }

            const filterCounter = {
                league: state.filterCounter.league,
                country: state.filterCounter.country
            };
            filterCounter[group] = counter;

            let newSelectedIds: number[];
            if (currentSelectedState) {
                newSelectedIds = [
                    ...state.selectedleagueIdList,
                    state.filterInfo.leagueIdMap[name]
                ];
            } else {
                newSelectedIds = state.selectedleagueIdList.filter(
                    id => id !== state.filterInfo.leagueIdMap[name]
                );
            }

            return {
                filterSelected: newFilterSelected,
                filterCounter,
                selectedleagueIdList: newSelectedIds
            };
        });
    },
    setFilterList: (group: GroupType) => {
        set(state => {
            const filterList = {
                group,
                selectedTable: state.filterSelected[group]
            };

            const filterSelected = {
                league: state.filterSelected.league,
                country: state.filterSelected.country
            };

            const filterCounter = {
                league: state.filterCounter.league,
                country: state.filterCounter.country
            };

            const theOtherOne = group === 'league' ? 'country' : 'league';
            filterSelected[theOtherOne] = state.filterOriginalInfo[theOtherOne];
            filterCounter[theOtherOne] = state.filterOriginalInfo.counter[theOtherOne];

            return { filterList, filterSelected, filterCounter };
        });
    },
    selectAll: (group: GroupType) => {
        set(state => {
            const filterCounter = {
                ...state.filterCounter,
                [group]: state.filterOriginalInfo.counter[group]
            };
            const filterSelected = {
                ...state.filterSelected,
                [group]: state.filterOriginalInfo[group]
            };

            return {
                filterCounter,
                filterSelected
            };
        });
    },
    revertFilterList: (group: GroupType) => {
        set(state => {
            let filterCounter = 0;
            const filterSelected = {};

            Object.entries(state.filterSelected[group]).forEach(([key, value]) => {
                if (!value) filterCounter += state.filterInfo[group].countMap[key];
                filterSelected[key] = !value;
            });

            return {
                filterSelected: { ...state.filterSelected, [group]: filterSelected },
                filterCounter: { ...state.filterCounter, [group]: filterCounter }
            };
        });
    },
    resetFilter: (group: GroupType) => {
        set(state => {
            const filterCounter = 0;
            const filterSelected = {};

            Object.entries(state.filterSelected[group]).forEach(([key]) => {
                filterSelected[key] = false;
            });

            return {
                filterSelected: { ...state.filterSelected, [group]: filterSelected },
                filterCounter: { ...state.filterCounter, [group]: filterCounter },
                selectedleagueIdList: []
            };
        });
    },
    reset: () => {
        set(() => ({ contestList: [], contestInfo: {} }));
    },
    resetQuery: () => {
        set(() => ({ selectedleagueIdList: [] }));
    }
});

const creatMatchFilterStore = (init: InitState) => {
    if (isInit) {
        const { filterSelected, filterCounter, league, country, leagueIdMap } = initFilter(
            init.contestInfo
        );

        const params = {
            contestList: init.contestList,
            contestInfo: init.contestInfo,
            filterInfo: {
                league,
                country,
                leagueIdMap
            },
            filterSelected,
            filterCounter,
            filterOriginalInfo: {
                league: filterSelected.league,
                country: filterSelected.country,
                counter: {
                    league: filterCounter.league,
                    country: filterCounter.country
                }
            }
        };

        useMatchFilterStore = initStore<ContestList>(initialState, params);
        isInit = false;
    }
};

export { creatMatchFilterStore, useMatchFilterStore };
