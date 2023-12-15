'use client';

import { useEffect, useState } from 'react';
import { IconFlame } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { type MentorFilter, type GetMentorListResponse } from 'data-center';
import { getMentorList } from 'data-center';
import WeekButton from '../components/weekButton/weekButton';
import { useUserStore } from '../../userStore';
import { creatMasterStore } from './expertListStore';
import style from './expertList.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';

function ExpertItem({ mentorList }: { mentorList: GetMentorListResponse }) {
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
                                    type="button"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    已关注
                                </motion.button>
                            ) : (
                                <motion.button
                                    className={style.followButton}
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

    const useInfo = useUserStore.use.userInfo();

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
        try {
            const res = await getMentorList({
                memberId: useInfo.uid,
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
    }, [isActive, useInfo.uid]);

    creatMasterStore({
        expertItem: [
            {
                id: 12,
                avatar: '',
                name: '老梁聊球',
                hotStreak: 2,
                ranking: 10,
                followed: false,
                unlockNumber: 1800,
                fansNumber: 34516,
                description: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！'
            },
            {
                id: 17,
                avatar: '',
                name: '柯侯配',
                hotStreak: 6,
                ranking: 7,
                followed: true,
                unlockNumber: 2200,
                fansNumber: 54321,
                description: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！'
            }
        ]
    });
    return (
        <div className={style.master}>
            <WeekButton isActive={isActive} updateActive={updateActive} />
            <div className={style.expertLayout}>
                <ExpertItem mentorList={mentorList} />
            </div>
        </div>
    );
}

export default MasterList;
