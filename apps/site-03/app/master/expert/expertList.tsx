'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { type MentorFilter, type GetMentorListResponse } from 'data-center';
import { getMentorList, unFollow, updateFollow } from 'data-center';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/components/tag/tag';
import Avatar from '@/components/avatar/avatar';
import Fire from '@/app/img/fire.png';
import NoData from '@/components/baseNoData/noData';
import WeekButton from '../components/weekButton/weekButton';
import { useUserStore } from '../../userStore';
import style from './expertList.module.scss';
import SkeletonLayout from './components/skeleton/skeleton';

interface ExpertItemProps {
    mentorList: GetMentorListResponse;
    setMentorList: Dispatch<SetStateAction<GetMentorListResponse>>;
}

function ExpertItem({ mentorList, setMentorList }: ExpertItemProps) {
    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();

    const router = useRouter();

    const onFocused = async (isFollow: boolean, id: number) => {
        if (!isLogin) {
            router.push('/master/expert/?auth=login');
            return;
        }
        const res = isFollow
            ? await unFollow({ followerId: userInfo.uid, followedId: id })
            : await updateFollow({ followerId: userInfo.uid, followedId: id });
        if (!res.success) {
            return new Error();
        }

        setMentorList(prevData =>
            prevData.map(item =>
                item.memberId === id ? { ...item, isFollowed: !item.isFollowed } : item
            )
        );
    };

    return (
        <>
            {mentorList.map(item => {
                return (
                    <div className={style.masterItem} key={item.username}>
                        <div className={style.info}>
                            <Link
                                className={style.avatarContainer}
                                href={`/master/masterAvatar/${item.memberId}?status=analysis`}
                            >
                                <Avatar
                                    borderColor="#4489FF"
                                    src={item.avatarPath === '0' ? '' : item.avatarPath}
                                />
                            </Link>
                            <div className={style.about}>
                                <Link
                                    className={style.userName}
                                    href={`/master/masterAvatar/${item.memberId}?status=analysis`}
                                >
                                    {item.username}
                                </Link>
                                <div>
                                    {item.tags.winMaxAccurateStreak > 0 && (
                                        <Tag
                                            icon={<Image alt="fire" src={Fire} />}
                                            text={`${item.tags.winMaxAccurateStreak} 連紅`}
                                        />
                                    )}
                                    {item.tags.quarterRanking > 0 && (
                                        <Tag
                                            background="#4489FF"
                                            text={`季榜 ${item.tags.monthRanking}`}
                                        />
                                    )}
                                    {item.tags.monthRanking > 0 && (
                                        <Tag
                                            background="#4489FF"
                                            text={`月榜 ${item.tags.monthRanking}`}
                                        />
                                    )}
                                    {item.tags.weekRanking > 0 && (
                                        <Tag
                                            background="#4489FF"
                                            text={`周榜 ${item.tags.weekRanking}`}
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
                                        void onFocused(true, item.memberId);
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
                                        void onFocused(false, item.memberId);
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

function MasterList() {
    const [isActive, setIsActive] = useState<MentorFilter[]>([]);
    const [mentorList, setMentorList] = useState<GetMentorListResponse>([]);
    const [isNoData, setIsNoData] = useState<boolean | null>(null);

    const userInfo = useUserStore.use.userInfo();

    const updateActive = (value: MentorFilter) => {
        setIsActive(current => {
            const isExist = current.includes(value);
            if (isExist) {
                return current.filter(item => item !== value);
            }
            return [...current, value];
        });
    };

    const fetchData = async () => {
        const res = await getMentorList({
            memberId: userInfo.uid ? userInfo.uid : 1,
            filter: isActive.length > 0 ? isActive : undefined
        });

        if (!res.success) {
            return new Error();
        }

        setMentorList(res.data);
        setIsNoData(res.data.length === 0);
    };

    useEffect(() => {
        void fetchData();
    }, [userInfo.uid, isActive]);

    return (
        <div className={style.master}>
            <WeekButton isActive={isActive} updateActive={updateActive} />

            {mentorList.length === 0 && isNoData === null && <SkeletonLayout />}

            {mentorList.length === 0 && isNoData ? (
                <NoData />
            ) : (
                <ul className={style.article}>
                    <div className={style.expertLayout}>
                        <ExpertItem mentorList={mentorList} setMentorList={setMentorList} />
                    </div>
                </ul>
            )}
        </div>
    );
}

export default MasterList;
