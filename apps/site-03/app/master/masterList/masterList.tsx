'use client';

import { useState } from 'react';
import { IconFlame } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import WeekButton from '../components/weekButton/weekButton';
import { useMasterStore, creatMasterStore } from './masterListStore';
import style from './masterList.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';

function MasterItem() {
    const masterItem = useMasterStore.use.masterItem();

    return (
        <>
            {masterItem.map(item => {
                return (
                    <div className={style.masterItem} key={item.id}>
                        <div className={style.info}>
                            <div className={style.avatarContainer}>
                                <Avatar borderColor="#4489FF" size={46} />
                            </div>
                            <div className={style.about}>
                                <div className={style.top}>
                                    <span>{item.name}</span>
                                    {item.hotStreak > 2 && (
                                        <Tag
                                            icon={<IconFlame size={10} />}
                                            text={`${item.hotStreak}連紅`}
                                        />
                                    )}
                                    <Tag background="#4489FF" text={`月榜 ${item.ranking}`} />
                                </div>
                                <div className={style.bot}>
                                    <span>粉丝: {item.fansNumber}</span>
                                    <span>解锁: {item.unlockNumber}</span>
                                </div>
                            </div>
                            {item.followed ? (
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
                        <div className={style.description}>{item.description}</div>
                    </div>
                );
            })}
        </>
    );
}

function MasterList() {
    const [isActive, setIsActive] = useState<number[]>([]);

    const updateActive = (value: number) => {
        setIsActive(current => {
            const isExist = current.includes(value);
            if (isExist) {
                return current.filter(item => item !== value);
            }
            return [...current, value];
        });
    };

    creatMasterStore({
        masterItem: [
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
            <MasterItem />
        </div>
    );
}

export default MasterList;
