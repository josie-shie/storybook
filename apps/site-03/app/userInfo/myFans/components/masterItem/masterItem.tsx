'use client';
import { IconFlame } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import style from './masterItem.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';

interface FansProps {
    uid: number;
    item: {
        memberId: number;
        username: string;
        avatarPath: string;
        profile: string;
        fans: number;
        unlocked: number;
        hotStreak: number;
        ranking: number;
        followed: boolean;
    };
    onFollowToggle: (uid: number, memberId: number, followed: boolean) => void;
}

function MasterItem({ uid, item, onFollowToggle }: FansProps) {
    const handleFollowClick = () => {
        onFollowToggle(uid, item.memberId, !item.followed);
    };

    return (
        <div className={style.masterItem} key={item.memberId}>
            <div className={style.info}>
                <div className={style.avatarContainer}>
                    <Avatar borderColor="#4489FF" size={46} src={item.avatarPath} />
                </div>
                <div className={style.about}>
                    <div className={style.top}>
                        <span>{item.username}</span>
                        {item.hotStreak > 2 && (
                            <Tag icon={<IconFlame size={10} />} text={`${item.hotStreak}連紅`} />
                        )}
                        <Tag background="#4489FF" text={`月榜 ${item.ranking}`} />
                    </div>
                    <div className={style.bot}>
                        <span>粉丝: {item.fans}</span>
                        <span>解锁: {item.unlocked}</span>
                    </div>
                </div>
                {item.followed ? (
                    <motion.button
                        className={style.followedButton}
                        onClick={handleFollowClick}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                    >
                        已关注
                    </motion.button>
                ) : (
                    <motion.button
                        className={style.followButton}
                        onClick={handleFollowClick}
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
}

export default MasterItem;
