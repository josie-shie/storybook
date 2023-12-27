import Image from 'next/image';
import { getMentorIndividualGuessMatches, type MemberIndividualGuessMatch } from 'data-center';
import { useEffect, useState } from 'react';
import { timestampToString } from 'lib';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import NoData from '@/components/baseNoData/noData';
import IconWin from './img/win.png';
import IconLose from './img/lose.png';
import IconDraw from './img/draw.png';
import style from './bettingPlan.module.scss';
import SkeletonLayout from './components/skeleton';

type Tab = 0 | 1 | 2;

const filterIcon = {
    WIN: <Image alt="icon" className={style.iconWin} src={IconWin} />,
    LOSE: <Image alt="icon" className={style.iconDefeat} src={IconLose} />,
    DRAW: <Image alt="icon" className={style.iconDefeat} src={IconDraw} />
};

const filterPlay = {
    HOME: '让球',
    AWAY: '让球',
    OVER: '大小',
    UNDER: '大小',
    HANDICAP: '让球',
    OVERUNDER: '大小'
};

const filterOdds = {
    HOME: 'handicap',
    AWAY: 'handicap',
    OVER: 'overUnder',
    UNDER: 'overUnder',
    HANDICAP: 'handicap',
    OVERUNDER: 'overUnder'
};

function BettingPlan({
    planActiveTab,
    setGuessLength
}: {
    planActiveTab: Tab;
    setGuessLength: (val: number) => void;
}) {
    const [guessMatchesList, setGuessMatchesList] = useState<MemberIndividualGuessMatch[]>([]);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const fetchData = async () => {
        const res = await getMentorIndividualGuessMatches({
            memberId: 1,
            currentPage,
            pageSize: 30,
            guessType: planActiveTab
        });

        if (!res.success) {
            return new Error();
        }

        const updatedGuessMatchesList = [...guessMatchesList, ...res.data.guessMatchList];
        setGuessMatchesList(updatedGuessMatchesList);
        setGuessLength(res.data.guessMatchList.length);
        setIsNoData(res.data.guessMatchList.length === 0);
        setTotalPage(res.data.pagination.pageCount);
    };

    const loadMoreList = () => {
        if (currentPage <= Math.round(guessMatchesList.length / 30) && currentPage < totalPage) {
            setCurrentPage(prevData => prevData + 1);
        }
    };

    useEffect(() => {
        void fetchData();
    }, [planActiveTab, currentPage]);

    return (
        <>
            {guessMatchesList.length === 0 && isNoData === null && <SkeletonLayout />}

            {guessMatchesList.length === 0 && isNoData ? (
                <NoData />
            ) : (
                <>
                    {guessMatchesList.map(item => {
                        return (
                            <div className={style.bettingPlan} key={item.id}>
                                {filterIcon[item.predictionResult]}
                                <div className={style.top}>
                                    {item.leagueName}
                                    <span className={style.time}>
                                        {' '}
                                        | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                                    </span>
                                </div>
                                <div className={style.mid}>
                                    <span className={style.plan}>
                                        {filterPlay[item.predictedPlay]}
                                    </span>
                                    <div className={style.combination}>
                                        {item.homeTeamName} vs {item.awayTeamName}
                                    </div>
                                </div>
                                <div className={style.bot}>
                                    <div className={style.message}>
                                        {filterOdds[item.handicapOdds] === 'handicap'
                                            ? item.handicapOdds
                                            : item.overUnderOdds}
                                        {item.predictionResult}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {currentPage < totalPage && (
                        <InfiniteScroll onVisible={loadMoreList}>
                            <div className={style.loadMore}>
                                <CircularProgress size={24} />
                            </div>
                        </InfiniteScroll>
                    )}
                </>
            )}
        </>
    );
}

export default BettingPlan;
