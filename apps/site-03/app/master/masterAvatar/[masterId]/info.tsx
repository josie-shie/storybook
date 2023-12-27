'use client';
import { useEffect, useState } from 'react';
import { getMentorList, type GetMentor } from 'data-center';
import { unFollow, updateFollow } from 'data-center';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import { useUserStore } from '@/app/userStore';
import Fire from '@/app/img/fire.png';
import style from './info.module.scss';
import Skeleton from './components/skeleton/skeleton';

function Info({ params }: { params: { masterId: string } }) {
    const [info, setInfo] = useState({
        memberId: 0,
        username: '',
        avatarPath: '',
        profile: '',
        fans: 0,
        unlocked: 0,
        isFollowed: false,
        tags: {
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
    } as GetMentor);

    const router = useRouter();

    const userInfo = useUserStore.use.userInfo();

    const onIsFocused = async (id: number, follow: boolean) => {
        const isCookieExist = Cookies.get('access');
        if (!isCookieExist) {
            router.push(`/master/masterAvatar/${params.masterId}?status=analysis&auth=login`);
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
        const res = await getMentorList({
            memberId: userInfo.uid ? userInfo.uid : 1,
            mentorId: Number(params.masterId)
        });

        if (!res.success) {
            return new Error();
        }
        if (res.data.length === 0) {
            return;
        }
        setInfo(res.data[0]);
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
                                {info.tags.winMaxAccurateStreak > 0 && (
                                    <Tag
                                        icon={<Image alt="fire" src={Fire} />}
                                        text={`${info.tags.winMaxAccurateStreak} 連紅`}
                                    />
                                )}
                                {info.tags.weekRanking > 0 && (
                                    <Tag
                                        background="#fff"
                                        color="#4489ff"
                                        text={`周榜 ${info.tags.weekRanking}`}
                                    />
                                )}
                                {info.tags.monthRanking > 0 && (
                                    <Tag
                                        background="#fff"
                                        color="#4489ff"
                                        text={`月榜 ${info.tags.monthRanking}`}
                                    />
                                )}
                                {info.tags.quarterRanking > 0 && (
                                    <Tag
                                        background="#fff"
                                        color="#4489ff"
                                        text={`季榜 ${info.tags.quarterRanking}`}
                                    />
                                )}
                            </div>
                            <div className={style.bottom}>
                                <span>粉丝: {info.fans}</span>
                                <span>解锁: {info.unlocked}</span>
                                {Boolean(info.tags) && (
                                    <span>
                                        近一季猜球胜率: {Math.round(info.tags.quarterHitRate * 100)}
                                        %
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
                <Skeleton />
            )}
        </>
    );
}

export default Info;
