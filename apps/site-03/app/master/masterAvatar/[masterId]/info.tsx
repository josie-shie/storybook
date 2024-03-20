'use client';
import { useEffect, useState } from 'react';
import {
    getMemberProfileWithMemberId,
    type GetMemberProfileWithMemberIdResponse
} from 'data-center';
import { unFollow, updateFollow } from 'data-center';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { truncateFloatingPoint } from 'lib';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import TagSplit from '@/components/tagSplit/tagSplit';
import { useUserStore } from '@/store/userStore';
import Fire from '@/app/img/fire.png';
import User from './img/user.svg';
import LockOpen from './img/lockOpen.svg';
import style from './info.module.scss';
import Skeleton from './components/skeleton/skeleton';

function Info({ params }: { params: { masterId: string } }) {
    const [info, setInfo] = useState({
        memberId: 0,
        username: '',
        avatarPath: '',
        profile: '',
        fansCount: 0,
        unlockedCount: 0,
        mentorArticleCount: {
            handicap: 0,
            overUnder: 0
        },
        hitRate: 0,
        isFollowed: false,
        highlights: {
            id: 0,
            tagName: '',
            note: '',
            colorCode: '',
            weekHitRecentTen: 0,
            weekMaxAccurateStreak: 0,
            weekHitMatches: 0,
            weekTotalMatches: 0,
            weekHitRate: 0,
            weekHitRateDisplay: '',
            weekRanking: 0,
            weekHistoryMaxWinStreak: 0,
            monthHitRecentTen: 0,
            monthMaxAccurateStreak: 0,
            monthHitMatches: 0,
            monthTotalMatches: 0,
            monthHitRate: 0,
            monthHitRateDisplay: '',
            monthRanking: 0,
            monthHistoryMaxWinStreak: 0,
            quarterHitRecentTen: 0,
            quarterMaxAccurateStreak: 0,
            quarterHitMatches: 0,
            quarterTotalMatches: 0,
            quarterHitRate: 0,
            quarterHitRateDisplay: '',
            quarterRanking: 0,
            quarterHistoryMaxWinStreak: 0,
            winHitRecentTen: 0,
            winMaxAccurateStreak: 0,
            winHitMatches: 0,
            winTotalMatches: 0,
            winHitRate: 0,
            winHitRateDisplay: '',
            winRanking: 0,
            winHistoryMaxWinStreak: 0
        }
    } as GetMemberProfileWithMemberIdResponse);

    const router = useRouter();

    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();

    const onIsFocused = async (id: number, follow: boolean) => {
        if (!isLogin) {
            router.push(`/master/masterAvatar/${params.masterId}?status=guess&auth=login`);
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

    const fetchData = async () => {
        const res = await getMemberProfileWithMemberId({
            loginMemberId: userInfo.uid ? userInfo.uid : 0,
            memberId: Number(params.masterId)
        });

        if (!res.success) {
            return new Error();
        }
        setInfo(res.data);
    };

    useEffect(() => {
        void fetchData();
    }, [userInfo.uid]);
    return (
        <>
            {info.memberId !== 0 ? (
                <section className={style.info}>
                    <div className={style.infoDetail}>
                        <div className={style.detail}>
                            <Avatar
                                borderColor="#fff"
                                size={54}
                                src={info.avatarPath === '0' ? '' : info.avatarPath}
                            />
                            <div className={style.content}>
                                <span className={style.name}>{info.username}</span>
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
                                            isBlueBg
                                            number={info.highlights.quarterRanking}
                                            text="季"
                                        />
                                    )}
                                    {info.highlights.monthRanking > 0 && (
                                        <TagSplit
                                            isBlueBg
                                            number={info.highlights.monthRanking}
                                            text="月"
                                        />
                                    )}
                                    {info.highlights.weekRanking > 0 && (
                                        <TagSplit
                                            isBlueBg
                                            number={info.highlights.weekRanking}
                                            text="周"
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
                                void onIsFocused(info.memberId, info.isFollowed);
                            }}
                        >
                            {info.isFollowed ? '已关注' : '关注'}
                        </div>
                    </div>
                    <div className={style.introduction}>{info.profile}</div>
                </section>
            ) : (
                <Skeleton />
            )}
        </>
    );
}

export default Info;
