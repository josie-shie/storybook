'use client';
import { unFollow, updateFollow } from 'data-center';
import { type GetPostDetailResponse, GetMemberProfileWithMemberIdResponse } from 'data-center';
import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import TagSplit from '@/components/tagSplit/tagSplit';
import Fire from '@/app/img/fire.png';
import User from './img/user.svg';
import LockOpen from './img/lockOpen.svg';
import { useUserStore } from '@/store/userStore';
import style from './info.module.scss';
import { truncateFloatingPoint } from 'lib';
import Skeleton from './components/infoSkeleton/skeleton';

interface InfoProps {
    article: GetPostDetailResponse;
    info: GetMemberProfileWithMemberIdResponse;
    isNoInfoData: boolean;
    setArticle: Dispatch<SetStateAction<GetPostDetailResponse>>;
}

function Info({ article, info, isNoInfoData, setArticle }: InfoProps) {
    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();

    const router = useRouter();

    const onIsFocused = async (id: number, follow: boolean) => {
        if (!isLogin) {
            router.push(`/master/masterAvatar/${article.id}?status=analysis&auth=login?auth=login`);
            return;
        }
        const res = follow
            ? await unFollow({ followerId: userInfo.uid, followedId: id })
            : await updateFollow({ followerId: userInfo.uid, followedId: id });
        if (!res.success) {
            return new Error();
        }

        setArticle(prevData => ({
            ...prevData,
            followed: !prevData.followed
        }));
    };

    const goMasterPredict = (id: number) => {
        router.push(`/master/masterAvatar/${id}?status=analysis`);
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
        info.mentorArticleCount.predictedPlay === 'HANDICAP' &&
        info.mentorArticleCount.counts >= 10;
    const showOverUnder =
        info.mentorArticleCount.predictedPlay === 'OVERUNDER' &&
        info.mentorArticleCount.counts >= 10;

    return (
        <>
            {!isNoInfoData ? (
                <section className={style.info}>
                    <div className={style.detail}>
                        <div
                            onClick={() => {
                                goMasterPredict(article.mentorId);
                            }}
                        >
                            <Avatar
                                borderColor="#fff"
                                size={54}
                                src={info.avatarPath === '0' ? '' : info.avatarPath}
                            />
                        </div>
                        <div className={style.content}>
                            <div className={style.top}>
                                <span className={style.name}>{article.mentorName}</span>
                            </div>
                            <div className={style.tagsContainer}>
                                {showHandicap && (
                                    <Tag
                                        background="rgba(255, 255, 255, 0.30)"
                                        borderColor="#6e94d4"
                                        text={`${getText(info.mentorArticleCount.predictedPlay)} ${
                                            info.mentorArticleCount.counts
                                        }場`}
                                    />
                                )}
                                {showOverUnder && (
                                    <Tag
                                        background="rgba(255, 255, 255, 0.30)"
                                        borderColor="#6e94d4"
                                        text={`${getText(info.mentorArticleCount.predictedPlay)} ${
                                            info.mentorArticleCount.counts
                                        }場`}
                                    />
                                )}

                                {info.highlights.winMaxAccurateStreak > 0 && (
                                    <Tag
                                        icon={<Image alt="fire" src={Fire} />}
                                        text={`${info.highlights.winMaxAccurateStreak} 連紅`}
                                    />
                                )}
                                {info.highlights.quarterRanking > 0 && (
                                    <TagSplit
                                        isBlueBg
                                        border={false}
                                        number={info.highlights.quarterRanking}
                                        textBackground="rgba(255, 255, 255, 0.30)"
                                        textColor="#fff"
                                        text="季"
                                    />
                                )}
                                {info.highlights.monthRanking > 0 && (
                                    <TagSplit
                                        isBlueBg
                                        border={false}
                                        number={info.highlights.monthRanking}
                                        textBackground="rgba(255, 255, 255, 0.30)"
                                        textColor="#fff"
                                        text="月"
                                    />
                                )}
                                {info.highlights.weekRanking > 0 && (
                                    <TagSplit
                                        isBlueBg
                                        border={false}
                                        number={info.highlights.weekRanking}
                                        textBackground="rgba(255, 255, 255, 0.30)"
                                        textColor="#fff"
                                        text="周"
                                    />
                                )}
                            </div>
                            <div className={style.bottom}>
                                {info.fansCount > 0 && (
                                    <span>
                                        <User />
                                        <span>粉丝</span>
                                        {info.fansCount}{' '}
                                    </span>
                                )}
                                {info.unlockedCount > 0 && (
                                    <span>
                                        <LockOpen />
                                        <span>解锁</span>
                                        {info.unlockedCount}{' '}
                                    </span>
                                )}
                                {info.hitRate > 1 && (
                                    <span>
                                        <span>猜球胜率</span>
                                        {truncateFloatingPoint(info.hitRate, 0)}%
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className={article.followed ? style.focused : style.focus}
                        onClick={() => {
                            void onIsFocused(article.mentorId, article.followed);
                        }}
                    >
                        {article.followed ? '已关注' : '关注'}
                    </div>
                </section>
            ) : (
                <Skeleton />
            )}
        </>
    );
}

export default Info;
