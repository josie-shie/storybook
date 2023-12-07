'use client';
import { useState } from 'react';
import { Tab, Tabs } from 'ui';
import BettingPlan from './components/bettingPlan/bettingPlan';
import style from './myGuess.module.scss';
import { useMyGuessStore, type MyPlans } from './myGuessStore';
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

    const handlePlanTabClick = (tabName: string) => {
        setPlanActiveTab(tabName);
    };

    const handleOpenRecord = () => {
        openRecord(true);
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
