'use client';

import { useEffect, useState } from 'react';
import { IconFlame } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { unFollow, updateFollow, getFollowers, type GetFollowersResponse } from 'data-center';
import style from './masterItem.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import { useRouter } from 'next/navigation';
import { Router } from '@mui/icons-material';

function MasterItem({ params }: { params: { masterId } }) {
    const [masterItem, setMasterItem] = useState<GetFollowersResponse>([]);

    const router = useRouter();

    const fetchData = async () => {
        try {
            const res = await getFollowers({ memberId: 1, isFans: false });

            if (!res.success) {
                return new Error();
            }

            setMasterItem(res.data);
        } catch (error) {
            return new Error();
        }
    };

    const onIsFocused = async (id: number, follow: boolean) => {
        try {
            const res = follow
                ? await unFollow({ followerId: params.masterId || 1, followedId: id })
                : await updateFollow({ followerId: params.masterId || 1, followedId: id });
            if (!res.success) {
                return new Error();
            }

            setMasterItem(prevData =>
                prevData.map(item =>
                    item.memberId === id ? { ...item, isFollowed: !item.isFollowed } : item
                )
            );
        } catch (error) {
            return new Error();
        }
    };

    const goMasterPredict = (id: number) => {
        router.push(`/master/masterAvatar/${id}?status=analysis`);
    };

    useEffect(() => {
        void fetchData();
    }, []);

    return (
        <>
            {masterItem.map(item => {
                return (
                    <div className={style.masterItem} key={item.memberId}>
                        <div className={style.info}>
                            <div
                                className={style.avatarContainer}
                                onClick={() => goMasterPredict(item.memberId)}
                            >
                                <Avatar
                                    borderColor="#4489FF"
                                    size={46}
                                    src={item.avatarPath === '0' ? '' : item.avatarPath}
                                />
                            </div>
                            <div className={style.about}>
                                <span>{item.username}</span>
                                <div className={style.top}>
                                    {item.tags.winMaxAccurateStreak > 0 && (
                                        <Tag
                                            icon={<IconFlame size={10} />}
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
    );
}

export default MasterItem;
