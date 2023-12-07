'use client';
import { useState } from 'react';
import { Tab, Tabs } from 'ui';
import BettingPlan from './components/bettingPlan/bettingPlan';
import style from './myGuess.module.scss';
import { useMyGuessStore, type MyPlans, type RecordItem } from './myGuessStore';
import NoData from '@/components/baseNoData/noData';

const tabList = [
    {
        label: '全部',
        value: 'totale'
    },
    {
        label: '让球',
        value: 'handicap'
    },
    {
        label: '大小',
        value: 'size'
    }
];

function MyGuessMyPlans() {
    const [planActiveTab, setPlanActiveTab] = useState('totale');
    const openRecord = useMyGuessStore.use.setOpen();
    const setGuessRecordList = useMyGuessStore.use.setGuessRecordList();

    const handlePlanTabClick = (tabName: string) => {
        setPlanActiveTab(tabName);
    };

    const fetchListData = () => {
        return [
            {
                id: 7,
                avatar: '',
                name: '羅曼琉球',
                hotStreak: 2,
                homeTeam: '欧锦U20A',
                awayTeam: '斯洛文尼亚U20',
                history: ['win', 'lose', 'draw', 'win', 'lose', 'draw', 'win', 'lose', 'draw'],
                guess: 'home',
                result: 'win',
                guessValue: 0.5
            },
            {
                id: 10,
                avatar: '',
                name: '小羅聊球',
                hotStreak: 2,
                homeTeam: '欧锦U20A',
                awayTeam: '斯洛文尼亚U20',
                history: ['win', 'win', 'win', 'win', 'lose', 'draw', 'win', 'win', 'draw'],
                guess: 'big',
                result: 'lose',
                guessValue: 0.5
            },
            {
                id: 10,
                avatar: '',
                name: '小羅聊球',
                hotStreak: 2,
                homeTeam: '欧锦U20A',
                awayTeam: '斯洛文尼亚U20',
                history: ['win', 'win', 'draw', 'win', 'win', 'draw', 'win', 'win', 'draw'],
                guess: 'home',
                result: 'draw',
                guessValue: 0.5
            },
            {
                id: 10,
                avatar: '',
                name: '小羅聊球',
                hotStreak: 2,
                homeTeam: '欧锦U20A',
                awayTeam: '斯洛文尼亚U20',
                history: ['win', 'win', 'draw', 'win', 'win', 'draw', 'win', 'win', 'draw'],
                guess: 'small',
                result: 'draw',
                guessValue: 0.5
            }
        ];
    };

    const handleOpenRecord = () => {
        const list = fetchListData();
        setGuessRecordList(list as RecordItem[]);
        setTimeout(() => {
            openRecord(true);
        }, 0);
    };

    const myPlansData = useMyGuessStore.use.myGuess().myPlans[planActiveTab as keyof MyPlans];

    return (
        <>
            <div className={style.title}>
                <span>我猜过的</span>
                <span className={style.record} onClick={handleOpenRecord}>
                    查看纪录
                </span>
            </div>
            <div className={style.btnTab}>
                <Tabs
                    defaultValue={planActiveTab}
                    onTabChange={value => {
                        handlePlanTabClick(value);
                    }}
                    position="center"
                    styling="button"
                >
                    {tabList.map(item => {
                        return (
                            <Tab key={item.value} label={item.label} value={item.value}>
                                {myPlansData.length > 0 ? (
                                    myPlansData.map(row => (
                                        <BettingPlan key={row.id} rowData={row} />
                                    ))
                                ) : (
                                    <NoData />
                                )}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        </>
    );
}

export default MyGuessMyPlans;
