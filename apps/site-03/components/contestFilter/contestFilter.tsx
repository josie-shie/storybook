'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Slick } from 'ui';
import type { ContestInfoType, ContestInfo } from 'data-center';
import { formatFilterMap, type FilterMap } from 'lib';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import style from './contestFilter.module.scss';
import FilterIcon from './img/filter.svg';
import HotLeagueIcon from './img/hotLeague.svg';

type GroupType = 'league' | 'country';
type LeagueOptionType = 'all' | 'isBJSingle' | 'isCompFoot' | 'isTradFoot';

export interface FilterList {
    group: GroupType;
    selectedTable: Record<string, boolean>;
}

function FilterSection({
    group,
    onClose,
    filterPick,
    filterInfo,
    filterSelected,
    filterSubmit,
    selectAll,
    revertFilter,
    filterCounter,
    filterHotLeagueInfo,
    leagueOption,
    setLeagueOption
}: {
    group: 'league' | 'country';
    onClose: () => void;
    filterPick: (name: string, group: GroupType) => void;
    filterInfo: { league: FilterMap; country: FilterMap };
    filterSelected: { league: Record<string, boolean>; country: Record<string, boolean> };
    filterSubmit: (group: GroupType) => void;
    selectAll: (group: GroupType) => void;
    revertFilter: (group: GroupType) => void;
    filterCounter: { league: number; country: number };
    filterHotLeagueInfo?: ContestInfo[];
    leagueOption?: LeagueOptionType;
    setLeagueOption?: (leagueOption: LeagueOptionType) => void;
}) {
    const submit = () => {
        if (filterCounter[group] < 1) return;
        filterSubmit(group);
        onClose();
    };
    const optionList = [
        { label: '全部', value: 'all' },
        { label: '北单', value: 'isBJSingle' },
        { label: '竞足', value: 'isCompFoot' },
        { label: '传足', value: 'isTradFoot' }
    ];

    const filterList = Object.entries(filterInfo[group].infoObj)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => {
            return (
                <div key={key}>
                    <h3>{key}</h3>
                    <ul>
                        {value.map(item => (
                            <motion.li
                                className={`${style.item} ${
                                    filterSelected[group][item] ? style.selected : ''
                                }`}
                                key={item}
                                onClick={() => {
                                    filterPick(item, group);
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            );
        });

    return (
        <>
            <div className={style.list} style={{ height: group === 'league' ? '400px' : '444px' }}>
                {filterHotLeagueInfo ? (
                    <div>
                        <h3 className={style.hotLeague}>
                            <HotLeagueIcon />
                            热门
                        </h3>
                        <ul>
                            {filterHotLeagueInfo.map((hotLeague, idx) => (
                                <motion.li
                                    className={`${style.item} ${
                                        filterSelected[group][hotLeague.leagueChsShort]
                                            ? style.selected
                                            : ''
                                    }`}
                                    key={`${group}_${hotLeague.leagueId}_${idx.toString()}`}
                                    onClick={() => {
                                        filterPick(hotLeague.leagueChsShort, group);
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {hotLeague.leagueChsShort}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                ) : null}
                {filterList}
            </div>

            {group === 'league' && setLeagueOption ? (
                <div className={style.optionBar}>
                    {optionList.map((option, idx) => (
                        <div
                            className={`${style.option} ${
                                option.value === leagueOption && style.selected
                            }`}
                            key={`${option.value}_${idx.toString()}`}
                            onClick={() => {
                                setLeagueOption(option.value as LeagueOptionType);
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            ) : null}
            <div className={style.tool}>
                <div className={style.functionButton}>
                    <motion.button
                        className={style.button}
                        onClick={() => {
                            selectAll(group);
                        }}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                    >
                        全选
                    </motion.button>
                    <motion.button
                        className={style.button}
                        onClick={() => {
                            revertFilter(group);
                        }}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                    >
                        反选
                    </motion.button>
                </div>
                <div className={style.counter}>
                    已选 <span className={style.blue}>{filterCounter[group]}</span> 场
                </div>

                <motion.div
                    className={`${style.confirm} ${filterCounter[group] < 1 ? style.disabled : ''}`}
                    onClick={submit}
                    whileTap={{ scale: filterCounter[group] < 1 ? 1 : 0.9 }}
                >
                    确定
                </motion.div>
            </div>
        </>
    );
}

function Filter({
    isOpen,
    onOpen,
    onClose,
    updateFilterList,
    initFilterSelected,
    initFilterCounter,
    initLeague,
    initHotLeague,
    initCountry,
    leagueOption,
    setLeagueOption
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    updateFilterList: (newList: FilterList) => void;
    initFilterSelected: { league: Record<string, boolean>; country: Record<string, boolean> };
    initFilterCounter: { league: number; country: number };
    initHotLeague: ContestInfo[];
    initLeague: FilterMap;
    initCountry: FilterMap;
    leagueOption: LeagueOptionType;
    setLeagueOption: (leagueOption: LeagueOptionType) => void;
}) {
    const [onMounted, setOnMounted] = useState(false);
    const tabActive = useRef(0);

    const [filterSelected, setFilterSelected] = useState(initFilterSelected);
    const [filterCounter, setFilterCounter] = useState(initFilterCounter);

    const tabList = [
        {
            label: '赛事',
            status: 'contest'
        },
        {
            label: '国家',
            status: 'country'
        }
    ];

    const filterInfo = {
        league: initLeague,
        country: initCountry
    };
    const filterOriginalInfo = {
        league: initFilterSelected.league,
        country: initFilterSelected.country,
        counter: {
            league: initFilterCounter.league,
            country: initFilterCounter.country
        }
    };

    useEffect(() => {
        for (const item of Object.values(initLeague.infoObj)) {
            for (const key of item) {
                if (!Object.prototype.hasOwnProperty.call(filterSelected.league, key)) {
                    setFilterSelected(initFilterSelected);
                    setFilterCounter(initFilterCounter);
                    break;
                }
            }
        }
    }, [initFilterSelected, initFilterCounter]);

    const filterPick = (name: string, group: GroupType) => {
        const groupState = filterSelected[group] as Record<string, boolean> | undefined;

        const newFilterSelected = {
            ...filterSelected,
            [group]: {
                ...groupState,
                [name]: !groupState?.[name]
            }
        };

        let counter = 0;
        for (const [key, value] of Object.entries(newFilterSelected[group])) {
            counter += value ? filterInfo[group].countMap[key] : 0;
        }

        const newFilterCounter = {
            league: filterCounter.league,
            country: filterCounter.country
        };
        newFilterCounter[group] = counter;

        setFilterCounter(newFilterCounter);
        setFilterSelected(newFilterSelected);
    };
    const filterSubmit = (group: GroupType) => {
        const filterList = {
            group,
            selectedTable: filterSelected[group]
        };

        const newFilterSelected = {
            league: filterSelected.league,
            country: filterSelected.country
        };

        const newFilterCounter = {
            league: filterCounter.league,
            country: filterCounter.country
        };

        const theOtherOne = group === 'league' ? 'country' : 'league';
        newFilterSelected[theOtherOne] = filterOriginalInfo[theOtherOne];
        newFilterCounter[theOtherOne] = filterOriginalInfo.counter[theOtherOne];

        setFilterCounter(newFilterCounter);
        setFilterSelected(newFilterSelected);
        updateFilterList(filterList);
    };
    const revertFilter = (group: GroupType) => {
        let newFilterCounter = 0;
        const newFilterSelected = {};

        Object.entries(filterSelected[group]).forEach(([key, value]) => {
            if (!value) newFilterCounter += filterInfo[group].countMap[key];
            newFilterSelected[key] = !value;
        });

        setFilterSelected({ ...filterSelected, [group]: newFilterSelected });
        setFilterCounter({ ...filterCounter, [group]: newFilterCounter });
    };
    const selectAll = (group: GroupType) => {
        const newFilterCounter = {
            ...filterCounter,
            [group]: filterOriginalInfo.counter[group]
        };
        const newFilterSelected = {
            ...filterSelected,
            [group]: filterOriginalInfo[group]
        };

        setFilterCounter(newFilterCounter);
        setFilterSelected(newFilterSelected);
    };

    useEffect(() => {
        selectAll('league');
    }, [leagueOption]);

    useEffect(() => {
        setOnMounted(true);
    }, []);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onSlickEnd = (nowIndex: number) => {
        scrollTop();
        tabActive.current = nowIndex;
    };

    return (
        <>
            {onMounted ? (
                <BottomDrawer
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                    topLineDisplay="none"
                >
                    <div className={style.filter}>
                        <h2>赛事筛选</h2>
                        <div className={style.tab}>
                            <Slick
                                autoHeight
                                className={style.slick}
                                initialSlide={0}
                                onSlickEnd={onSlickEnd}
                                resetHeightKey="contestFilter"
                                styling="underline"
                                tabs={tabList}
                            >
                                <FilterSection
                                    filterCounter={filterCounter}
                                    filterHotLeagueInfo={initHotLeague}
                                    filterInfo={filterInfo}
                                    filterPick={filterPick}
                                    filterSelected={filterSelected}
                                    filterSubmit={filterSubmit}
                                    group="league"
                                    leagueOption={leagueOption}
                                    onClose={onClose}
                                    revertFilter={revertFilter}
                                    selectAll={selectAll}
                                    setLeagueOption={setLeagueOption}
                                />
                                <FilterSection
                                    filterCounter={filterCounter}
                                    filterInfo={filterInfo}
                                    filterPick={filterPick}
                                    filterSelected={filterSelected}
                                    filterSubmit={filterSubmit}
                                    group="country"
                                    onClose={onClose}
                                    revertFilter={revertFilter}
                                    selectAll={selectAll}
                                />
                            </Slick>
                        </div>
                    </div>
                </BottomDrawer>
            ) : null}
        </>
    );
}

function ContestFilter({
    contestInfo,
    updateFilterList,
    scheduleDate,
    resultsDate
}: {
    contestInfo: ContestInfoType;
    updateFilterList: (newList: FilterList) => void;
    scheduleDate: number;
    resultsDate: number;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [leagueOption, setLeagueOption] = useState<LeagueOptionType>('all');
    const onClose = () => {
        setIsOpen(false);
    };
    const onOpen = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        setLeagueOption('all');
    }, [scheduleDate, resultsDate]);

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

    const initFilter = (contestInfoParams: ContestInfoType) => {
        const selectedLeagueIds = new Set<number>();
        const hotLeagues: ContestInfo[] = [];

        const sortedContestsByLeagueLevel = Object.values(contestInfoParams).sort(
            (a, b) => a.leagueLevel - b.leagueLevel
        );

        for (const contest of sortedContestsByLeagueLevel) {
            if (hotLeagues.length >= 9) break;
            if (leagueOption !== 'all' && !contest[leagueOption]) continue;

            if (!selectedLeagueIds.has(contest.leagueId)) {
                selectedLeagueIds.add(contest.leagueId);
                hotLeagues.push(contest);
            }
        }

        const league = formatFilterMap(contestInfoParams, 'leagueChsShort', leagueOption);
        const country = formatFilterMap(contestInfoParams, 'countryCn');
        const { filterSelected, filterCounter } = formatCounterAndSelected(league, country);

        return { filterSelected, filterCounter, league, country, hotLeagues };
    };

    const { filterSelected, filterCounter, league, country, hotLeagues } = initFilter(contestInfo);

    return (
        <>
            <div className={`${style.filterButton} ui-filter-button`} onClick={onOpen}>
                <FilterIcon className={`${style.filterIcon} ui-filter-button-icon`} />
            </div>
            <Filter
                initCountry={country}
                initFilterCounter={filterCounter}
                initFilterSelected={filterSelected}
                initHotLeague={hotLeagues}
                initLeague={league}
                isOpen={isOpen}
                leagueOption={leagueOption}
                onClose={onClose}
                onOpen={onOpen}
                setLeagueOption={setLeagueOption}
                updateFilterList={updateFilterList}
            />
        </>
    );
}

export default ContestFilter;
