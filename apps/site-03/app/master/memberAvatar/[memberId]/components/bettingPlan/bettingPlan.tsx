import { getMemberIndividualGuessMatches, type MemberIndividualGuessMatch } from 'data-center';
import { useEffect, useState } from 'react';
import { timestampToString } from 'lib';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import NoData from '@/components/baseNoData/noData';
import IconHit from '@/public/resultIcon/bigWin.svg';
import IconMiss from '@/public/resultIcon/bigMiss.svg';
import IconDraw from '@/public/resultIcon/bigDraw.svg';
import type { InitGuessData, Tab } from '../../page';
import style from './bettingPlan.module.scss';
import SkeletonLayout from './components/skeleton';

const filterIcon = {
    WIN: <IconHit />,
    LOSE: <IconMiss />,
    DRAW: <IconDraw />
};

const filterPlay = {
    HOME: '胜负',
    AWAY: '胜负',
    OVER: '总进球',
    UNDER: '总进球',
    HANDICAP: '胜负',
    OVERUNDER: '总进球'
};

function BettingPlan({
    planActiveTab,
    setGuessLength,
    params,
    initGuessData,
    handleResetHeight
}: {
    planActiveTab: Tab;
    setGuessLength: (val: number) => void;
    params: { memberId: string };
    initGuessData: InitGuessData;
    handleResetHeight: () => void;
}) {
    const [guessMatchesList, setGuessMatchesList] = useState<MemberIndividualGuessMatch[]>([]);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const fetchData = async (resetList = false) => {
        if (resetList) {
            const guessMatchListLength = initGuessData[planActiveTab].guessMatchList.length;
            setGuessMatchesList(initGuessData[planActiveTab].guessMatchList);
            setGuessLength(initGuessData[planActiveTab].pagination.totalCount);
            setIsNoData(guessMatchListLength === 0);
            setTotalPage(initGuessData[planActiveTab].pagination.totalCount);
            return;
        }
        const res = await getMemberIndividualGuessMatches({
            memberId: Number(params.memberId),
            currentPage: currentPage + 1,
            pageSize: 50,
            guessType: planActiveTab
        });

        if (!res.success) {
            return new Error();
        }
        const updatedGuessMatchesList = guessMatchesList.concat(res.data.guessMatchList);
        setGuessMatchesList(updatedGuessMatchesList);
        setGuessLength(res.data.pagination.totalCount);
        setIsNoData(res.data.guessMatchList.length === 0);
        setTotalPage(res.data.pagination.pageCount);
    };

    const loadMoreList = () => {
        if (currentPage <= Math.round(guessMatchesList.length / 30) && currentPage < totalPage) {
            setCurrentPage(prevData => prevData + 1);
            void fetchData();
            handleResetHeight();
        }
    };

    const messageFormat = (predictedPlay: string, item: MemberIndividualGuessMatch) => {
        const commonSpan = (text: string) => (
            <span className={item.predictionResult === 'WIN' ? style.win : style.gray}>
                {' '}
                {text}
            </span>
        );
        switch (predictedPlay) {
            case 'OVER':
                return (
                    <>
                        <span>{item.overUnderOdds}</span>
                        {commonSpan('大')}
                    </>
                );
            case 'UNDER':
                return (
                    <>
                        <span>{item.overUnderOdds}</span>
                        {commonSpan('小')}
                    </>
                );
            case 'HOME':
                return (
                    <>
                        <span>{item.handicapInChinese}</span>
                        {commonSpan(item.homeTeamName)}
                    </>
                );
            case 'AWAY':
                return (
                    <>
                        <span>{item.handicapInChinese}</span>
                        {commonSpan(item.awayTeamName)}
                    </>
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        void fetchData(true);
    }, [planActiveTab]);

    return (
        <>
            {guessMatchesList.length === 0 && isNoData === null && <SkeletonLayout />}
            {guessMatchesList.length === 0 && isNoData ? (
                <NoData text="暂无资料" />
            ) : (
                <ul className={style.bettingPlanList}>
                    {guessMatchesList.map(item => {
                        return (
                            <Link
                                className={style.bettingPlanCard}
                                href={`/football/${item.matchId}`}
                                key={`${item.id}`}
                            >
                                <div className={style.iconBox}>
                                    {filterIcon[item.predictionResult]}
                                </div>
                                <div className={style.top}>
                                    {item.leagueName}
                                    <span className={style.time}>
                                        | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                                    </span>
                                </div>
                                <div className={style.mid}>
                                    <span className={style.plan}>
                                        {filterPlay[item.predictedPlay]}
                                    </span>
                                    <div className={style.combination}>
                                        {item.predictionResult === 'NONE' && item.isPaidToRead ? (
                                            <span>
                                                {item.homeTeamName} vs {item.awayTeamName}
                                            </span>
                                        ) : (
                                            <span>
                                                {item.homeTeamName}{' '}
                                                <span>
                                                    {item.homeScore} - {item.awayScore}
                                                </span>{' '}
                                                {item.awayTeamName}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className={style.bot}>
                                    <div className={style.message}>
                                        {messageFormat(item.predictedPlay, item)}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                    {guessMatchesList.length < totalPage ? (
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
                </ul>
            )}
        </>
    );
}

export default BettingPlan;
