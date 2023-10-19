'use client';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import HotStreakListItem from '../components/hotStreak/hotStreakListItem';
import style from './page.module.scss';

function Page() {
    const [status, setStatus] = useState(true);

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
                <div className={style.left}>
                    <span className={style.text}>仅显示当天参与用户</span>
                    <div className={style.switch}>
                        <input
                            checked={status}
                            id="switch"
                            onChange={() => {
                                setStatus(!status);
                            }}
                            type="checkbox"
                        />
                        <label htmlFor="switch">switch</label>
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.search}>
                        <IconSearch size={16} />
                        <span>搜尋</span>
                    </div>
                    <div className={style.rule}>
                        <span>規則</span>
                    </div>
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

export default Page;
