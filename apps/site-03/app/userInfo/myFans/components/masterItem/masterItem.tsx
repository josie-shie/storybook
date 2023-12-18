'use client';
import { IconFlame } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import style from './masterItem.module.scss';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';

interface Tags {
    id: number;
    tagName: string;
    note: string;
    colorCode: string;
    weekHitRecentTen: number;
    weekMaxAccurateStreak: number;
    weekHitMatches: number;
    weekTotalMatches: number;
    weekHitRate: number;
    weekHitRateDisplay: string;
    weekRanking: number;
    weekHistoryMaxWinStreak: number;
    monthHitRecentTen: number;
    monthMaxAccurateStreak: number;
    monthHitMatches: number;
    monthTotalMatches: number;
    monthHitRate: number;
    monthHitRateDisplay: string;
    monthRanking: number;
    monthHistoryMaxWinStreak: number;
    quarterHitRecentTen: number;
    quarterMaxAccurateStreak: number;
    quarterHitMatches: number;
    quarterTotalMatches: number;
    quarterHitRate: number;
    quarterHitRateDisplay: string;
    quarterRanking: number;
    quarterHistoryMaxWinStreak: number;
    winHitRecentTen: number;
    winMaxAccurateStreak: number;
    winHitMatches: number;
    winTotalMatches: number;
    winHitRate: number;
    winHitRateDisplay: string;
    winRanking: number;
    winHistoryMaxWinStreak: number;
}

interface FansProps {
    uid: number;
    item: {
        memberId: number;
        username: string;
        avatarPath: string;
        profile: string;
        fans: number;
        unlocked: number;
        isFollowed: boolean;
        tags: Tags;
    };
    onFollowToggle: (uid: number, memberId: number, isFollowed: boolean) => void;
}

function MasterItem({ uid, item, onFollowToggle }: FansProps) {
    const handleFollowClick = () => {
        onFollowToggle(uid, item.memberId, !item.isFollowed);
    };

    return (
        <div className={style.masterItem} key={item.memberId}>
            <div className={style.info}>
                <div className={style.avatarContainer}>
                    <Avatar
                        borderColor="#4489FF"
                        size={46}
                        src={item.avatarPath && item.avatarPath !== '0' ? item.avatarPath : ''}
                    />
                </div>
                <div className={style.about}>
                    <div className={style.top}>
                        <span>{item.username}</span>
                        {item.tags.winHistoryMaxWinStreak > 3 && (
                            <Tag
                                icon={<IconFlame size={10} />}
                                text={`${item.tags.winHistoryMaxWinStreak}连红`}
                            />
                        )}
                        {item.tags.weekHistoryMaxWinStreak > 3 && (
                            <Tag
                                background="#4489FF"
                                color="#fff"
                                text={`周榜 ${item.tags.weekHistoryMaxWinStreak}`}
                            />
                        )}
                        {item.tags.monthHistoryMaxWinStreak > 3 && (
                            <Tag
                                background="#4489FF"
                                color="#fff"
                                text={`月榜 ${item.tags.monthHistoryMaxWinStreak}`}
                            />
                        )}
                        {item.tags.quarterHistoryMaxWinStreak > 3 && (
                            <Tag
                                background="#4489FF"
                                color="#fff"
                                text={`季榜 ${item.tags.quarterHistoryMaxWinStreak}`}
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
