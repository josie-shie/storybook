'use client';

import { IconFlame } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { timestampToMonthDay, timestampToString } from 'lib';
import type { RecommendPost } from 'data-center';
import Image from 'next/image';
import Link from 'next/link';
import UnlockButton from '@/components/unlockButton/unlockButton';
import Tag from '@/components/tag/tag';
import Avatar from '@/components/avatar/avatar';
import Win from '../../img/win.png';
import style from './articleCard.module.scss';

function ArticleCard({ article }: { article: RecommendPost }) {
    const router = useRouter();
    const goMasterPredict = (id: number) => {
        router.push(`/master/masterAvatar/${id}?status=analysis`);
    };
    return (
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
                            <Tag background="#4489FF" text={`周榜 ${article.tag.weekRanking}`} />
                        )}
                        {article.tag.monthRanking > 0 && (
                            <Tag background="#4489FF" text={`月榜 ${article.tag.monthRanking}`} />
                        )}
                        {article.tag.quarterRanking > 0 && (
                            <Tag background="#4489FF" text={`季榜 ${article.tag.quarterRanking}`} />
                        )}
                    </div>
                </div>
                <div className={style.unlockStatus}>
                    {article.isUnlocked ? (
                        <span className={style.unlocked}>已解鎖</span>
                    ) : (
                        <>
                            <UnlockButton price={article.price} />
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
    );
}

export default ArticleCard;
