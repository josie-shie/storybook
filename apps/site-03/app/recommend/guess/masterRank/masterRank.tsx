'use client';
import { IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
import HotStreakListItem from '../components/hotStreak/hotStreakListItem';
import UserSwitch from '../components/userSwitch/userSwitch';
import Rule from '../components/rule/rule';
import Streak from '../components/hotStreak/img/streak.png';
import { creatMasterRankStore } from './masterRankStore';
import style from './masterRank.module.scss';
import Avatar from '@/components/avatar/avatar';

function RankList() {
    const user = {
        ranking: 87,
        name: '郭台銘',
        currentStreak: 9,
        highestStreak: 14
    };
    creatMasterRankStore({
        masterRankList: [
            {
                ranking: 1,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 9,
                highestStreak: 14
            },
            {
                ranking: 2,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 10,
                highestStreak: 7
            },
            {
                ranking: 3,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 4,
                highestStreak: 4
            },
            {
                ranking: 4,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 6,
                highestStreak: 3
            },
            {
                ranking: 5,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 4,
                highestStreak: 3
            },
            {
                ranking: 6,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 7,
                highestStreak: 2
            },
            {
                ranking: 7,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 4,
                highestStreak: 0
            }
        ]
    });

    return (
        <div className={style.masterRank}>
            <div className={style.control}>
                <UserSwitch />
                <div className={style.right}>
                    <div className={style.search}>
                        <IconSearch size={16} />
                        <span>搜尋</span>
                    </div>
                    <Rule />
                </div>
            </div>
            <div className={style.userHotStreak}>
                <div className={style.ranking}>
                    你排名<span>24</span>
                </div>
                <div className={style.container}>
                    <div className={style.avatarContainer}>
                        <Avatar />
                    </div>
                    <div className={style.content}>
                        <div className={style.name}>{user.name}</div>
                        <div className={style.streak}>
                            <div className={style.current}>
                                <Image alt="streakIcon" className={style.streakIcon} src={Streak} />
                                <span className={style.label}>当前:</span> {user.currentStreak}連紅
                            </div>
                            <div className={style.highest}>
                                <Image alt="streakIcon" className={style.streakIcon} src={Streak} />
                                <span className={style.label}>历史最高:</span> {user.highestStreak}
                                連紅
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HotStreakListItem />
        </div>
    );
}

export default RankList;
