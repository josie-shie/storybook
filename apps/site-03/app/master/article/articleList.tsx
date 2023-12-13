'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IconFlame } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { timestampToMonthDay, timestampToString } from 'lib';
import { getPostList } from 'data-center';
import WeekButton from '../components/weekButton/weekButton';
import { useArticleStore } from './articleStore';
import style from './articleList.module.scss';
import Win from './img/win.png';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import UnlockButton from '@/components/unlockButton/unlockButton';

function ArticleItem() {
    const router = useRouter();

    const articleList = useArticleStore.use.articleList();

    const goInfo = () => {
        router.push('/recommend/predict/masterAvatar?status=analysis');
    };

    return (
        <>
            {articleList.map(item => {
                return (
                    <div className={style.articleItem} key={item.id}>
                        <div className={style.user}>
                            <div className={style.avatarContainer} onClick={goInfo}>
                                <Avatar borderColor="#4489FF" src={item.avatarPath} />
                            </div>
                            <div className={style.userInfo}>
                                <div className={style.userName}>{item.mentorName}</div>
                                <div className={style.tagsContainer}>
                                    {item.tag.winHistoryMaxWinStreak > 0 && (
                                        <Tag
                                            icon={<IconFlame size={10} />}
                                            text={`${item.tag.winHistoryMaxWinStreak}連紅`}
                                        />
                                    )}
                                    {item.tag.quarterRanking > 0 && (
                                        <Tag
                                            background="#4489FF"
                                            text={`季榜 ${item.tag.quarterRanking}`}
                                        />
                                    )}
                                    {item.tag.monthRanking > 0 && (
                                        <Tag
                                            background="#4489FF"
                                            text={`月榜 ${item.tag.monthRanking}`}
                                        />
                                    )}
                                    {item.tag.weekRanking > 0 && (
                                        <Tag
                                            background="#4489FF"
                                            text={`周榜 ${item.tag.weekRanking}`}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={style.unlockStatus}>
                                {item.isUnlocked ? (
                                    <span className={style.unlocked}>已解鎖</span>
                                ) : (
                                    <>
                                        <UnlockButton />
                                        <span className={style.unlockNumber}>
                                            已有{item.unlockCounts}人解鎖
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={style.title}>{item.analysisTitle}</div>
                        <Link href={`/master/article/${item.id}`}>
                            <div className={style.game}>
                                <div className={style.detail}>
                                    {item.leagueName}
                                    <span className={style.time}>
                                        | {timestampToString(item.matchTime, 'MM-DD HH:mm')}
                                    </span>
                                </div>
                                <div className={style.teamName}>
                                    <span className={style.play}>大小</span>
                                    <div className={style.combination}>
                                        {item.homeTeamName} vs {item.awayTeamName}
                                    </div>
                                </div>
                                {item.predictionResult === 'WIN' && (
                                    <Image alt="" height={36} src={Win} width={36} />
                                )}
                            </div>
                        </Link>
                        <div className={style.postTime}>
                            发表于今天 {timestampToMonthDay(item.createdAt)}
                        </div>
                    </div>
                );
            })}
        </>
    );
}

function ArticleList() {
    const [isActive, setIsActive] = useState<number[]>([]);

    const setArticleList = useArticleStore.use.setArticleList();

    const updateActive = (value: number) => {
        setIsActive(current => {
            const isExist = current.includes(value);
            if (isExist) {
                return current.filter(item => item !== value);
            }
            return [...current, value];
        });
    };

    const fetchData = async () => {
        try {
            const res = await getPostList({
                memberId: 250,
                postFilter: 'all'
            });

            if (!res.success) {
                return new Error();
            }
            setArticleList({ articleList: res.data.posts });
        } catch (error) {
            return new Error();
        }
    };

    useEffect(() => {
        void fetchData();
    }, []);

    return (
        <>
            <div className={style.button}>
                <WeekButton isActive={isActive} updateActive={updateActive} />
            </div>
            <div className={style.article}>
                <ArticleItem />
            </div>
        </>
    );
}

export default ArticleList;
