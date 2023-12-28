'use client';

import Image from 'next/image';
import { useState } from 'react';
import { timestampToString, timestampToMonthDay } from 'lib';
import { type RecommendPost } from 'data-center';
import { useRouter } from 'next/navigation';
import { payForPost, getMemberInfo } from 'data-center';
import NoData from '@/components/baseNoData/noData';
import UnlockButton from '@/components/unlockButton/unlockButton';
import { useUserStore } from '@/app/userStore';
import NormalDialog from '@/components/normalDialog/normalDialog';
import ConfirmPayArticle from '../components/confirmPayArticle/confirmPayArticle';
import style from './recommendationList.module.scss';
import Win from './img/win.png';
import Draw from './img/draw.png';
import SkeletonLayout from './components/skeleton';

function RecommendationItem({
    recommendationList,
    isNoData,
    params
}: {
    recommendationList: RecommendPost[];
    isNoData: boolean | null;
    params: { articleId: string };
}) {
    const [isOpenPaid, setIsOpenPaid] = useState(false);
    const [isOpenRecharge, setIsOpenRecharge] = useState(false);
    const [articleInfo, setArticleInfo] = useState({} as RecommendPost);

    const isVip = useUserStore.use.memberSubscribeStatus();
    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();
    const setUserInfo = useUserStore.use.setUserInfo();

    const router = useRouter();

    const formatHandicapName = {
        HOME: '让分',
        AWAY: '让分',
        UNDER: '大小',
        OVER: '大小',
        HANDICAP: '大小',
        OVERUNDER: '让分'
    };

    const isOpenDialog = async (item: RecommendPost) => {
        if (!isLogin) {
            router.push(`/master/article/${params.articleId}?auth=login`);
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

    const getUser = async () => {
        const res = await getMemberInfo();
        if (!res.success) {
            return new Error();
        }
        setUserInfo(res.data);
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
        goArticleDetail();
        void getUser();
        setIsOpenPaid(false);
    };

    const goArticleDetail = () => {
        setIsOpenPaid(false);
        router.push(`/master/article/${articleInfo.id}`);
    };

    const goPayment = () => {
        setIsOpenRecharge(false);
        router.push('/userInfo/subscribe');
    };

    const goArticle = (id: number) => {
        router.push(`/master/article/${id}`);
    };

    return (
        <>
            {recommendationList.length === 0 && isNoData === null && <SkeletonLayout />}

            {recommendationList.length === 0 && isNoData ? (
                <NoData />
            ) : (
                <>
                    {recommendationList.map(item => {
                        return (
                            <div
                                className={style.item}
                                key={item.id}
                                onClick={() => {
                                    goArticle(item.id);
                                }}
                            >
                                <div className={style.left}>
                                    <div className={style.time}>
                                        发表于今天 {timestampToMonthDay(item.createdAt)}
                                    </div>
                                    <div className={style.leagueName}>
                                        <span className={style.name}>{item.leagueName}</span>
                                        <span className={style.time}>
                                            | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                                        </span>
                                    </div>
                                    <div className={style.teamName}>
                                        <span className={style.play}>
                                            {formatHandicapName[item.predictedPlay]}
                                        </span>
                                        <span className={style.name}>
                                            {item.homeTeamName} vs {item.awayTeamName}
                                        </span>
                                        {item.predictionResult === 'WIN' && (
                                            <Image alt="" height={36} src={Win} width={36} />
                                        )}
                                        {item.predictionResult === 'DRAW' && (
                                            <Image alt="" height={36} src={Draw} width={36} />
                                        )}
                                    </div>
                                </div>
                                <div className={style.right}>
                                    {!item.isUnlocked && item.price !== 0 ? (
                                        <UnlockButton
                                            handleClick={() => {
                                                void isOpenDialog(item);
                                            }}
                                            price={item.price}
                                        />
                                    ) : (
                                        <div className={style.unlockMember}>已解鎖</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
            <NormalDialog
                cancelText="取消"
                confirmText="確認支付"
                content={<ConfirmPayArticle price={articleInfo.price} />}
                onClose={() => {
                    setIsOpenPaid(false);
                }}
                onConfirm={onSubmit}
                openDialog={isOpenPaid}
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

export default RecommendationItem;
