'use client';
import { timestampToStringWeek, timestampToString } from 'lib';
import type { ReactElement, Ref } from 'react';
import { getContestList } from 'data-center';
import type { ContestListType, ContestInfoType, GetContestListResponse } from 'data-center';
import { useEffect, useState, forwardRef } from 'react';
import { InfiniteScroll, slickOption } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import { useLiveContestStore } from '@/store/liveContestStore';
import type { FilterList } from '@/components/contestFilter/contestFilter';
import NoData from '@/components/baseNoData/noData';
import GameCard from './components/gameCard';
import style from './football.module.scss';
import { createContestListStore, useContestListStore } from './contestListStore';
import BaseDatePicker from './components/baseDatePicker/baseDatePicker';
import SettingIcon from './img/setting.svg';
import Setting from './components/setting';
import FootballFilter from './components/footballFilter';
import BaseBanner from './components/baseBanner';

type Status = 'all' | 'progress' | 'schedule' | 'result';

function DatePicker({
    status,
    scheduleDate,
    resultsDate,
    handleDate
}: {
    status: Status;
    scheduleDate: number;
    resultsDate: number;
    handleDate: (date: Date) => void;
}) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {(status === 'schedule' || status === 'result') && (
                <div className={style.dateHolder}>
                    {status === 'schedule' && isMounted ? (
                        <BaseDatePicker
                            defaultDate={new Date(Number(scheduleDate))}
                            direction="schedule"
                            onDateChange={date => {
                                handleDate(date);
                            }}
                        />
                    ) : null}
                    {status === 'result' && isMounted ? (
                        <BaseDatePicker
                            defaultDate={new Date(Number(resultsDate))}
                            direction="result"
                            onDateChange={date => {
                                handleDate(date);
                            }}
                        />
                    ) : null}
                </div>
            )}
        </>
    );
}

