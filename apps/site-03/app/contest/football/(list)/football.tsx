'use client';
import type { GetContestListResponse } from 'data-center';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import GameCard from './components/gameCard';
import style from './football.module.scss';
import { creatContestListStore, useContestListStore } from './contestListStore';
import { useContestInfoStore } from '@/app/contestInfoStore';

function ContestList() {
    const [rows, setRows] = useState({ full: 20, notYet: 0, finish: 0 });
    const contestList = useContestListStore.use.contestList();
    const contestInfo = useContestListStore.use.contestInfo();
    const globalStore = useContestInfoStore.use.contestInfo();

    const searchParams = useSearchParams();
    const status = searchParams.get('status') || 'all';

    const statusTable: Record<string, (state: number) => boolean> = {
        all: state => state >= 1 && state < 5,
        progress: state => state >= 1 && state <= 5,
        notyet: state => state === 0,
        scheule: state => state === 0,
        result: state => state === -1
    };

    const filterByStatus = (list: number[], statusFunc: (state: number) => boolean) => {
        return list.filter(item => {
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
                    <li className={style.line}>尚未開賽</li>
                )}
                {displayNotYetList.map(matchId => {
                    return <GameCard key={matchId} matchId={matchId} />;
                })}
                {status === 'all' && displayFinishList.length > 0 && (
                    <li className={style.line}>完賽</li>
                )}
                {displayFinishList.map(matchId => {
                    return <GameCard key={matchId} matchId={matchId} />;
                })}
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

    return (
        <div className={style.football}>
            <ContestList />
        </div>
    );
}

export default Football;
