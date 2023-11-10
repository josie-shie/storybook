'use client';
import { IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
import PeriodListItem from '../components/period/periodListItem';
import Soccer from '../components/period/img/soccerblue.png';
import UserSwitch from '../components/userSwitch/userSwitch';
import Rule from '../components/rule/rule';
import { creatRankStore } from './rankStore';
import style from './rank.module.scss';
import Avatar from '@/components/avatar/avatar';

function Rank() {
    creatRankStore({
        rankList: [
            {
                ranking: 5,
                avatar: '',
                name: '老梁聊球',
                record: 0,
                victory: 10,
                defeat: 5,
                winRate: 98
            },
            {
                ranking: 4,
                avatar: '',
                name: '老董聊球',
                record: 0,
                victory: 0,
                defeat: 3,
                winRate: 98
            },
            {
                ranking: 1,
                avatar: '',
                name: '老衲聊球',
                record: 0,
                victory: 4,
                defeat: 3,
                winRate: 97
            },
            {
                ranking: 6,
                avatar: '',
                name: '老薛聊球',
                record: 0,
                victory: 7,
                defeat: 3,
                winRate: 50
            },
            {
                ranking: 2,
                avatar: '',
                name: '老王聊球',
                record: 0,
                victory: 5,
                defeat: 2,
                winRate: 40
            },
            {
                ranking: 2,
                avatar: '',
                name: '老李聊球',
                record: 0,
                victory: 3,
                defeat: 5,
                winRate: 30
            }
        ]
    });

    const userData = {
        avatar: undefined,
        name: '郭台銘',
        record: 2,
        victory: 6,
        defeat: 4,
        winRate: 99
    };

    return (
        <div className={style.rank}>
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
            <div className={style.userRank}>
                <div className={style.ranking}>
                    你排名<span>24</span>
                </div>
                <div className={style.container}>
                    <div className={style.avatarContainer}>
                        <Avatar src={userData.avatar} />
                    </div>
                    <div className={style.content}>
                        <div className={style.name}>{userData.name}</div>
                        <div className={style.detail}>
                            <div>战绩: {userData.record}场</div>
                            <div>
                                胜负: <span className={style.victory}>{userData.victory}</span>/
                                {userData.defeat}
                            </div>
                        </div>
                    </div>
                    <div className={style.winRateBlock}>
                        <Image alt="icon" className={style.icon} src={Soccer} />
                        <span className={style.winRate}>
                            <span>{userData.winRate}</span>
                            <span className={style.percent}>%</span>
                        </span>
                    </div>
                </div>
            </div>
            <PeriodListItem />
        </div>
    );
}

export default Rank;
