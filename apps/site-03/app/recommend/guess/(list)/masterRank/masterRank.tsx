'use client';
// import { IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
import HotStreakListItem from '../components/hotStreak/hotStreakListItem';
import UserSwitch from '../components/userSwitch/userSwitch';
import Rule from '../components/rule/rule';
import masterRankBackground from '../img/masterRankBg.png';
import Streak from '../components/hotStreak/img/whiteStreak.png';
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
        onlyShowToday: true,
        masterRankList: [
            {
                id: 1,
                ranking: 1,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 9,
                highestStreak: 14,
                isToday: true
            },
            {
                id: 2,
                ranking: 2,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 10,
                highestStreak: 7,
                isToday: true
            },
            {
                id: 3,
                ranking: 3,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 4,
                highestStreak: 4,
                isToday: true
            },
            {
                id: 4,
                ranking: 4,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 6,
                highestStreak: 3,
                isToday: true
            },
            {
                id: 5,
                ranking: 5,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 4,
                highestStreak: 3,
                isToday: true
            },
            {
                id: 6,
                ranking: 6,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 7,
                highestStreak: 2,
                isToday: true
            },
            {
                id: 7,
                ranking: 7,
                avatar: '',
                name: '老梁聊球',
                currentStreak: 4,
                highestStreak: 0,
                isToday: false
            }
        ]
    });

    return (
        <div className={style.masterRank}>
            <div className={style.control}>
                <UserSwitch />
                <div className={style.right}>
                    {/* 1.5版先不做搜尋 */}
                    {/* <div className={style.search}>
                        <IconSearch size={16} />
                        <span>搜尋</span>
                    </div> */}
                    <Rule />
                </div>
            </div>
            <div className={style.userHotStreak}>
                <Image alt="" className={style.background} src={masterRankBackground} width={366} />
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
