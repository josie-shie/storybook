'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/components/avatar/avatar';
import Tag from '@/components/tag/tag';
import TagSplit from '@/components/tagSplit/tagSplit';
import Fire from '@/app/img/fire.png';
import style from './masterItem.module.scss';

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

interface FocusProps {
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

function MasterItem({ uid, item, onFollowToggle }: FocusProps) {
    const handleFollowClick = () => {
        onFollowToggle(uid, item.memberId, !item.isFollowed);
    };

    return (
        <div className={style.masterItem} key={item.memberId}>
            <div className={style.info}>
                <div className={style.avatarContainer}>
                    <Link href={`/master/masterAvatar/${item.memberId}?status=guess`}>
                        <Avatar
                            borderColor="#4489FF"
                            size={46}
                            src={item.avatarPath && item.avatarPath !== '0' ? item.avatarPath : ''}
                        />
                    </Link>
                </div>
                <div className={style.about}>
                    <div className={style.top}>
                        <span>{item.username}</span>
                        {item.tags.weekHitRecentTen > 0 && (
                            <TagSplit
                                isBlueBg={false}
                                number={item.tags.weekHitRecentTen}
                                hit={true}
                                text="近"
                            />
                        )}
                        {item.tags.winMaxAccurateStreak > 3 && (
                            <Tag
                                icon={<Image alt="fire" src={Fire} />}
                                text={`${item.tags.winMaxAccurateStreak}连红`}
                            />
                        )}
                        {item.tags.quarterRanking > 0 && (
                            <TagSplit
                                isBlueBg={false}
                                number={item.tags.quarterRanking}
                                text="季"
                            />
                        )}
                        {item.tags.monthRanking > 0 && (
                            <TagSplit isBlueBg={false} number={item.tags.monthRanking} text="月" />
                        )}
                        {item.tags.weekRanking > 0 && (
                            <TagSplit isBlueBg={false} number={item.tags.weekRanking} text="周" />
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
