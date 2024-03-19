import { timestampToTodayTime } from 'lib';
import { type RecommendPost } from 'data-center';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPostList } from 'data-center';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import NoData from '@/components/baseNoData/noData';
import { useUserStore } from '@/store/userStore';
import IconWin from '@/public/resultIcon/bigWin.svg';
import IconDraw from '@/public/resultIcon/bigDraw.svg';
import IconLose from '@/public/resultIcon/bigLose.svg';
import IconPush from '@/public/resultIcon/bigPush.svg';
import style from './analysisItem.module.scss';
import Eye from './img/eye.svg';
import LockOpen from './img/lockOpen.svg';
import SkeletonLayout from './components/skeleton';

function AnalysisItem({
    params,
    setArticleLength
}: {
    params: { masterId: string };
    setArticleLength: (val: number) => void;
}) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);
    const [predictArticleList, setPredictArticleList] = useState<RecommendPost[]>([]);
    const userInfo = useUserStore.use.userInfo();

    const fetchData = async () => {
        const res = await getPostList({
            memberId: userInfo.uid ? userInfo.uid : 0,
            postFilter: ['mentor'],
            filterId: [Number(params.masterId)],
            pagination: {
                currentPage: 1,
                perPage: 30
            }
        });

        if (!res.success) {
            return new Error();
        }
        const updatedArticleList = [...predictArticleList, ...res.data.posts];
        setPredictArticleList(updatedArticleList);
        setArticleLength(res.data.pagination.totalCount);
        setTotalPage(res.data.pagination.totalCount);
        setIsNoData(res.data.pagination.totalCount === 0);
    };

    const loadMoreList = () => {
        if (currentPage <= Math.round(predictArticleList.length / 30) && currentPage < totalPage) {
            setCurrentPage(prevData => prevData + 1);
        }
    };

    useEffect(() => {
        void fetchData();
    }, [currentPage]);

    const getText = predictedPlay => {
        switch (predictedPlay) {
            case 'HANDICAP':
                return '胜负';
            case 'OVERUNDER':
                return '总进球';
            default:
                return '';
        }
    };

    const IconMap = {
        PUSH: <IconPush height="45px" width="45px" />,
        LOSE: <IconLose height="45px" width="45px" />,
        DRAW: <IconDraw height="45px" width="45px" />,
        WIN: <IconWin height="45px" width="45px" />
    };

    return (
        <>
            {predictArticleList.length === 0 && isNoData === null && <SkeletonLayout />}

            {predictArticleList.length === 0 && isNoData ? (
                <NoData text="暂无资料" />
            ) : (
                <ul className={style.article}>
                    {predictArticleList.map(item => {
                        return (
                            <li className={style.articleCard} key={item.id}>
                                <div className={style.result}>{IconMap[item.predictionResult]}</div>
                                <div className={style.user}>
                                    <div className={style.userInfo}>
                                        <div className={style.userName}>
                                            <div className={style.plan}>
                                                {getText(item.mentorArticleCount.predictedPlay)}
                                            </div>
                                            {item.mentorName}
                                        </div>
                                    </div>
                                </div>

                                <Link href={`/master/articleDetail/${item.id}`}>
                                    <div className={style.game}>
                                        <div className={style.leagueTeam}>
                                            <span>{item.leagueName}</span>
                                            <span className={style.line}>|</span>
                                            <span>
                                                {item.homeTeamName}VS{item.awayTeamName}
                                            </span>
                                        </div>
                                        <div className={style.title}>{item.analysisTitle}</div>
                                    </div>
                                </Link>
                                <div className={style.postTime}>
                                    <span>{timestampToTodayTime(item.createdAt)}</span>
                                    {item.seenCounts || item.unlockCounts ? (
                                        <div className={style.seen}>
                                            {item.seenCounts ? (
                                                <span>
                                                    <Eye />
                                                    {item.seenCounts}
                                                </span>
                                            ) : null}

                                            {item.seenCounts && item.unlockCounts ? (
                                                <span className={style.line}>|</span>
                                            ) : null}

                                            {item.unlockCounts ? (
                                                <span>
                                                    <LockOpen />
                                                    {item.unlockCounts}
                                                </span>
                                            ) : null}
                                        </div>
                                    ) : null}
                                </div>
                            </li>
                        );
                    })}
                    {predictArticleList.length < totalPage ? (
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

export default AnalysisItem;
