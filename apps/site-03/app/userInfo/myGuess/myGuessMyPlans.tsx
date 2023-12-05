'use client';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Slick } from 'ui';
import BettingPlan from './components/bettingPlan/bettingPlan';
import style from './myGuess.module.scss';
import { useMyGuessStore, type MyPlans } from './myGuessStore';
import NoData from '@/components/baseNoData/noData';

interface MyGuessMyPlansProps {
    setShowFilter: Dispatch<SetStateAction<boolean>>;
}

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

function MyGuessMyPlans({ setShowFilter }: MyGuessMyPlansProps) {
    const [planActiveTab, setPlanActiveTab] = useState(planActiveMap.totale.value);

    const handlePlanTabClick = (tabName: string) => {
        setPlanActiveTab(tabName);
    };

    const myPlansData = useMyGuessStore.use.myGuess().myPlans[planActiveTab as keyof MyPlans];
    const slideActive = planActiveTab ? tabList.findIndex(tab => tab.status === planActiveTab) : 0;

    return (
        <>
            <div className={style.title}>
                <span>方案</span>
                <span
                    className={style.record}
                    onClick={() => {
                        setShowFilter(true);
                    }}
                >
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
