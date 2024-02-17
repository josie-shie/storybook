'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { timestampToTodayTime } from 'lib';
import type { RecommendPost } from 'data-center';
import Link from 'next/link';
import { payForPost, getMemberInfo } from 'data-center';
import Tag from '@/components/tag/tag';
import TagSplit from '@/components/tagSplit/tagSplit';
import Avatar from '@/components/avatar/avatar';
import NormalDialog from '@/components/normalDialog/normalDialog';
import { useUserStore } from '@/store/userStore';
import ConfirmPayDrawer from '@/components/confirmPayDrawer/confirmPayDrawer';
import Win from '../../img/win.svg';
import Lose from '../../img/lose.svg';
import Draw from '../../img/draw.svg';
import Eye from './img/eye.svg';
import LockOpen from './img/lockOpen.svg';
import LockOpenBlue from './img/lockOpenBlue.svg';
import Fire from './img/fire.svg';
import style from './articleCard.module.scss';
import Wallet from './img/wallet.png';

function ArticleCard({ article }: { article: RecommendPost }) {
    const [isOpenPaid, setIsOpenPaid] = useState(false);
    const [isOpenRecharge, setIsOpenRecharge] = useState(false);

    const router = useRouter();

    const userInfo = useUserStore.use.userInfo();
    const setUserInfo = useUserStore.use.setUserInfo();

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

    const showHandicap =
        article.mentorArticleCount.predictedPlay === 'HANDICAP' &&
        article.mentorArticleCount.counts >= 10;
    const showOverUnder =
        article.mentorArticleCount.predictedPlay === 'OVERUNDER' &&
        article.mentorArticleCount.counts >= 10;

    const getTagsToShow = (): JSX.Element[] => {
        const tagsData = [
            showHandicap || showOverUnder ? (
                <Tag
                    background="#f3f3f3"
                    borderColor="#bfbfbf"
                    color="#8d8d8d"
                    key="playType"
                    text={`${getText(article.mentorArticleCount.predictedPlay)} ${
                        article.mentorArticleCount.counts
                    }场`}
                />
            ) : null,
            article.tag.winMaxAccurateStreak > 0 ? (
                <Tag
                    icon={<Fire size={10} />}
                    key="winStreak"
                    text={`${article.tag.winMaxAccurateStreak} 连红`}
                />
            ) : null,
            article.tag.weekHitRecentTen > 5 ? (
                <TagSplit
                    hit
                    isBlueBg={false}
                    key="hitTen"
                    number={article.tag.weekHitRecentTen}
                    text="近"
                />
            ) : null,
            article.tag.quarterRanking > 0 ? (
                <TagSplit
                    isBlueBg={false}
                    key="quarter"
                    number={article.tag.quarterRanking}
                    text="季"
                />
            ) : null,
            article.tag.monthRanking > 0 ? (
                <TagSplit
                    isBlueBg={false}
                    key="month"
                    number={article.tag.monthRanking}
                    text="月"
                />
            ) : null,
            article.tag.weekRanking > 0 ? (
                <TagSplit isBlueBg={false} key="week" number={article.tag.weekRanking} text="周" />
            ) : null
        ];

        const filteredTags = tagsData.filter(Boolean) as JSX.Element[];

        return filteredTags.slice(0, 3);
    };

    return (
        <>
            <li className={style.articleCard}>
                {article.predictionResult === 'WIN' && (
                    <div className={style.result}>
                        <Win />
                    </div>
                )}
                {article.predictionResult === 'LOSE' && (
                    <div className={style.result}>
                        <Lose />
                    </div>
                )}
                {article.predictionResult === 'DRAW' && (
                    <div className={style.result}>
                        <Draw />
                    </div>
                )}

                {article.isUnlocked || article.price === 0 ? (
                    <div className={style.unlockStatus}>
                        <span className={style.unlocked}>
                            <LockOpenBlue height={16} width={16} />
                        </span>
                    </div>
                ) : null}

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
                        <div className={style.tagsContainer}>{getTagsToShow()}</div>
                    </div>
                    <div className={style.rate}>
                        <span className={style.hit}>
                            {parseFloat(article.tag.weekHitRateDisplay).toFixed(1)}
                            <i>%</i>
                        </span>
                        <span className={style.hitName}>命中率</span>
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
                    <span>{timestampToTodayTime(article.createdAt)}</span>
                    {article.seenCounts || article.unlockCounts ? (
                        <div className={style.seen}>
                            {article.seenCounts ? (
                                <>
                                    <span>
                                        <Eye />
                                        {article.seenCounts}
                                    </span>
                                    <span className={style.line}>|</span>
                                </>
                            ) : null}
                            {article.unlockCounts ? (
                                <span>
                                    <LockOpen />
                                    {article.unlockCounts}
                                </span>
                            ) : null}
                        </div>
                    ) : null}
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
