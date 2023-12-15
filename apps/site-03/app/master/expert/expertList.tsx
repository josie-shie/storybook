'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { IconFlame } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { type MentorFilter, type GetMentorListResponse } from 'data-center';
import { getMentorList, unFollow, updateFollow } from 'data-center';
import WeekButton from '../components/weekButton/weekButton';
import { useUserStore } from '../../userStore';
import style from './expertList.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';

interface ExpertItemProps {
    mentorList: GetMentorListResponse;
    setMentorList: Dispatch<SetStateAction<GetMentorListResponse>>;
}

function ExpertItem({ mentorList, setMentorList }: ExpertItemProps) {
    const userInfo = useUserStore.use.userInfo();

    const onSubscript = async (isFollow: boolean, id: number) => {
        try {
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
        } catch (error) {
            return new Error();
        }
    };
    return (
        <>
            {mentorList.map(item => {
                return (
                    <div className={style.masterItem} key={item.username}>
                        <div className={style.info}>
                            <div className={style.avatarContainer}>
                                <Avatar
                                    borderColor="#4489FF"
                                    src={item.avatarPath === '0' ? '' : item.avatarPath}
                                />
                            </div>
                            <div className={style.about}>
                                <span>{item.username}</span>
                                <div>
                                    {item.tags.weekMaxAccurateStreak > 0 && (
                                        <Tag
                                            icon={<IconFlame size={10} />}
                                            text={`${item.tags.winMaxAccurateStreak}連紅`}
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
                                        void onSubscript(true, item.memberId);
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
                                        void onSubscript(false, item.memberId);
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

    const userInfo = useUserStore.use.userInfo();

    const updateActive = (value: MentorFilter) => {
        setIsActive(current => {
            const isExist = current.includes(value);
            if (isExist) {
                return current.filter(item => item !== value);
            }
            return [...current, value];
        });
        void fetchData();
    };

    const fetchData = async () => {
        try {
            const res = await getMentorList({
                memberId: userInfo.uid ? userInfo.uid : 1,
                filter: isActive.length > 0 ? isActive : undefined
            });

            if (!res.success) {
                return new Error();
            }

            setMentorList(res.data);
        } catch (error) {
            return new Error();
        }
    };

    useEffect(() => {
        void fetchData();
    }, [userInfo.uid]);

    return (
        <div className={style.master}>
            <WeekButton isActive={isActive} updateActive={updateActive} />
            <div className={style.expertLayout}>
                <ExpertItem mentorList={mentorList} setMentorList={setMentorList} />
            </div>
        </div>
    );
}

export default MasterList;
