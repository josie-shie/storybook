'use client';
import { timestampToStringWeek, timestampToString } from 'lib';
import type { ReactElement, Ref } from 'react';
import { getContestList } from 'data-center';
import type { ContestListType } from 'data-center';
import { useEffect, useState, forwardRef, useCallback } from 'react';
import { InfiniteScroll, slickOption } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import { useLiveContestStore } from '@/store/liveContestStore';
import type { FilterList } from '@/components/contestFilter/contestFilter';
import NoData from '@/components/baseNoData/noData';
import GameCard from './components/gameCard';
import style from './football.module.scss';
import { useContestListStore } from './contestListStore';
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
            {(status === 'schedule' || status === 'result') && isMounted ? (
                <div className={style.dateHolder}>
                    {status === 'schedule' ? (
                        <BaseDatePicker
                            defaultDate={new Date(Number(scheduleDate))}
                            direction="schedule"
                            onDateChange={date => {
                                handleDate(date);
                            }}
                        />
                    ) : null}
                    {status === 'result' ? (
                        <BaseDatePicker
                            defaultDate={new Date(Number(resultsDate))}
                            direction="result"
                            onDateChange={date => {
                                handleDate(date);
                            }}
                        />
                    ) : null}
                </div>
            ) : null}
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

    const [rows, setRows] = useState({ full: 10, notYet: 0, finish: 0 });
    const [filterList, setFilterList] = useState<FilterList>({
        group: 'league',
        selectedTable: {}
    });
    const [isMounted, setIsMounted] = useState(false);
    const [isStreamline, setIsStreamline] = useState(true);
    let changeDayLine: string | null = null;
    let matchFinishLine = true;

    const targetContestInfoMap = {
        all: contestInfo,
        progress: contestInfo,
        schedule: scheduleContestInfo,
        result: resultContestInfo
    };

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
        if (typeof slickOption.contestListResetHeight !== 'undefined') {
            slickOption.contestListResetHeight();
        }
    }, [rows]);

    useEffect(() => {
        const dateString = (status === 'result' ? resultsDate : scheduleDate) || Date.now();
        const fetchContestData = async (timestamp: number) => {
            if (!isMounted) return;
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
    }, [resultsDate, scheduleDate]);

    const statusTable: Record<string, (state: number) => boolean> = {
        all: state => state >= -1 && state <= 5,
        progress: state => state >= 1 && state <= 5,
        notYet: state => state === 0, // 未開賽
        schedule: state => state === 0,
        result: state => state === -1
    };

    const sortByPinned = useCallback((list: number[], pinned: number[]): number[] => {
        const pinnedItems = pinned.filter(pinnedId => list.includes(pinnedId));
        const remainingItems = list.filter(item => !pinned.includes(item));
        return [...pinnedItems, ...remainingItems];
    }, []);

    const filterByStatus = (list: number[], statusFunc: (state: number) => boolean) => {
        const filterGroup = filterList.group === 'league' ? 'leagueChsShort' : 'countryCn';

        const resultStateValue = -1;

        let resultData = list
            .filter(matchId => {
                if (
                    Object.keys(filterList.selectedTable).length > 0 &&
                    !filterList.selectedTable[targetContestInfoMap[status][matchId][filterGroup]]
                ) {
                    return false;
                }

                if (
                    isStreamline &&
                    typeof targetContestInfoMap[status][matchId] !== 'undefined' &&
                    targetContestInfoMap[status][matchId].hasHandicapOdd &&
                    targetContestInfoMap[status][matchId].hasOverUnderOdd
                ) {
                    return false;
                }

                const state =
                    Object.hasOwnProperty.call(globalStore, matchId) &&
                    globalStore[matchId].state !== undefined
                        ? globalStore[matchId].state
                        : targetContestInfoMap[status][matchId].state;
                return typeof state === 'number' && statusFunc(state);
            })
            .sort((a, b) => {
                const stateA =
                    Object.hasOwnProperty.call(globalStore, a) && globalStore[a].state !== undefined
                        ? globalStore[a].state
                        : targetContestInfoMap[status][a].state;
                const stateB =
                    Object.hasOwnProperty.call(globalStore, b) && globalStore[b].state !== undefined
                        ? globalStore[b].state
                        : targetContestInfoMap[status][b].state;

                if (stateA === resultStateValue && stateB === resultStateValue) {
                    const timestampA = targetContestInfoMap[status][a].matchTime;
                    const timestampB = targetContestInfoMap[status][b].matchTime;
                    return timestampA - timestampB;
                }

                if (stateA === resultStateValue && stateB !== resultStateValue) {
                    return 1;
                } else if (stateB === resultStateValue && stateA !== resultStateValue) {
                    return -1;
                }

                return 0;
            });

        if (status === 'all') {
            resultData = sortByPinned(resultData, pinnedContest);
        }

        return resultData;
    };

    let currentList: ContestListType;

    if (status === 'all') {
        currentList = filterByStatus(contestList, statusTable[status]);
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
                    {isMounted ? (
                        <FootballFilter
                            resultsDate={resultsDate}
                            scheduleDate={scheduleDate}
                            statusFunc={statusTable[status]}
                            tabStatus={status}
                            updateFilterList={updateFilterList}
                        />
                    ) : null}

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
                            const matchTime = targetContestInfoMap[status][matchId].matchTime;
                            const matchDate = timestampToString(matchTime, 'YYYY-MM-DD');
                            const state = targetContestInfoMap[status][matchId].state;
                            const content: ReactElement[] = [];

                            if (status === 'all' && matchFinishLine && state === -1) {
                                content.push(
                                    <li
                                        className={style.dividerBar}
                                        key={`date_${index.toString()}`}
                                    >
                                        已结束
                                    </li>
                                );

                                matchFinishLine = false;
                            }

                            if (matchDate !== changeDayLine && changeDayLine !== null) {
                                content.push(
                                    <li
                                        className={style.dividerBar}
                                        key={`date_${index.toString()}_${matchId}`}
                                    >
                                        {timestampToStringWeek(matchTime)}
                                    </li>
                                );
                            }

                            changeDayLine = matchDate;

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
                                <CircularProgress aria-label="Loading" size={24} />
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
        status
    }: {
        status: Status;
    },
    ref: Ref<HTMLDivElement>
) {
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
