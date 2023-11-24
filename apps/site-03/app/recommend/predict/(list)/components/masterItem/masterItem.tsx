'use client';
import { IconFlame } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useMasterStore } from '../../master/masterStore';
import style from './masterItem.module.scss';
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

export default MasterItem;
