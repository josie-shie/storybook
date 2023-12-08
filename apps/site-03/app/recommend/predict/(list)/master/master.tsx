'use client';
import MasterItem from '../components/masterItem/masterItem';
import WeekButton from '../components/weekButton/weekButton';
import { creatMasterStore } from './masterStore';
import style from './master.module.scss';

function Master() {
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
            <WeekButton />
            <MasterItem />
        </div>
    );
}

export default Master;
