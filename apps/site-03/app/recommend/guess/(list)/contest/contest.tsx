'use client';
import { useEffect, useState } from 'react';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import { getContestList, type GetContestListResponse } from 'data-center';
// import Rule from '../components/rule/rule';
import Image from 'next/image';
import Banner from '../img/banner.png';
import { creatGuessContestListStore, useGuessContestListStore } from './contestStore';
import GameCard from './gameCard';
import style from './contest.module.scss';

function ContestList() {
    const [rows, setRows] = useState({ full: 20, notYet: 0, finish: 0 });
    const contestList = useGuessContestListStore.use.contestList();
    const setContestList = useGuessContestListStore.use.setContestList();
    const setContestInfo = useGuessContestListStore.use.setContestInfo();

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
        const dateString = Date.now();
        void fetchContestdata(Math.floor(Number(dateString) / 1000));
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

function Contest({ todayContest }: { todayContest: GetContestListResponse }) {
    creatGuessContestListStore(todayContest);

    return (
        <div className={style.contest}>
            {/* <div className={style.control}>
                <div className={style.right}>
                    <Rule />
                </div>
            </div> */}
            <Image alt="" className={style.banner} src={Banner} />
            <ContestList />
        </div>
    );
}

export default Contest;
