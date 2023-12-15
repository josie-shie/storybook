'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IconFlame } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { timestampToMonthDay, timestampToString } from 'lib';
import { getPostList } from 'data-center';
import { type PostFilter, type RecommendPost } from 'data-center';
import { InfiniteScroll } from 'ui';
import CircularProgress from '@mui/material/CircularProgress';
import WeekButton from '../components/weekButton/weekButton';
import style from './articleList.module.scss';
import Win from './img/win.png';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import UnlockButton from '@/components/unlockButton/unlockButton';
import { useUserStore } from '@/app/userStore';

interface ArticleItemProps {
    loadMoreList: () => void;
    articleList: RecommendPost[];
    currentPage: number;
    totalPage: number;
}

function ArticleItem({ loadMoreList, articleList, currentPage, totalPage }: ArticleItemProps) {
    const router = useRouter();

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
                                    {item.tag.winMaxAccurateStreak > 0 && (
                                        <Tag
                                            icon={<IconFlame size={10} />}
                                            text={`${item.tag.winMaxAccurateStreak}連紅`}
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
            {currentPage <= totalPage && (
                <InfiniteScroll onVisible={loadMoreList}>
                    <div className={style.loadMore}>
                        <CircularProgress size={24} />
                    </div>
                </InfiniteScroll>
            )}
        </>
    );
}

function ArticleList() {
    const [isActive, setIsActive] = useState<PostFilter[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [articleList, setArticleList] = useState<RecommendPost[]>([]);

    const userInfo = useUserStore.use.userInfo();

    const updateActive = (value: PostFilter) => {
        setIsActive(current => {
            const isExist = current.includes(value);
            if (isExist) {
                return current.filter(item => item !== value);
            }
            return [...current, value];
        });
        setArticleList([]);
        setCurrentPage(1);
        void fetchData();
    };

    const fetchData = async () => {
        try {
            const res = await getPostList({
                memberId: userInfo.uid,
                filterId: [],
                postFilter: isActive.length === 0 ? ['all'] : isActive,
                currentPage,
                pageSize: 30
            });

            if (!res.success) {
                return new Error();
            }
            setArticleList(prevData => [...prevData, ...res.data.posts]);
            setTotalPage(res.data.totalPage);
        } catch (error) {
            return new Error();
        }
    };

    const loadMoreList = () => {
        if (currentPage <= Math.round(articleList.length / 30) && currentPage <= totalPage) {
            setCurrentPage(prevData => prevData + 1);
        }
    };

    useEffect(() => {
        if (userInfo.uid) {
            void fetchData();
        }
    }, [userInfo.uid, currentPage]);

    return (
        <>
            <div className={style.button}>
                <WeekButton isActive={isActive} updateActive={updateActive} />
            </div>
            <div className={style.article}>
                <ArticleItem
                    articleList={articleList}
                    currentPage={currentPage}
                    loadMoreList={loadMoreList}
                    totalPage={totalPage}
                />
            </div>
        </>
    );
}

export default ArticleList;
