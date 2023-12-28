'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    unFollow,
    updateFollow,
    getFollowers,
    getMentorList,
    type GetFollowersResponse
} from 'data-center';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import Fire from '@/app/img/fire.png';
import NoData from '@/components/baseNoData/noData';
import { useUserStore } from '@/app/userStore';
import style from './masterItem.module.scss';
import SkeletonLayout from './components/skeleton';

function MasterItem({ params }: { params: { masterId } }) {
    const [masterItem, setMasterItem] = useState<GetFollowersResponse>([]);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);

    const router = useRouter();

    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();

    const fetchData = async () => {
        const res = await getFollowers({ memberId: 1, isFans: false });

        if (!res.success) {
            return new Error();
        }

        setMasterItem(res.data);
        setIsNoData(res.data.length === 0);
    };

    const onIsFocused = async (id: number, follow: boolean) => {
        if (!isLogin) {
            router.push(`/master/masterAvatar/${params.masterId}?status=focus&auth=login`);
            return;
        }
        const res = follow
            ? await unFollow({ followerId: Number(params.masterId) || 1, followedId: id })
            : await updateFollow({ followerId: Number(params.masterId) || 1, followedId: id });
        if (!res.success) {
            return new Error();
        }

        setMasterItem(prevData =>
            prevData.map(item =>
                item.memberId === id ? { ...item, isFollowed: !item.isFollowed } : item
            )
        );
    };

    const goMasterPredict = async (id: number) => {
        const res = await getMentorList({
            memberId: userInfo.uid ? userInfo.uid : 1,
            mentorId: id
        });

        if (!res.success) {
            return new Error();
        }
        if (res.data.length === 0) {
            router.push(`/master/memberAvatar/${id}?status=guess`);
            return;
        }

        router.push(`/master/masterAvatar/${id}?status=analysis`);
    };

    useEffect(() => {
        void fetchData();
    }, []);

    return (
        <>
            {masterItem.length === 0 && isNoData === null && <SkeletonLayout />}

            {masterItem.length === 0 && isNoData ? (
                <NoData />
            ) : (
                <>
                    {masterItem.map(item => {
                        return (
                            <div className={style.masterItem} key={item.memberId}>
                                <div className={style.info}>
                                    <div
                                        className={style.avatarContainer}
                                        onClick={() => {
                                            void goMasterPredict(item.memberId);
                                        }}
                                    >
                                        <Avatar
                                            borderColor="#4489FF"
                                            size={46}
                                            src={item.avatarPath === '0' ? '' : item.avatarPath}
                                        />
                                    </div>
                                    <div className={style.about}>
                                        <span
                                            onClick={() => {
                                                void goMasterPredict(item.memberId);
                                            }}
                                        >
                                            {item.username}
                                        </span>
                                        <div className={style.top}>
                                            {item.tags.winMaxAccurateStreak > 0 && (
                                                <Tag
                                                    icon={<Image alt="fire" src={Fire} />}
                                                    text={`${item.tags.winMaxAccurateStreak} 連紅`}
                                                />
                                            )}
                                            {item.tags.weekRanking > 0 && (
                                                <Tag
                                                    background="#4489FF"
                                                    text={`周榜 ${item.tags.weekRanking}`}
                                                />
                                            )}
                                            {item.tags.monthRanking > 0 && (
                                                <Tag
                                                    background="#4489FF"
                                                    text={`月榜 ${item.tags.monthRanking}`}
                                                />
                                            )}
                                            {item.tags.quarterRanking > 0 && (
                                                <Tag
                                                    background="#4489FF"
                                                    text={`季榜 ${item.tags.quarterRanking}`}
                                                />
                                            )}
                                        </div>
                                        <div className={style.bot}>
                                            <span>粉丝: {item.fans}</span>
                                            <span>解锁: {item.unlocked}</span>
                                        </div>
                                    </div>
                                    {item.isFollowed ? (
                                        <motion.button
                                            className={style.followedButton}
                                            onClick={() => {
                                                void onIsFocused(item.memberId, true);
                                            }}
                                            type="button"
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            已关注
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            className={style.followButton}
                                            onClick={() => {
                                                void onIsFocused(item.memberId, false);
                                            }}
                                            type="button"
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            关注
                                        </motion.button>
                                    )}
                                </div>
                                <div className={style.description}>{item.profile}</div>
                            </div>
                        );
                    })}
                </>
            )}
        </>
    );
}

export default MasterItem;
