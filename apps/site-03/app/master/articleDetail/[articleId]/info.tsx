'use client';
import { unFollow, updateFollow } from 'data-center';
import type { GetMemberProfileWithMemberIdResponse, GetPostDetailResponse } from 'data-center';
import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { truncateFloatingPoint } from 'lib';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import TagSplit from '@/components/tagSplit/tagSplit';
import Fire from '@/app/img/fire.png';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import User from './img/user.svg';
import LockOpen from './img/lockOpen.svg';
import style from './info.module.scss';
import Skeleton from './components/infoSkeleton/skeleton';

interface InfoProps {
    article: GetPostDetailResponse;
    info: GetMemberProfileWithMemberIdResponse;
    isNoInfoData: boolean;
    setInfo: Dispatch<SetStateAction<GetMemberProfileWithMemberIdResponse>>;
}

function Info({ article, info, isNoInfoData, setInfo }: InfoProps) {
    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setAuthQuery = useUserStore.use.setAuthQuery();

    const router = useRouter();

    const onIsFocused = async (id: number, follow: boolean) => {
        if (!isLogin) {
            setAuthQuery('login');
            setIsDrawerOpen(true);
            return;
        }
        const res = follow
            ? await unFollow({ followerId: userInfo.uid, followedId: id })
            : await updateFollow({ followerId: userInfo.uid, followedId: id });
        if (!res.success) {
            return new Error();
        }

        setInfo(prevData => ({
            ...prevData,
            isFollowed: !prevData.isFollowed
        }));
    };

    const goMasterPredict = (id: number) => {
        router.push(`/master/masterAvatar/${id}?status=guess`);
    };

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
                                {info.mentorArticleCount.handicap >= 10 && (
                                    <Tag
                                        background="#f3f3f3"
                                        borderColor="#bfbfbf"
                                        color="#8d8d8d"
                                        text={`胜负${info.mentorArticleCount.handicap}場`}
                                    />
                                )}
                                {info.mentorArticleCount.overUnder >= 10 && (
                                    <Tag
                                        background="#f3f3f3"
                                        borderColor="#bfbfbf"
                                        color="#8d8d8d"
                                        text={`总进球${info.mentorArticleCount.overUnder}場`}
                                    />
                                )}
                                {info.highlights.weekHitRecentTen > 0 && (
                                    <TagSplit
                                        hit
                                        isBlueBg={false}
                                        number={info.highlights.weekHitRecentTen}
                                        text="近"
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
                                        border={false}
                                        isBlueBg
                                        number={info.highlights.quarterRanking}
                                        text="季"
                                        textBackground="rgba(255, 255, 255, 0.30)"
                                        textColor="#fff"
                                    />
                                )}
                                {info.highlights.monthRanking > 0 && (
                                    <TagSplit
                                        border={false}
                                        isBlueBg
                                        number={info.highlights.monthRanking}
                                        text="月"
                                        textBackground="rgba(255, 255, 255, 0.30)"
                                        textColor="#fff"
                                    />
                                )}
                                {info.highlights.weekRanking > 0 && (
                                    <TagSplit
                                        border={false}
                                        isBlueBg
                                        number={info.highlights.weekRanking}
                                        text="周"
                                        textBackground="rgba(255, 255, 255, 0.30)"
                                        textColor="#fff"
                                    />
                                )}
                            </div>
                            <div className={style.bottom}>
                                {info.fansCount > 0 && (
                                    <span>
                                        <User />
                                        {info.fansCount}{' '}
                                    </span>
                                )}
                                {info.unlockedCount > 0 && (
                                    <span>
                                        <LockOpen />
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
                        className={info.isFollowed ? style.focused : style.focus}
                        onClick={() => {
                            void onIsFocused(article.mentorId, info.isFollowed);
                        }}
                    >
                        {info.isFollowed ? '已关注' : '关注'}
                    </div>
                </section>
            ) : (
                <Skeleton />
            )}
        </>
    );
}

export default Info;
