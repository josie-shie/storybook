'use client';
import { useEffect, useState } from 'react';
import { IconFlame } from '@tabler/icons-react';
import { getMentorList, type GetMentor } from 'data-center';
import { unFollow, updateFollow } from 'data-center';
import style from './info.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import { useUserStore } from '@/app/userStore';

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

    const userInfo = useUserStore.use.userInfo();

    const onIsFocused = async (id: number, follow: boolean) => {
        try {
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
        } catch (error) {
            return new Error();
        }
    };

    const fetchData = async () => {
        try {
            const res = await getMentorList({
                memberId: userInfo.uid ? userInfo.uid : 1,
                mentorId: Number(params.masterId)
            });

            if (!res.success) {
                return new Error();
            }
            setInfo(res.data[0]);
        } catch (error) {
            return new Error();
        }
    };

    useEffect(() => {
        void fetchData();
    }, [userInfo.uid]);
    return (
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
                        <Tag icon={<IconFlame size={10} />} text="9連紅" />
                        <Tag background="#fff" color="#4489ff" text="月榜 10" />
                    </div>
                    <div className={style.bottom}>
                        <span>粉絲: {info.fans}</span>
                        <span>解鎖: {info.unlocked}</span>
                        {Boolean(info.tags) && (
                            <span>
                                近一季猜球胜率: {Math.round(info.tags.quarterHitRate * 100)}%
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
    );
}

export default Info;
