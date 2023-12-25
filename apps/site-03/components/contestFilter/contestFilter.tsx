'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Tab, Tabs } from 'ui';
import type { ContestInfoType } from 'data-center';
import { formatFilterMap, type FilterMap } from 'lib';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import style from './contestFilter.module.scss';

type GroupType = 'league' | 'country';

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
    filterCounter
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
}) {
    const submit = () => {
        filterSubmit(group);
        onClose();
    };

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
            <div className={style.list}>{filterList}</div>
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

                <motion.div className={style.confirm} onClick={submit} whileTap={{ scale: 0.9 }}>
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
    initCountry
}: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    updateFilterList: (newList: FilterList) => void;
    initFilterSelected: { league: Record<string, boolean>; country: Record<string, boolean> };
    initFilterCounter: { league: number; country: number };
    initLeague: FilterMap;
    initCountry: FilterMap;
}) {
    const [onMounted, setOnMounted] = useState(false);
    const tabActive = useRef(0);

    const [filterSelected, setFilterSelected] = useState(initFilterSelected);
    const [filterCounter, setFilterCounter] = useState(initFilterCounter);

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
        setFilterSelected(initFilterSelected);
        setFilterCounter(initFilterCounter);
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
        setOnMounted(true);
    }, []);

    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };

    const saveTabStatus = (tab: string) => {
        tabActive.current = tab === 'contest' ? 0 : 1;
    };

    return (
        <>
            {onMounted ? (
                <BottomDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
                    <div className={style.filter}>
                        <h2>赛事筛选</h2>
                        <div className={style.tab}>
                            <Tabs
                                buttonRadius={tabStyle.buttonRadius}
                                defaultValue={tabActive.current}
                                gap={tabStyle.gap}
                                onTabChange={saveTabStatus}
                                position="center"
                                styling="underline"
                                swiperOpen={tabStyle.swiperOpen}
                            >
                                <Tab label="赛事" value="contest">
                                    <FilterSection
                                        filterCounter={filterCounter}
                                        filterInfo={filterInfo}
                                        filterPick={filterPick}
                                        filterSelected={filterSelected}
                                        filterSubmit={filterSubmit}
                                        group="league"
                                        onClose={onClose}
                                        revertFilter={revertFilter}
                                        selectAll={selectAll}
                                    />
                                </Tab>
                                <Tab label="国家" value="country">
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
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </BottomDrawer>
            ) : null}
        </>
    );
}

function ContestFilter({
    contestInfo,
    updateFilterList
}: {
    contestInfo: ContestInfoType;
    updateFilterList: (newList: FilterList) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(false);
    };
    const onOpen = () => {
        setIsOpen(true);
    };

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
        const league = formatFilterMap(contestInfoParams, 'leagueChsShort');
        const country = formatFilterMap(contestInfoParams, 'countryCn');
        const { filterSelected, filterCounter } = formatCounterAndSelected(league, country);

        return { filterSelected, filterCounter, league, country };
    };

    const { filterSelected, filterCounter, league, country } = initFilter(contestInfo);

    return (
        <>
            <div className={style.filterButton} onClick={onOpen}>
                赛事筛选
            </div>
            <Filter
                initCountry={country}
                initFilterCounter={filterCounter}
                initFilterSelected={filterSelected}
                initLeague={league}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                updateFilterList={updateFilterList}
            />
        </>
    );
}

export default ContestFilter;
