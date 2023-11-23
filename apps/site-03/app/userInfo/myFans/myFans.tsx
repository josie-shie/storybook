'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import backLeftArrowImg from '../img/backLeftArrow.png';
import { creatFansMemberStore, useFansMemberStore } from './myFansStore';
import MasterItem from './components/masterItem/masterItem';
import style from './myFans.module.scss';

interface FocusData {
    id: number;
    name: string;
    hotStreak: number;
    ranking: number;
    followed: boolean;
    unlockNumber: number;
    fansNumber: number;
    description: string;
}

function MyFocus() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>('');

    creatFansMemberStore({
        fansMemberItem: [
            {
                id: 12,
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
                name: '柯侯配',
                hotStreak: 6,
                ranking: 7,
                followed: true,
                unlockNumber: 2200,
                fansNumber: 54321,
                description: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！'
            },
            {
                id: 18,
                name: '柯侯配',
                hotStreak: 6,
                ranking: 7,
                followed: true,
                unlockNumber: 2200,
                fansNumber: 54321,
                description: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！'
            },
            {
                id: 19,
                name: '柯侯配',
                hotStreak: 6,
                ranking: 7,
                followed: true,
                unlockNumber: 2200,
                fansNumber: 54321,
                description: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！'
            },
            {
                id: 20,
                name: '柯侯配',
                hotStreak: 6,
                ranking: 7,
                followed: true,
                unlockNumber: 2200,
                fansNumber: 54321,
                description: '资深足彩分析师，15年足彩经验，对各个赛事都有涉足。长期关注！'
            },
            {
                id: 21,
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
    const fansMemberItem = useFansMemberStore.use.fansMemberItem() as FocusData[];
    const [filteredMasterItems, setFilteredMasterItems] = useState<FocusData[]>(fansMemberItem);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        const filteredItems = fansMemberItem.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMasterItems(filteredItems);
    };

    return (
        <>
            <div className={style.placeholder}>
                <div className={style.headerDetail}>
                    <div className={style.title}>
                        <Image
                            alt=""
                            height={24}
                            onClick={() => {
                                router.back();
                            }}
                            src={backLeftArrowImg}
                            width={24}
                        />
                        <div className={style.text}>我的关注</div>
                    </div>
                </div>
            </div>

            <div className={style.myFans}>
                <div className={style.search}>
                    <input
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        placeholder="请输入用户名"
                        type="text"
                        value={searchTerm}
                    />
                    <button onClick={handleSearch} type="button">
                        搜索
                    </button>
                </div>
                {filteredMasterItems.map(item => (
                    <MasterItem item={item} key={item.id} />
                ))}
            </div>
        </>
    );
}

export default MyFocus;
