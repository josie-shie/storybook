import { getMemberIndividualGuessMatches, type MemberIndividualGuessMatch } from 'data-center';
import { useEffect, useState } from 'react';
import { timestampToString } from 'lib';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import NoData from '@/components/baseNoData/noData';
import IconWin from './img/win.svg';
import IconLose from './img/lose.svg';
import IconDraw from './img/draw.svg';
import style from './bettingPlan.module.scss';
import SkeletonLayout from './components/skeleton';

type Tab = 0 | 1 | 2;

const filterIcon = {
    WIN: <IconWin />,
    LOSE: <IconLose />,
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
    setGuessLength,
    params
}: {
    planActiveTab: Tab;
    setGuessLength: (val: number) => void;
    params: { masterId: string };
}) {
    const [guessMatchesList, setGuessMatchesList] = useState<MemberIndividualGuessMatch[]>([]);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const fetchData = async (resetList = false) => {
        if (resetList) {
            setGuessMatchesList([]);
        }
        const res = await getMemberIndividualGuessMatches({
            memberId: Number(params.masterId),
            currentPage,
            pageSize: 30,
            guessType: planActiveTab
        });

        if (!res.success) {
            return new Error();
        }

        const updatedGuessMatchesList = resetList
            ? res.data.guessMatchList
            : guessMatchesList.concat(res.data.guessMatchList);
        setGuessMatchesList(updatedGuessMatchesList);
        setGuessLength(res.data.pagination.totalCount);
        setIsNoData(res.data.guessMatchList.length === 0);
        setTotalPage(res.data.pagination.totalCount);
    };

    const loadMoreList = () => {
        if (currentPage <= Math.round(guessMatchesList.length / 30) && currentPage < totalPage) {
            setCurrentPage(prevData => prevData + 1);
        }
    };

    useEffect(() => {
        void fetchData();
    }, [currentPage]);

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
                            <li className={style.bettingPlanCard} key={item.id}>
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
                                    <div
                                        className={`${style.message} ${
                                            item.predictionResult === 'WIN' && style.win
                                        }`}
                                    >
                                        {filterOdds[item.predictedPlay] === 'overUnder'
                                            ? ''
                                            : `${item.handicapOdds > 0 ? '让球' : '受让'}${
                                                  item.handicapInChinese
                                              }`}{' '}
                                        {item.predictedPlay === 'OVER' &&
                                            `${item.overUnderOdds} 大`}
                                        {item.predictedPlay === 'UNDER' &&
                                            `${item.overUnderOdds} 小`}
                                        {item.predictedPlay === 'HOME' && item.homeTeamName}
                                        {item.predictedPlay === 'AWAY' && item.awayTeamName}
                                    </div>
                                </div>
                            </li>
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
