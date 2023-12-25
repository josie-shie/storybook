'use client';

import { IconFlame } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { timestampToMonthDay, timestampToString } from 'lib';
import type { RecommendPost } from 'data-center';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { payForPost, getMemberInfo } from 'data-center';
import UnlockButton from '@/components/unlockButton/unlockButton';
import Tag from '@/components/tag/tag';
import Avatar from '@/components/avatar/avatar';
import NormalDialog from '@/components/normalDialog/normalDialog';
import { useUserStore } from '@/app/userStore';
import Win from '../../img/win.png';
import ConfirmPayArticle from '../confirmPayArticle/confirmPayArticle';
import style from './articleCard.module.scss';

function ArticleCard({ article }: { article: RecommendPost }) {
    const [isOpenPaid, setIsOpenPaid] = useState(false);
    const [isOpenRecharge, setIsOpenRecharge] = useState(false);
    const router = useRouter();
    const goMasterPredict = (id: number) => {
        router.push(`/master/masterAvatar/${id}?status=analysis`);
    };
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
        try {
            const res = await payForPost({ postId: Number(article.id) });

            if (!res.success) {
                return new Error();
            }
            goArticleDetail();
            void getUser();
        } catch (error) {
            return new Error();
        } finally {
            setIsOpenPaid(false);
        }
    };

    const goSubscribe = () => {
        setIsOpenRecharge(false);
        router.push('/userInfo/subscribe');
    };

    const goArticleDetail = () => {
        setIsOpenPaid(false);
        router.push(`/master/article/${article.id}`);
    };

    return (
        <div className="div">
            <li className={style.articleCard}>
                <div className={style.user}>
                    <div
                        className={style.avatarContainer}
                        onClick={() => {
                            goMasterPredict(article.mentorId);
                        }}
                    >
                        <Avatar borderColor="#4489FF" src={article.avatarPath} />
                    </div>
                    <div className={style.userInfo}>
                        <div className={style.userName}>{article.mentorName}</div>
                        <div className={style.tagsContainer}>
                            {article.tag.winMaxAccurateStreak > 0 && (
                                <Tag
                                    icon={<IconFlame size={10} />}
                                    text={`${article.tag.winMaxAccurateStreak} 連紅`}
                                />
                            )}
                            {article.tag.weekRanking > 0 && (
                                <Tag
                                    background="#4489FF"
                                    text={`周榜 ${article.tag.weekRanking}`}
                                />
                            )}
                            {article.tag.monthRanking > 0 && (
                                <Tag
                                    background="#4489FF"
                                    text={`月榜 ${article.tag.monthRanking}`}
                                />
                            )}
                            {article.tag.quarterRanking > 0 && (
                                <Tag
                                    background="#4489FF"
                                    text={`季榜 ${article.tag.quarterRanking}`}
                                />
                            )}
                        </div>
                    </div>
                    <div className={style.unlockStatus}>
                        {article.isUnlocked ? (
                            <span className={style.unlocked}>已解鎖</span>
                        ) : (
                            <>
                                <UnlockButton
                                    handleClick={() => {
                                        setIsOpenPaid(true);
                                    }}
                                    price={article.price}
                                />
                                <span className={style.unlockNumber}>
                                    已有{article.unlockCounts}人解鎖
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className={style.title}>{article.analysisTitle}</div>
                <Link href={`/master/article/${article.id}`}>
                    <div className={style.game}>
                        <div className={style.detail}>
                            {article.leagueName}
                            <span className={style.time}>
                                | {timestampToString(article.matchTime, 'MM-DD HH:mm')}
                            </span>
                        </div>
                        <div className={style.teamName}>
                            <span className={style.play}>大小</span>
                            <div className={style.combination}>
                                {article.homeTeamName} vs {article.awayTeamName}
                            </div>
                        </div>
                        {article.predictionResult === 'WIN' && (
                            <Image alt="" height={36} src={Win} width={36} />
                        )}
                    </div>
                </Link>
                <div className={style.postTime}>
                    发表于今天 {timestampToMonthDay(article.createdAt)}
                </div>
            </li>
            <NormalDialog
                cancelText="取消"
                confirmText="確認支付"
                content={<ConfirmPayArticle price={article.price} />}
                onClose={() => {
                    setIsOpenPaid(false);
                }}
                onConfirm={onSubmit}
                openDialog={isOpenPaid}
            />
            <NormalDialog
                cancelText="取消"
                confirmText="去订阅"
                content={<div>余额不足，请订阅</div>}
                onClose={() => {
                    setIsOpenRecharge(false);
                }}
                onConfirm={goSubscribe}
                openDialog={isOpenRecharge}
            />
        </div>
    );
}

export default ArticleCard;
