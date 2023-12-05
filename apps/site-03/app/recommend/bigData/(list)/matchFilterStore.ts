import { initStore, formatFilterMap } from 'lib';
import type { StoreWithSelectors, FilterMap } from 'lib';
// import type { ContestInfoType, ContestListType } from 'data-center';

type ContestInfoType = Record<number, Contest>;
type OddsResultType = '赢' | '输' | '大' | '小';

interface Contest {
    startTime: number;
    matchId: number;
    countryCn: string;
    leagueId: number;
    leagueChsShort: string;
    homeChs: string;
    awayChs: string;
    homeScore?: number;
    awayScore?: number;
    homeHalfScore?: number;
    awayHalfScore?: number;
    isFamous: boolean;
    leagueLevel: number;
}

interface HandicapTipType {
    startTime: number;
    matchId: number;
    countryCn: string;
    leagueId: number;
    leagueChsShort: string;
    homeId: number;
    homeChs: string;
    awayId: number;
    awayChs: string;
    teamId: number;
    teamChs: string; // 哪一隊連
    oddsResult: OddsResultType; // 輸、贏、大、小
    longOddsTimes: number; // n場
    isFamous: boolean; // 是否熱門賽事
    leagueLevel: number;
}

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
    filterInfo: { league: FilterMap; country: FilterMap };
    filterCounter: { league: number; country: number };
    filterSelected: { league: Record<string, boolean>; country: Record<string, boolean> };
    filterList: { group: GroupType; selectedTable: Record<string, boolean> };
    setContestList: ({ contestList }: { contestList: Contest[] | HandicapTipType[] }) => void;
    setContestInfo: ({ contestList }: { contestList: Contest[] | HandicapTipType[] }) => void;
    setFilterInit: () => void;
    setFilterSelected: (name: string, group: GroupType) => void;
    setFilterList: (group: GroupType) => void;
    selectAll: (group: GroupType) => void;
    revertFilterList: (group: GroupType) => void;
    reset: () => void;
}

let isInit = true;
let useMatchFilterStore: StoreWithSelectors<ContestList>;

const formatCounterAndSelected = (league: FilterMap, country: FilterMap) => {
    const filterSelected = {
        league: {},
        country: {}
    };
    const filterCounter = {
        league: 0,
        country: 0
    };

    Object.values(league.infoObj).forEach((value: string[]) => {
        value.forEach(leagueName => {
            filterSelected.league[leagueName] = true;
            filterCounter.league += league.countMap[leagueName] || 0;
        });
    });
    Object.values(country.infoObj).forEach((value: string[]) => {
        value.forEach(countryName => {
            filterSelected.country[countryName] = true;
            filterCounter.country += country.countMap[countryName] || 0;
        });
    });

    return { filterSelected, filterCounter };
};

const initFilter = (contestInfo: ContestInfoType) => {
    const league = formatFilterMap(contestInfo, 'leagueChsShort');
    const country = formatFilterMap(contestInfo, 'countryCn');
    const { filterSelected, filterCounter } = formatCounterAndSelected(league, country);
    return { filterSelected, filterCounter, league, country };
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
        }
    },
    filterSelected: {
        league: {},
        country: {}
    },
    filterList: {
        group: 'league' as GroupType,
        selectedTable: {}
    },
    setContestList: ({ contestList }: { contestList: Contest[] | HandicapTipType[] }) => {
        set(state => {
            const newContestList: number[] = [];
            contestList.forEach((match: Contest | HandicapTipType) => {
                newContestList.push(match.matchId);
            });
            return {
                ...state,
                contestList: newContestList
            };
        });
    },
    setContestInfo: ({ contestList }: { contestList: Contest[] | HandicapTipType[] }) => {
        set(state => {
            const newContestInfo: ContestInfoType = {};
            contestList.forEach((match: Contest | HandicapTipType) => {
                newContestInfo[match.matchId] = {
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

            const { filterSelected, filterCounter, league, country } = initFilter(newInfo);

            const params = {
                filterInfo: {
                    league,
                    country
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

            return { filterSelected: newFilterSelected, filterCounter };
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
    reset: () => {
        set(() => ({ contestList: [], contestInfo: {} }));
    }
});

const creatMatchFilterStore = (init: InitState) => {
    if (isInit) {
        const { filterSelected, filterCounter, league, country } = initFilter(init.contestInfo);

        const params = {
            contestList: init.contestList,
            contestInfo: init.contestInfo,
            filterInfo: {
                league,
                country
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
