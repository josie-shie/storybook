'use client';
import { IconSearch } from '@tabler/icons-react';
import HotStreakListItem from '../components/hotStreak/hotStreakListItem';
import UserSwitch from '../components/userSwitch/userSwitch';
import Rule from '../components/rule/rule';
import style from './masterRank.module.scss';

function RankList() {
    const list = [
        {
            ranking: 1,
            name: '老梁聊球',
            currentStreak: 9,
            highestStreak: 14
        },
        {
            ranking: 2,
            name: '老梁聊球',
            currentStreak: 10,
            highestStreak: 7
        },
        {
            ranking: 3,
            name: '老梁聊球',
            currentStreak: 4,
            highestStreak: 4
        },
        {
            ranking: 4,
            name: '老梁聊球',
            currentStreak: 6,
            highestStreak: 3
        },
        {
            ranking: 5,
            name: '老梁聊球',
            currentStreak: 4,
            highestStreak: 3
        },
        {
            ranking: 6,
            name: '老梁聊球',
            currentStreak: 7,
            highestStreak: 2
        },
        {
            ranking: 7,
            name: '老梁聊球',
            currentStreak: 4,
            highestStreak: 0
        }
    ];

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
            {list.map(item => (
                <div key={item.ranking}>
                    <HotStreakListItem
                        currentStreak={item.currentStreak}
                        highestStreak={item.highestStreak}
                        name={item.name}
                        ranking={item.ranking}
                    />
                </div>
            ))}
        </div>
    );
}

export default RankList;
