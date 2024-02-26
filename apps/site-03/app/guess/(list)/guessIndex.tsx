'use client';
import { Slick } from 'ui';
import { useEffect, useRef, useState } from 'react';
import type { GetTodayGuessMatchesResponse } from 'data-center';
import ScrollTop from '@/components/scrollTop/scrollTop';
import Contest from './contest/contest';
import Rank from './rank/rank';
import MasterRank from './masterRank/masterRank';
import style from './layout.module.scss';

function GuessIndex({ todayGuess }: { todayGuess: GetTodayGuessMatchesResponse }) {
    const [secendRender, setSecendRender] = useState(false);
    const gameListRef = useRef<HTMLDivElement>(null);
    const weekRankRef = useRef<HTMLDivElement>(null);
    const monthRankRef = useRef<HTMLDivElement>(null);
    const seasonRankRef = useRef<HTMLDivElement>(null);
    const masterRankRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSecendRender(true);
    }, []);

    const tabList = [
        {
            label: '今日',
            status: null
        },
        {
            label: '周榜',
            status: 'week'
        },
        {
            label: '月榜',
            status: 'month'
        },
        {
            label: '季榜',
            status: 'season'
        },
        {
            label: '连红榜',
            status: 'hotStreak'
        }
    ];

    const onSlickEnd = (nowIndex, prevIndex: number) => {
        const tabRef = [gameListRef, weekRankRef, monthRankRef, seasonRankRef, masterRankRef];
        const currentRef = tabRef[prevIndex].current;
        if (currentRef) currentRef.scrollTop = 0;
    };

    return (
        <>
            <Slick
                autoHeight
                className={style.guessIndex}
                fixedTabs
                initialSlide={0}
                onSlickEnd={onSlickEnd}
                resetHeightKey="guessIndex"
                styling="button"
                tabs={tabList}
            >
                <Contest ref={gameListRef} todayGuess={todayGuess} />
                {secendRender ? <Rank ref={weekRankRef} status="week" /> : null}
                {secendRender ? <Rank ref={monthRankRef} status="month" /> : null}
                {secendRender ? <Rank ref={seasonRankRef} status="season" /> : null}
                {secendRender ? <MasterRank ref={masterRankRef} /> : null}
            </Slick>
            <ScrollTop />
        </>
    );
}

export default GuessIndex;
