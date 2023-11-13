'use client';
import { getContestList, type GetContestListResponse } from 'data-center';
import { useEffect, useState } from 'react';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import GameCard from './components/gameCard';
import style from './football.module.scss';
import { creatContestListStore, useContestListStore } from './contestListStore';
import Filter from './components/filter';
import BaseDatePicker from './components/baseDatePicker/baseDatePicker';
import { useContestInfoStore } from '@/app/contestInfoStore';

function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function ContestList() {
    const [rows, setRows] = useState({ full: 20, notYet: 0, finish: 0 });
    const contestList = useContestListStore.use.contestList();
    const contestInfo = useContestListStore.use.contestInfo();
    const globalStore = useContestInfoStore.use.contestInfo();
    const filterList = useContestListStore.use.filterList();
    const setContestList = useContestListStore.use.setContestList();
    const setContestInfo = useContestListStore.use.setContestInfo();

    const searchParams = useSearchParams();
    const status = searchParams.get('status') || 'all';

    const fetchContestdata = async (timestamp: number) => {
        try {
            const todayContest = await getContestList(timestamp);
            if (!todayContest.success) {
                return new Error();
            }

            setContestList({ contestList: todayContest.data.contestList });
            setContestInfo({ contestInfo: todayContest.data.contestInfo });
        } catch (error) {
            return new Error();
        }
    };

    useEffect(() => {
        const result = searchParams.get('resultsDate') || null;
        const schedule = searchParams.get('scheduleDate') || null;

        if (schedule || result) {
            const dateString = schedule ? schedule : result;
            const format = 'YYYY/MM/DD HH:mm:ss';
            const now = Math.floor(Date.now() / 1000);

            const timestamp = dayjs(dateString, format).valueOf() / 1000 || now;
            void fetchContestdata(timestamp);
        }
    }, [searchParams.get('resultsDate'), searchParams.get('scheduleDate')]);

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

    return (
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
                (status !== 'all' && rows.full < currentList.length)) && (
                <InfiniteScroll onVisible={loadMoreList}>
                    <div className={style.loadMore}>
                        <CircularProgress size={24} />
                    </div>
                </InfiniteScroll>
            )}
        </>
    );
}

function Football({ todayContest }: { todayContest: GetContestListResponse }) {
    creatContestListStore(todayContest);

    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const router = useRouter();
    const resultDate = searchParams.get('resultsDate') || null;
    const scheduleDate = searchParams.get('scheduleDate') || null;

    const handleDate = (date: Date) => {
        const dateFormat = formatDate(date);
        if (status === 'result') {
            router.push(`?status=${status}&resultsDate=${dateFormat}`);
            return;
        }
        if (status === 'schedule') {
            router.push(`?status=${status}&scheduleDate=${dateFormat}`);
        }
    };

    return (
        <>
            <div className={style.football}>
                {status === 'schedule' && (
                    <BaseDatePicker
                        defaultDate={dayjs(scheduleDate).toDate()}
                        direction="schedule"
                        onDateChange={date => {
                            handleDate(date);
                        }}
                    />
                )}
                {status === 'result' && (
                    <BaseDatePicker
                        defaultDate={dayjs(resultDate).toDate()}
                        direction="result"
                        onDateChange={date => {
                            handleDate(date);
                        }}
                    />
                )}
                <ContestList />
            </div>
            <Filter />
        </>
    );
}

export default Football;
