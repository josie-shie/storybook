'use client';
import { getContestList, type GetContestListResponse } from 'data-center';
import { useEffect, useState } from 'react';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import { useContestInfoStore } from '@/app/contestInfoStore';
import GameCard from './components/gameCard';
import style from './football.module.scss';
import { creatContestListStore, useContestListStore } from './contestListStore';
import BaseDatePicker from './components/baseDatePicker/baseDatePicker';
import SettingIcon from './img/setting.png';
import Setting from './components/setting';
import FilterButton from './components/filterButton';

type Status = 'all' | 'progress' | 'schedule' | 'result';

function Banner() {
    return <div className={style.banner} />;
}

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
    const [rows, setRows] = useState({ full: 20, notYet: 0, finish: 0 });
    const contestList = useContestListStore.use.contestList();
    const contestInfo = useContestListStore.use.contestInfo();
    const globalStore = useContestInfoStore.use.contestInfo();
    const filterList = useContestListStore.use.filterList();
    const setContestList = useContestListStore.use.setContestList();
    const setContestInfo = useContestListStore.use.setContestInfo();
    const setFilterInit = useContestListStore.use.setFilterInit();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const dateString = scheduleDate || resultsDate || Date.now();
        const fetchContestdata = async (timestamp: number) => {
            try {
                const todayContest = await getContestList(timestamp);
                if (!todayContest.success) {
                    return new Error();
                }
                setContestList({ contestList: todayContest.data.contestList });
                setContestInfo({ contestInfo: todayContest.data.contestInfo });
                closeLoading();
            } catch (error) {
                closeLoading();
                return new Error();
            }
        };
        void fetchContestdata(Math.floor(Number(dateString) / 1000));
    }, [resultsDate, scheduleDate, setContestList, setContestInfo]);

    const statusTable: Record<string, (state: number) => boolean> = {
        all: state => state >= 1 && state < 5,
        progress: state => state >= 1 && state <= 5,
        notyet: state => state === 0,
        schedule: state => state === 0,
        result: state => state === -1
    };

    const filterByStatus = (list: number[], statusFunc: (state: number) => boolean) => {
        const filterGroup = filterList.group === 'league' ? 'leagueChsShort' : 'countryCn';
        return list.filter(item => {
            if (
                Object.keys(filterList.selectedTable).length > 0 &&
                !filterList.selectedTable[contestInfo[item][filterGroup]]
            ) {
                return false;
            }
            const state =
                Object.hasOwnProperty.call(globalStore, item) &&
                globalStore[item].state !== undefined
                    ? globalStore[item].state
                    : contestInfo[item].state;
            return typeof state === 'number' && statusFunc(state);
        });
    };

    const currentList = filterByStatus(contestList, statusTable[status]);
    const displayList = currentList.slice(0, rows.full);

    const notYetPlayList = status === 'all' ? filterByStatus(contestList, statusTable.notyet) : [];
    const displayNotYetList = notYetPlayList.slice(0, rows.notYet);

    const finishList = status === 'all' ? filterByStatus(contestList, state => state < 0) : [];
    const displayFinishList = finishList.slice(0, rows.finish);

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
        if (rows.notYet < notYetPlayList.length) {
            setRows(prevRows => ({
                ...prevRows,
                notYet: prevRows.notYet + 20
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
    useEffect(() => {
        setFilterInit({ contestInfo, contestList: status === 'all' ? contestList : currentList });
    }, [contestInfo, status]);

    return (
        <>
            <Banner />
            <div className={style.toolbar}>
                <FilterButton />
                <Image alt="setting" onClick={switchSetting} sizes="32" src={SettingIcon} />
            </div>
            {isLoading ? (
                <div className={style.loading}>
                    {isMounted ? <CircularProgress size={24} /> : null}
                </div>
            ) : (
                <>
                    <ul>
                        {displayList.map(matchId => {
                            return <GameCard key={matchId} matchId={matchId} />;
                        })}
                        {status === 'all' && displayNotYetList.length > 0 && (
                            <li className={style.line}>尚未开赛</li>
                        )}
                        {displayNotYetList.map(matchId => {
                            return <GameCard key={matchId} matchId={matchId} />;
                        })}
                        {status === 'all' && displayFinishList.length > 0 && (
                            <li className={style.line}>完赛</li>
                        )}
                        {displayFinishList.map(matchId => {
                            return <GameCard key={matchId} matchId={matchId} />;
                        })}
                        {status !== 'all' && displayList.length === 0 && (
                            <li className={style.noneContest}>暂无赛事</li>
                        )}
                    </ul>
                    {((status === 'all' && rows.finish < finishList.length) ||
                        (status !== 'all' && rows.full < currentList.length)) &&
                    isMounted ? (
                        <InfiniteScroll onVisible={loadMoreList}>
                            <div className={style.loadMore}>
                                <CircularProgress size={24} />
                            </div>
                        </InfiniteScroll>
                    ) : null}
                </>
            )}
        </>
    );
}

function Football({
    todayContest,
    status
}: {
    todayContest: GetContestListResponse;
    status: Status;
}) {
    creatContestListStore(todayContest);
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
            return;
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
        <>
            <div className={style.football}>
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
            </div>
            <Setting
                isOpen={showSetting}
                onClose={() => {
                    setShowSetting(false);
                }}
                onOpen={() => {
                    setShowSetting(true);
                }}
            />
        </>
    );
}

export default Football;
