import Image from 'next/image';
import { timestampToString, timestampToMonthDay } from 'lib';
import { useRouter } from 'next/navigation';
import { type RecommendPost } from 'data-center';
import { useEffect, useState } from 'react';
import { getPostList, payForPost, getMemberInfo } from 'data-center';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import type { PredictArticleType } from '@/types/predict';
import UnlockButton from '@/components/unlockButton/unlockButton';
import NoData from '@/components/baseNoData/noData';
import NormalDialog from '@/components/normalDialog/normalDialog';
import { useUserStore } from '@/app/userStore';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import style from './analysisItem.module.scss';
import IconWin from './img/win.png';
import IconDraw from './img/draw.png';
import IconLose from './img/lose.png';
import SkeletonLayout from './components/skeleton';

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
    const [isNoData, setIsNoData] = useState<boolean | null>(null);
    const [predictArticleList, setPredictArticleList] = useState<RecommendPost[]>([]);
    const [isOpenPaid, setIsOpenPaid] = useState(false);
    const [isOpenRecharge, setIsOpenRecharge] = useState(false);
    const [articleInfo, setArticleInfo] = useState({} as RecommendPost);

    const router = useRouter();

    const isVip = useUserStore.use.memberSubscribeStatus();
    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();
    const setUserInfo = useUserStore.use.setUserInfo();

    const fetchData = async () => {
        const res = await getPostList({
            memberId: userInfo.uid ? userInfo.uid : 0,
            postFilter: ['mentor'],
            filterId: [Number(params.masterId)],
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
        setIsNoData(res.data.totalArticle === 0);
    };

    const fetchResetData = async () => {
        const res = await getPostList({
            memberId: userInfo.uid ? userInfo.uid : 0,
            postFilter: ['mentor'],
            filterId: [Number(params.masterId)],
            currentPage: 1,
            pageSize: 30
        });

        if (!res.success) {
            return new Error();
        }
        setPredictArticleList(res.data.posts);
        setArticleLength(res.data.totalArticle);
        setTotalPage(res.data.totalPage);
        setIsNoData(res.data.totalArticle === 0);
    };

    const goArticleDetail = (id: number) => {
        router.push(`/master/article/${id}`);
    };

    const loadMoreList = () => {
        if (currentPage <= Math.round(predictArticleList.length / 30) && currentPage < totalPage) {
            setCurrentPage(prevData => prevData + 1);
        }
    };

    const goPayment = () => {
        setIsOpenRecharge(false);
        router.push('/userInfo/subscribe');
    };

    const isOpenDialog = async (item: RecommendPost) => {
        if (!isLogin) {
            setIsOpenPaid(false);
            router.push(`/master/masterAvatar/${params.masterId}?status=analysis&auth=login`);
            return;
        }

        if (isVip.planId === 1) {
            const res = await payForPost({ postId: item.id });

            if (!res.success) {
                return new Error();
            }
            router.push(`/master/article/${item.id}`);
            return;
        }
        setIsOpenPaid(true);
        setArticleInfo(item);
    };

    const onSubmit = async () => {
        if (userInfo.balance < articleInfo.price) {
            setIsOpenPaid(false);
            setIsOpenRecharge(true);
            return;
        }

        const res = await payForPost({ postId: Number(articleInfo.id) });

        if (!res.success) {
            return new Error();
        }
        setIsOpenPaid(false);
        void fetchResetData();
        void getUser();
    };

    const getUser = async () => {
        const res = await getMemberInfo();
        if (!res.success) {
            return new Error();
        }
        setUserInfo(res.data);
    };

    useEffect(() => {
        void fetchData();
    }, [currentPage]);

    return (
        <>
            {predictArticleList.length === 0 && isNoData === null && <SkeletonLayout />}

            {predictArticleList.length === 0 && isNoData ? (
                <NoData text="暂无资料" />
            ) : (
                <ul className={style.article}>
                    {predictArticleList.map(item => {
                        return (
                            <div
                                className={style.analysisItem}
                                key={item.id}
                                onClick={() => {
                                    goArticleDetail(item.id);
                                }}
                            >
                                <div className={style.top}>
                                    <div className={style.left}>
                                        <div className={style.decorate} />
                                        <div className={style.title}>{item.analysisTitle}</div>
                                    </div>
                                    <div className={style.unlockStatus}>
                                        {item.isUnlocked ? (
                                            <span className={style.unlocked}>已解鎖</span>
                                        ) : (
                                            <UnlockButton
                                                handleClick={() => {
                                                    void isOpenDialog(item);
                                                }}
                                                price={item.price}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className={style.mid}>
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
                    {currentPage < totalPage ? (
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
            <ConfirmPayDrawer
                isOpen={isOpenPaid}
                onClose={() => {
                    setIsOpenPaid(false);
                }}
                onOpen={() => {
                    setIsOpenPaid(true);
                }}
                onPay={onSubmit}
                price={articleInfo.price}
            />
            <NormalDialog
                cancelText="取消"
                confirmText="去充值"
                content={<div>余额不足，请充值</div>}
                onClose={() => {
                    setIsOpenRecharge(false);
                }}
                onConfirm={goPayment}
                openDialog={isOpenRecharge}
            />
        </>
    );
}

export default AnalysisItem;
