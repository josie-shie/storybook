'use client';

import Image from 'next/image';
import { useState } from 'react';
import { timestampToString, timestampToMonthDay } from 'lib';
import { type RecommendPost } from 'data-center';
import { useRouter } from 'next/navigation';
import { payForPost, getMemberInfo } from 'data-center';
import Tag from '@/components/tag/tag';
import NoData from '@/components/baseNoData/noData';
import UnlockButton from '@/components/unlockButton/unlockButton';
import { useUserStore } from '@/store/userStore';
import NormalDialog from '@/components/normalDialog/normalDialog';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import style from './recommendationList.module.scss';
import Win from './img/win.png';
import Draw from './img/draw.png';
import Eye from './img/eye.svg';
import LockOpenBlue from './img/lockOpenBlue.svg';
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
            router.push(`/master/articleDetail/${params.articleId}?auth=login`);
            return;
        }

        if (isVip.planId === 1) {
            const res = await payForPost({ postId: item.id });

            if (!res.success) {
                return new Error();
            }
            router.push(`/master/articleDetail/${item.id}`);
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
        router.push(`/master/articleDetail/${articleInfo.id}`);
    };

    const goPayment = () => {
        setIsOpenRecharge(false);
        router.push('/userInfo/subscribe');
    };

    const goArticle = (id: number) => {
        router.push(`/master/articleDetail/${id}`);
    };

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

    return (
        <>
            {recommendationList.length === 0 && isNoData === null && <SkeletonLayout />}

            {recommendationList.length === 0 && isNoData ? (
                <NoData text="暂无资料" />
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
                                {item.predictionResult === 'WIN' && (
                                    <Image
                                        alt=""
                                        className={style.icon}
                                        height={27}
                                        src={Win}
                                        width={27}
                                    />
                                )}
                                {item.predictionResult === 'DRAW' && (
                                    <Image
                                        alt=""
                                        className={style.icon}
                                        height={27}
                                        src={Draw}
                                        width={27}
                                    />
                                )}
                                <div className={style.left}>
                                    <div className={style.name}>
                                        {item.mentorArticleCount.predictedPlay === 'HANDICAP' &&
                                            item.mentorArticleCount.counts >= 10 && (
                                                <Tag
                                                    background="#f3f3f3"
                                                    borderColor="#bfbfbf"
                                                    color="#8d8d8d"
                                                    text={`${getText(
                                                        item.mentorArticleCount.predictedPlay
                                                    )}`}
                                                />
                                            )}
                                        {item.mentorArticleCount.predictedPlay === 'OVERUNDER' &&
                                            item.mentorArticleCount.counts >= 10 && (
                                                <Tag
                                                    background="#f3f3f3"
                                                    borderColor="#bfbfbf"
                                                    color="#8d8d8d"
                                                    text={`${getText(
                                                        item.mentorArticleCount.predictedPlay
                                                    )}`}
                                                />
                                            )}
                                        <span>{item.mentorName}</span>
                                    </div>

                                    <div className={style.leagueName}>
                                        <span className={style.name}>{item.leagueName}</span>
                                        <span>|</span>
                                        <span className={style.teamName}>
                                            {item.homeTeamName}VS{item.awayTeamName}
                                        </span>
                                    </div>

                                    <div className={style.content}>{item.analysisTitle}</div>

                                    <div className={style.seeDetail}>
                                        <div className={style.time}>
                                            发表于今天 {timestampToMonthDay(item.createdAt)}
                                        </div>
                                        {item.seenCounts || item.unlockCounts ? (
                                            <div className={style.seen}>
                                                {item.seenCounts ? (
                                                    <>
                                                        <span>
                                                            <Eye />
                                                            {item.seenCounts}
                                                        </span>
                                                        <span className={style.line}>|</span>
                                                    </>
                                                ) : null}
                                                {item.unlockCounts ? (
                                                    <span>
                                                        <LockOpenBlue />
                                                        {item.unlockCounts}
                                                    </span>
                                                ) : null}
                                            </div>
                                        ) : null}
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

export default RecommendationItem;
