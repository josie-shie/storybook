'use client';
import { useState } from 'react';
import { Slick } from 'ui';
import BettingPlan from './components/bettingPlan/bettingPlan';
import style from './myGuess.module.scss';
import { useMyGuessStore, type MyPlans, type RecordItem } from './myGuessStore';
import NoData from '@/components/baseNoData/noData';

const tabList = [
    {
        label: '全部',
        href: '/userInfo/myGuess/?status=totale',
        status: 'totale'
    },
    {
        label: '让球',
        href: '/userInfo/myGuess/?status=handicap',
        status: 'handicap'
    },
    {
        label: '大小',
        href: '/userInfo/myGuess/?status=size',
        status: 'size'
    }
];

const planActiveMap = {
    totale: { dispaly: '全部', value: 'totale' },
    handicap: { dispaly: '让球', value: 'handicap' },
    size: { dispaly: '大小', value: 'size' }
};

function MyGuessMyPlans() {
    const [planActiveTab, setPlanActiveTab] = useState(planActiveMap.totale.value);
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
    const slideActive = planActiveTab ? tabList.findIndex(tab => tab.status === planActiveTab) : 0;

    return (
        <>
            <div className={style.title}>
                <span>我猜过的</span>
                <span className={style.record} onClick={handleOpenRecord}>
                    查看纪录
                </span>
            </div>
            <div className={style.btnTab}>
                <Slick slideActive={slideActive} styling="button" tabs={tabList}>
                    {Object.entries(planActiveMap).map(([key, value]) => (
                        <span
                            className={planActiveTab === value.value ? style.active : ''}
                            key={key}
                            onClick={() => {
                                handlePlanTabClick(value.value);
                            }}
                        >
                            {myPlansData.length > 0 ? (
                                myPlansData.map(item => (
                                    <BettingPlan key={item.id} rowData={item} />
                                ))
                            ) : (
                                <NoData />
                            )}
                        </span>
                    ))}
                </Slick>
            </div>
        </>
    );
}

export default MyGuessMyPlans;
