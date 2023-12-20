'use client';
import { useEffect, useState } from 'react';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import { getTodayGuessMatches, type GetTodayGuessMatchesResponse } from 'data-center';
import Image from 'next/image';
import BaseNoData from '@/components/baseNoData/noData';
import Banner from '../img/banner.png';
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

    if (displayList.length === 0) return <BaseNoData />;
    return (
        <>
            {displayList.map(matchId => {
                return <GameCard key={matchId} matchId={matchId} />;
            })}
            {rows.full < contestList.length && (
                <InfiniteScroll onVisible={loadMoreList}>
                    <div className={style.loadMore}>
                        <CircularProgress size={24} />
                    </div>
                </InfiniteScroll>
            )}
        </>
    );
}

function Contest({ todayGuess }: { todayGuess: GetTodayGuessMatchesResponse }) {
    creatGuessContestListStore(todayGuess);

    return (
        <div className={style.contest}>
            <Image alt="" className={style.banner} src={Banner} />
            <ContestList />
        </div>
    );
}

export default Contest;
