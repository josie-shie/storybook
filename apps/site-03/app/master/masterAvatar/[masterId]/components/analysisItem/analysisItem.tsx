import Image from 'next/image';
import { timestampToString, timestampToMonthDay } from 'lib';
import { useRouter } from 'next/navigation';
import { type RecommendPost } from 'data-center';
import { useEffect, useState } from 'react';
import { getPostList } from 'data-center';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import type { PredictArticleType } from '@/types/predict';
import UnlockButton from '@/components/unlockButton/unlockButton';
import NoData from '@/components/baseNoData/noData';
import style from './analysisItem.module.scss';
import IconWin from './img/win.png';
import IconDraw from './img/draw.png';
import IconLose from './img/lose.png';

const filterImage = (value: PredictArticleType): string => {
    const result = {
        WIN: IconWin.src,
        DRAW: IconDraw.src,
        LOSE: IconLose.src
    };
    return result[value];
};

const formatHandicapName = {
    HOME: '大小',
    AWAY: '大小',
    OVER: '让分',
    UNDER: '让分',
    HANDICAP: '大小',
    OVERUNDER: '让分'
};

function AnalysisItem({
    params,
    setArticleLength
}: {
    params: { masterId: string };
    setArticleLength: (val: number) => void;
}) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [predictArticleList, setPredictArticleList] = useState<RecommendPost[]>([]);

    const router = useRouter();

    const fetchData = async () => {
        const res = await getPostList({
            memberId: Number(params.masterId),
            postFilter: ['all'],
            currentPage,
            pageSize: 30
        });

        if (!res.success) {
            return new Error();
        }
        const updatedArticleList = [...predictArticleList, ...res.data.posts];
        setPredictArticleList(updatedArticleList);
        setArticleLength(res.data.totalArticle);
        setTotalPage(res.data.totalPage);
    };

    const goArticleDetail = (id: number) => {
        router.push(`/master/article/${id}`);
    };

    const loadMoreList = () => {
        if (currentPage <= Math.round(predictArticleList.length / 30) && currentPage < totalPage) {
            setCurrentPage(prevData => prevData + 1);
        }
    };

    useEffect(() => {
        void fetchData();
    }, [currentPage]);

    return (
        <>
            {predictArticleList.length > 0 ? (
                <>
                    {predictArticleList.map(item => {
                        return (
                            <div className={style.analysisItem} key={item.id}>
                                <div className={style.top}>
                                    <div className={style.left}>
                                        <div className={style.decorate} />
                                        <div className={style.title}>{item.analysisTitle}</div>
                                    </div>
                                    <div className={style.unlockStatus}>
                                        {item.isUnlocked ? (
                                            <span className={style.unlocked}>已解鎖</span>
                                        ) : (
                                            <UnlockButton price={item.price} />
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={style.mid}
                                    onClick={() => {
                                        goArticleDetail(item.id);
                                    }}
                                >
                                    <div className={style.combination}>
                                        <div className={style.detail}>
                                            {item.leagueName}
                                            <span className={style.time}>
                                                | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                                            </span>
                                        </div>
                                        <div className={style.team}>
                                            <span className={style.tag}>
                                                {formatHandicapName[item.predictedPlay]}
                                            </span>
                                            {item.homeTeamName} vs {item.awayTeamName}
                                        </div>
                                        {item.predictionResult === 'NONE' ? null : (
                                            <Image
                                                alt=""
                                                className={style.icon}
                                                height={46}
                                                src={filterImage(item.predictionResult)}
                                                width={46}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className={style.postTime}>
                                    发表于今天 {timestampToMonthDay(item.createdAt)}
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
            ) : (
                <NoData />
            )}
        </>
    );
}

export default AnalysisItem;
