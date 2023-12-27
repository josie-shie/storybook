'use client';
import { useEffect, useState } from 'react';
import {
    getMemberProfileWithMemberId,
    type GetMemberProfileWithMemberIdResponse
} from 'data-center';
import { unFollow, updateFollow } from 'data-center';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import { useUserStore } from '@/app/userStore';
import Fire from '@/app/img/fire.png';
import style from './info.module.scss';
import SkeletonLayout from './components/skeleton/skeleton';

function Info({ params }: { params: { memberId: string } }) {
    const [info, setInfo] = useState({
        memberId: 0,
        username: '',
        avatarPath: '',
        profile: '',
        fansCount: 0,
        unlockedCount: 0,
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
            router.push(`/master/memberAvatar/${params.memberId}?status=analysis&auth=login`);
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
            memberId: Number(params.memberId),
            loginMemberId: isLogin ? userInfo.uid : 0
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
                    <div className={style.detail}>
                        <Avatar
                            borderColor="#fff"
                            size={54}
                            src={info.avatarPath === '0' ? '' : info.avatarPath}
                        />
                        <div className={style.content}>
                            <span className={style.name}>{info.username}</span>
                            <div className={style.top}>
                                {info.highlights.winMaxAccurateStreak > 0 && (
                                    <Tag
                                        icon={<Image alt="fire" src={Fire} />}
                                        text={`${info.highlights.winMaxAccurateStreak} 連紅`}
                                    />
                                )}
                                {info.highlights.weekRanking > 0 && (
                                    <Tag
                                        background="#fff"
                                        color="#4489ff"
                                        text={`周榜 ${info.highlights.weekRanking}`}
                                    />
                                )}
                                {info.highlights.monthRanking > 0 && (
                                    <Tag
                                        background="#fff"
                                        color="#4489ff"
                                        text={`月榜 ${info.highlights.monthRanking}`}
                                    />
                                )}
                                {info.highlights.quarterRanking > 0 && (
                                    <Tag
                                        background="#fff"
                                        color="#4489ff"
                                        text={`季榜 ${info.highlights.quarterRanking}`}
                                    />
                                )}
                            </div>
                            <div className={style.bottom}>
                                {Boolean(info.highlights) && (
                                    <span>
                                        近一季猜球胜率:{' '}
                                        {Math.round(info.highlights.quarterHitRate * 100)}%
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

                    <div className={style.introduction}>{info.profile}</div>
                </section>
            ) : (
                <SkeletonLayout />
            )}
        </>
    );
}

export default Info;