function ContestList({
    switchSetting,
    status = 'all',
    scheduleDate,
    resultsDate,
    isLoading,
    closeLoading
}: {
    switchSetting: () => void;
    status: Status;
    scheduleDate: number;
    resultsDate: number;
    isLoading: boolean;
    closeLoading: () => void;
}) {
    const [secondRender, setSecondRender] = useState(false);
    const [rows, setRows] = useState({ full: 10, notYet: 0, finish: 0 });
    const contestList = useContestListStore.use.contestList();
    const contestInfo = useContestListStore.use.contestInfo();
    const scheduleContestList = useContestListStore.use.scheduleContestList();
    const scheduleContestInfo = useContestListStore.use.scheduleContestInfo();
    const resultContestList = useContestListStore.use.resultContestList();
    const resultContestInfo = useContestListStore.use.resultContestInfo();
    const globalStore = useLiveContestStore.use.contestInfo();
    const setContestList = useContestListStore.use.setContestList();
    const setContestInfo = useContestListStore.use.setContestInfo();
    const setScheduleContestList = useContestListStore.use.setScheduleContestList();
    const setScheduleContestInfo = useContestListStore.use.setScheduleContestInfo();
    const setResultContestList = useContestListStore.use.setResultContestList();
    const setResultContestInfo = useContestListStore.use.setResultContestInfo();
    const pinnedContest = useContestListStore.use.pinnedContest();
    const [filterList, setFilterList] = useState<FilterList>({
        group: 'league',
        selectedTable: {}
    });
    const [isMounted, setIsMounted] = useState(false);
    const [isStreamline, setIsStreamline] = useState(true);
    let changeDayLine: string | null = null;
    let matchFinishLine = true;

    const updateFilterList = (newList: FilterList) => {
        setFilterList(newList);
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const resetRows = () => {
        setRows({ full: 20, notYet: 0, finish: 0 });
    };

    useEffect(() => {
        setSecondRender(true);
    }, []);

    useEffect(() => {
        if (typeof slickOption.contestListResetHeight !== 'undefined') {
            slickOption.contestListResetHeight();
        }
    }, [rows]);

    useEffect(() => {
        const dateString = (status === 'result' ? resultsDate : scheduleDate) || Date.now();
        const fetchContestData = async (timestamp: number) => {
            if (!secondRender) return;
            try {
                const contestData = await getContestList(timestamp);
                if (!contestData.success) {
                    return new Error();
                }
                if (status === 'result') {
                    setResultContestList({ resultContestList: contestData.data.contestList });
                    setResultContestInfo({ resultContestInfo: contestData.data.contestInfo });
                } else if (status === 'schedule') {
                    setScheduleContestList({ scheduleContestList: contestData.data.contestList });
                    setScheduleContestInfo({ scheduleContestInfo: contestData.data.contestInfo });
                } else {
                    setContestList({ contestList: contestData.data.contestList });
                    setContestInfo({ contestInfo: contestData.data.contestInfo });
                }

                updateFilterList({ group: 'league', selectedTable: {} });
                resetRows();
                closeLoading();
            } catch (error) {
                closeLoading();
                return new Error();
            }
        };
        void fetchContestData(Math.floor(Number(dateString) / 1000));
    }, [resultsDate, scheduleDate, setContestList, setContestInfo]);

    const statusTable: Record<string, (state: number) => boolean> = {
        all: state => state >= -1 && state <= 5,
        progress: state => state >= 1 && state <= 5,
        notyet: state => state === 0, // 未開賽
        schedule: state => state === 0,
        result: state => state === -1
    };

    const filterByStatus = (list: number[], statusFunc: (state: number) => boolean) => {
        const filterGroup = filterList.group === 'league' ? 'leagueChsShort' : 'countryCn';

        let targetContestInfo: ContestInfoType;
        if (status === 'result') {
            targetContestInfo = resultContestInfo;
        } else if (status === 'schedule') {
            targetContestInfo = scheduleContestInfo;
        } else {
            targetContestInfo = contestInfo;
        }

        const resultStateValue = -1;

        return list
            .filter(item => {
                if (
                    Object.keys(filterList.selectedTable).length > 0 &&
                    !filterList.selectedTable[targetContestInfo[item][filterGroup]]
                ) {
                    return false;
                }

                if (
                    isStreamline &&
                    targetContestInfo[item].hasHandicapOdd &&
                    targetContestInfo[item].hasOverUnderOdd
                ) {
                    return false;
                }

                const state =
                    Object.hasOwnProperty.call(globalStore, item) &&
                    globalStore[item].state !== undefined
                        ? globalStore[item].state
                        : targetContestInfo[item].state;
                return typeof state === 'number' && statusFunc(state);
            })
            .sort((a, b) => {
                const stateA =
                    Object.hasOwnProperty.call(globalStore, a) && globalStore[a].state !== undefined
                        ? globalStore[a].state
                        : targetContestInfo[a].state;
                const stateB =
                    Object.hasOwnProperty.call(globalStore, b) && globalStore[b].state !== undefined
                        ? globalStore[b].state
                        : targetContestInfo[b].state;

                if (stateA === resultStateValue && stateB === resultStateValue) {
                    const timestampA = targetContestInfo[a].matchTime;
                    const timestampB = targetContestInfo[b].matchTime;
                    return timestampA - timestampB;
                }

                if (stateA === resultStateValue && stateB !== resultStateValue) {
                    return 1;
                } else if (stateB === resultStateValue && stateA !== resultStateValue) {
                    return -1;
                }

                return 0;
            });
    };

    const sortByPinned = (list: number[], pinned: number[]): number[] => {
        const pinnedItems = pinned.filter(pinnedId => list.includes(pinnedId));
        const remainingItems = list.filter(item => !pinned.includes(item));
        return [...pinnedItems, ...remainingItems];
    };

    let currentList: ContestListType;

    if (status === 'all') {
        currentList = sortByPinned(filterByStatus(contestList, statusTable[status]), pinnedContest);
    } else if (status === 'progress') {
        currentList = filterByStatus(contestList, statusTable[status]);
    } else if (status === 'schedule') {
        currentList = filterByStatus(scheduleContestList, statusTable[status]);
    } else {
        currentList = filterByStatus(resultContestList, statusTable[status]);
    }
    const displayList = currentList.slice(0, rows.full);

    const finishList = status === 'all' ? currentList : [];

    if (status === 'all' && currentList.length < 20 && rows.notYet < 10) {
        setRows(prevRows => ({
            ...prevRows,
            notYet: prevRows.notYet + 20
        }));
    }

    const loadMoreList = () => {
        if (rows.full < currentList.length) {
            setRows(prevRows => ({
                ...prevRows,
                full: prevRows.full + 20
            }));
            return;
        }
        if (rows.finish < finishList.length) {
            setRows(prevRows => ({
                ...prevRows,
                finish: prevRows.finish + 20
            }));
        }
    };

    return (
        <>
            <div className={style.toolbar}>
                <div
                    className={style.streamlineBar}
                    onClick={() => {
                        setIsStreamline(!isStreamline);
                    }}
                >
                    <div className={`${style.streamlineOption} ${isStreamline && style.active}`}>
                        精简
                    </div>
                    <div className={style.divider} />
                    <div className={`${style.streamlineOption} ${!isStreamline && style.active}`}>
                        完整
                    </div>
                </div>
                <div className={style.optionBar}>
                    <FootballFilter
                        statusFunc={statusTable[status]}
                        updateFilterList={updateFilterList}
                    />
                    <div className={style.setting} onClick={switchSetting}>
                        <SettingIcon className={style.settingIcon} />
                    </div>
                </div>
            </div>
            {isLoading ? (
                <div className={style.loading}>
                    {isMounted ? <CircularProgress size={24} /> : null}
                </div>
            ) : (
                <>
                    <ul className={style.contestList}>
                        {displayList.map((matchId, index) => {
                            const matchTime = contestInfo[matchId].matchTime;
                            const state = contestInfo[matchId].state;
                            const content: ReactElement[] = [];

                            if (changeDayLine === null) {
                                changeDayLine = timestampToString(matchTime, 'YYYY-MM-DD');
                            } else if (
                                timestampToString(matchTime, 'YYYY-MM-DD') !== changeDayLine
                            ) {
                                content.push(
                                    <div
                                        className={style.dividerBar}
                                        key={`date_${index.toString()}`}
                                    >
                                        {timestampToStringWeek(matchTime)}
                                    </div>
                                );

                                changeDayLine = timestampToString(matchTime, 'YYYY-MM-DD');
                            }

                            if (status === 'all' && matchFinishLine && state === -1) {
                                content.push(
                                    <div
                                        className={style.dividerBar}
                                        key={`date_${index.toString()}`}
                                    >
                                        已结束
                                    </div>
                                );

                                matchFinishLine = false;
                            }

                            content.push(
                                <GameCard key={matchId} matchId={matchId} status={status}>
                                    {status === 'all' && index === 3 && (
                                        <BaseBanner className={style.banner} />
                                    )}
                                </GameCard>
                            );

                            return content;
                        })}
                        {status !== 'all' && displayList.length === 0 && <NoData text="暂无资料" />}
                    </ul>
                    {((status === 'all' && rows.finish < finishList.length) ||
                        (status !== 'all' && rows.full < currentList.length)) &&
                    isMounted ? (
                        <InfiniteScroll onVisible={loadMoreList}>
                            <div className={style.loadMore}>
                                <CircularProgress size={24} />
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <div className={style.scrollEnd}>已滑到底啰</div>
                    )}
                </>
            )}
        </>
    );
}

const Football = forwardRef(function Football(
    {
        todayContest,
        status,
        pinnedContest
    }: {
        todayContest: GetContestListResponse;
        status: Status;
        pinnedContest: number[];
    },
    ref: Ref<HTMLDivElement>
) {
    createContestListStore({
        ...todayContest,
        ...{ pinnedContest }
    });

    const [showSetting, setShowSetting] = useState(false);

    const switchSetting = () => {
        setShowSetting(!showSetting);
    };

    const [resultsDate, setResultsDate] = useState(Date.now());
    const [scheduleDate, setScheduleDate] = useState(Date.now());
    const [isLoading, setIsLoading] = useState(false);

    const handleDate = (date: Date) => {
        const dateFormat = date.getTime();

        if (status === 'result') {
            setResultsDate(dateFormat);
        }
        if (status === 'schedule') {
            setScheduleDate(dateFormat);
        }
        setIsLoading(true);
    };
    const closeLoading = () => {
        setIsLoading(false);
    };

    return (
        <div className={style.football} ref={ref}>
            <DatePicker
                handleDate={handleDate}
                resultsDate={resultsDate}
                scheduleDate={scheduleDate}
                status={status}
            />
            <ContestList
                closeLoading={closeLoading}
                isLoading={isLoading}
                resultsDate={resultsDate}
                scheduleDate={scheduleDate}
                status={status}
                switchSetting={switchSetting}
            />
            <Setting
                isOpen={showSetting}
                onClose={() => {
                    setShowSetting(false);
                }}
                onOpen={() => {
                    setShowSetting(true);
                }}
            />
        </div>
    );
});

export default Football;
