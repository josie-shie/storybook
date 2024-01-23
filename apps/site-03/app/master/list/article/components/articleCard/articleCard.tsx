'use client';

import { IconFlame } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { timestampToMonthDay, timestampToString } from 'lib';
import type { RecommendPost } from 'data-center';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { payForPost, getMemberInfo } from 'data-center';
// import UnlockButton from '@/components/unlockButton/unlockButton';
import Tag from '@/components/tag/tag';
import TagSplit from '@/components/tagSplit/tagSplit';
import Avatar from '@/components/avatar/avatar';
import NormalDialog from '@/components/normalDialog/normalDialog';
import { useUserStore } from '@/store/userStore';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import Win from '../../img/win.png';
import Lose from '../../img/lose.png';
import Draw from '../../img/draw.png';
import Eye from './img/eye.svg';
import LockOpen from './img/lockOpen.svg';
import LockOpenBlue from './img/lockOpenBlue.svg';
import style from './articleCard.module.scss';
import Wallet from './img/wallet.png';

function ArticleCard({ article }: { article: RecommendPost }) {
    const [isOpenPaid, setIsOpenPaid] = useState(false);
    const [isOpenRecharge, setIsOpenRecharge] = useState(false);

    const router = useRouter();

    const userInfo = useUserStore.use.userInfo();
    const setUserInfo = useUserStore.use.setUserInfo();
    const isVip = useUserStore.use.memberSubscribeStatus();
    const isLogin = useUserStore.use.isLogin();

    const getUser = async () => {
        const res = await getMemberInfo();
        if (!res.success) {
            return new Error();
        }
        setUserInfo(res.data);
    };

    const onSubmit = async () => {
        if (userInfo.balance < article.price) {
            setIsOpenPaid(false);
            setIsOpenRecharge(true);
            return;
        }

        const res = await payForPost({ postId: Number(article.id) });

        if (!res.success) {
            return new Error();
        }
        goArticleDetail();
        void getUser();
        setIsOpenPaid(false);
    };

    const goSubscribe = () => {
        setIsOpenRecharge(false);
        router.push('/userInfo/subscribe');
    };

    const goArticleDetail = () => {
        setIsOpenPaid(false);
        router.push(`/master/articleDetail/${article.id}`);
    };

    const isOpenDialog = async () => {
        if (!isLogin) {
            setIsOpenPaid(false);
            router.push(`/master/article/?auth=login`);
            return;
        }

        if (isVip.planId === 1) {
            const res = await payForPost({ postId: article.id });

            if (!res.success) {
                return new Error();
            }
            router.push(`/master/articleDetail/${article.id}`);
            return;
        }
        setIsOpenPaid(true);
    };

    return (
        <>
            <li className={style.articleCard}>
                {article.predictionResult === 'WIN' && (
                    <div className={style.result}>
                        <Image alt="" height={27} src={Win} width={27} />
                    </div>
                )}
                {article.predictionResult === 'LOSE' && (
                    <div className={style.result}>
                        <Image alt="" height={27} src={Lose} width={27} />
                    </div>
                )}
                {article.predictionResult === 'DRAW' && (
                    <div className={style.result}>
                        <Image alt="" height={27} src={Draw} width={27} />
                    </div>
                )}

                {(article.isUnlocked || article.price === 0) && (
                    <div className={style.unlockStatus}>
                        <span className={style.unlocked}>
                            <LockOpenBlue width={16} height={16} />
                        </span>
                    </div>
                )}

                <div className={style.user}>
                    <Link
                        className={style.avatarContainer}
                        href={`/master/masterAvatar/${article.mentorId}?status=analysis`}
                    >
                        <Avatar borderColor="#4489FF" src={article.avatarPath} />
                    </Link>
                    <div className={style.userInfo}>
                        <Link
                            className={style.userName}
                            href={`/master/masterAvatar/${article.mentorId}?status=analysis`}
                        >
                            {article.mentorName}
                        </Link>
                        <div className={style.tagsContainer}>
                            {/* <Tag
                                background="#f3f3f3"
                                borderColor="#bfbfbf"
                                color="#8d8d8d"
                                text={`總進球 ${article.tag.winMaxAccurateStreak}場`}
                            />
                            <Tag
                                background="#f3f3f3"
                                borderColor="#bfbfbf"
                                color="#8d8d8d"
                                text={`勝負 ${article.tag.winMaxAccurateStreak}場`}
                            /> */}
                            {article.tag.winMaxAccurateStreak > 0 && (
                                <Tag
                                    icon={<IconFlame size={10} />}
                                    text={`${article.tag.winMaxAccurateStreak} 連紅`}
                                />
                            )}
                            {article.tag.quarterRanking > 0 && (
                                <TagSplit
                                    isBlueBg={false}
                                    number={article.tag.quarterRanking}
                                    text="季"
                                />
                            )}
                            {article.tag.monthRanking > 0 && (
                                <TagSplit
                                    isBlueBg={false}
                                    number={article.tag.monthRanking}
                                    text="月"
                                />
                            )}
                            {article.tag.weekRanking > 0 && (
                                <TagSplit
                                    isBlueBg={false}
                                    number={article.tag.weekRanking}
                                    text="周"
                                />
                            )}
                        </div>
                    </div>
                    <div className={style.rate}>
                        <span className={style.hit}>
                            {article.weekHitRate}
                            <i>%</i>
                        </span>
                        {article.lastTenAnalysisWinCountStr && (
                            <span className={style.hitName}>
                                {article.lastTenAnalysisWinCountStr}
                            </span>
                        )}
                    </div>
                </div>

                <Link href={`/master/articleDetail/${article.id}`}>
                    <div className={style.game}>
                        <div className={style.leagueTeam}>
                            <span>{article.leagueName}</span>
                            <span className={style.line}>|</span>
                            <span>
                                {article.homeTeamName}VS{article.awayTeamName}
                            </span>
                        </div>
                        <div className={style.title}>{article.analysisTitle}</div>
                    </div>
                </Link>
                <div className={style.postTime}>
                    <span>发表于今天 {timestampToMonthDay(article.createdAt)}</span>
                    <div className={style.seen}>
                        <span>
                            <Eye />
                            9999
                        </span>
                        <span className={style.line}>|</span>
                        <span>
                            <LockOpen />
                            {article.unlockCounts}
                        </span>
                    </div>
                </div>
            </li>
            <ConfirmPayDrawer
                isOpen={isOpenPaid}
                onClose={() => {
                    setIsOpenPaid(false);
                }}
                onOpen={() => {
                    setIsOpenPaid(true);
                }}
                onPay={onSubmit}
                price={article.price}
            />
            <NormalDialog
                confirmText="去充值"
                content={<div>余额不足，请充值</div>}
                onClose={() => {
                    setIsOpenRecharge(false);
                }}
                onConfirm={goSubscribe}
                openDialog={isOpenRecharge}
                srcImage={Wallet}
            />
        </>
    );
}

export default ArticleCard;
