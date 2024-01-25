'use client';
import React, { useEffect, useState, forwardRef } from 'react';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import { getTodayGuessMatches, type GetTodayGuessMatchesResponse } from 'data-center';
import Image from 'next/image';
import type { Ref } from 'react';
import BaseNoData from '@/components/baseNoData/noData';
import NewBanner from '../img/newBanner.png';
import { creatGuessContestListStore, useGuessContestListStore } from './contestStore';
import GameCard from './gameCard';
import style from './contest.module.scss';

function ContestList() {
    const [rows, setRows] = useState({ full: 20, notYet: 0, finish: 0 });
    const contestList = useGuessContestListStore.use.contestGuessList();
    const setContestList = useGuessContestListStore.use.setContestGuessList();
    const setContestInfo = useGuessContestListStore.use.setContestGuessInfo();

    const fetchContestGuessData = async () => {
        try {
            const todayGuess = await getTodayGuessMatches();
            if (!todayGuess.success) {
                return new Error();
            }

            setContestList({ contestGuessList: todayGuess.data.contestGuessList });
            setContestInfo({ contestGuessInfo: todayGuess.data.contestGuessInfo });
        } catch (error) {
            return new Error();
        }
    };

    useEffect(() => {
        void fetchContestGuessData();
    }, []);

    const displayList = contestList.slice(0, rows.full);

    if (contestList.length < 20 && rows.notYet < 10) {
        setRows(prevRows => ({
            ...prevRows,
            notYet: prevRows.notYet + 20
        }));
    }

    const loadMoreList = () => {
        if (rows.full < contestList.length) {
            setRows(prevRows => ({
                ...prevRows,
                full: prevRows.full + 20
            }));
        }
    };

    if (displayList.length === 0) return <BaseNoData text="暂无资料" />;
    return (
        <>
            {displayList.map((matchId, idx) => {
                if (idx === 5) {
                    return (
                        <React.Fragment key={matchId}>
                            <Image alt="" className={style.banner} src={NewBanner} />
                            <GameCard matchId={matchId} />
                        </React.Fragment>
                    );
                }
                return <GameCard key={matchId} matchId={matchId} />;
            })}
            {rows.full < contestList.length ? (
                <InfiniteScroll onVisible={loadMoreList}>
                    <div className={style.loadMore}>
                        <CircularProgress size={24} />
                    </div>
                </InfiniteScroll>
            ) : (
                <div className={style.listEnd}>
                    <p>已滑到底啰</p>
                </div>
            )}
        </>
    );
}

const Contest = forwardRef(function Contest(
    {
        todayGuess
    }: {
        todayGuess: GetTodayGuessMatchesResponse;
    },
    gameListRef: Ref<HTMLDivElement>
) {
    creatGuessContestListStore(todayGuess);

    return (
        <div className={style.contest} ref={gameListRef}>
            <ContestList />
        </div>
    );
});

export default Contest;
