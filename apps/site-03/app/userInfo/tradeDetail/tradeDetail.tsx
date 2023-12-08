'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import style from './tradeDetail.module.scss';
import { creatTardeDetailStore } from './tradeDetailStore';
import FilterIcon from './img/filterIcon.png';
import TradeDetailList from './tradeDetailList';
import DateRangeOption from './components/dateRangeDrawer/dateRangeOption';
import TradeTypeOption from './components/tradeTypeDrawer/tradeTypeDrawer';
import Header from '@/components/header/headerTitleDetail';

function TradeDetail() {
    const router = useRouter();
    const back = () => {
        router.push('/userInfo');
    };
    const [isDateRangeOpen, setDateRangeOpen] = useState(false);
    // const [dateRange, setDateRange] = useState<(number | null)[]>([]);
    const [isTradeTypeOpen, setTradeTypeOpen] = useState(false);
    // const [tradeType, setTradeType] = useState();

    const openOption = (value: 'dateRange' | 'tradeType') => {
        value === 'dateRange' ? setDateRangeOpen(true) : setTradeTypeOpen(true);
    };

    creatTardeDetailStore({
        tradeDetailList: [
            {
                id: 111,
                type: 'recharge',
                data: {
                    currency: 'USDT',
                    exchangeRate: 2345,
                    time: '2023-10-20 13:19',
                    tradeNumber: '2SFJIJLEPQHV666',
                    result: 1000,
                    status: 'completed',
                    overage: 2200
                }
            },
            {
                id: 222,
                type: 'recharge',
                data: {
                    currency: 'USDT',
                    exchangeRate: 2345,
                    time: '2023-10-20 13:19',
                    tradeNumber: '7SFJIJLEPQHV666',
                    result: 1000,
                    status: 'inProgress',
                    overage: 2200
                }
            },
            {
                id: 333,
                type: 'recharge',
                data: {
                    currency: 'USDT',
                    exchangeRate: 2345,
                    time: '2023-10-20 13:19',
                    tradeNumber: '0SFJIJLEPQHV666',
                    result: 1000,
                    status: 'fail',
                    overage: 2200
                }
            },
            {
                id: 444,
                type: 'payment',
                data: {
                    type: 1,
                    time: '2023-10-20 13:19',
                    result: -200,
                    overage: 800
                }
            },
            {
                id: 555,
                type: 'payment',
                data: {
                    type: 2,
                    time: '2023-10-20 13:19',
                    result: -200,
                    overage: 800
                }
            },
            {
                id: 666,
                type: 'income',
                data: {
                    type: 3,
                    time: '2023-10-20 13:19',
                    result: 200,
                    overage: 800
                }
            },
            {
                id: 777,
                type: 'income',
                data: {
                    type: 4,
                    time: '2023-10-20 13:19',
                    result: 100,
                    overage: 800
                }
            }
        ]
    });

    return (
        <>
            <Header back={back} title="交易明细" />
            <div className={style.tradeDetail}>
                <p>交易明细</p>
                <div className={style.selectBlock}>
                    <div
                        className={style.filterButton}
                        onClick={() => {
                            openOption('dateRange');
                        }}
                    >
                        <span> 开赛时间</span>
                        <Image alt="filterIcon" src={FilterIcon} />
                    </div>
                    <div
                        className={style.filterButton}
                        onClick={() => {
                            openOption('tradeType');
                        }}
                    >
                        <span>盘路</span>
                        <Image alt="filterIcon" src={FilterIcon} />
                    </div>
                </div>
                <TradeDetailList />
                <DateRangeOption
                    isDateRangeOpen={isDateRangeOpen}
                    // setDateRange={setDateRange}
                    setDateRangeOpen={setDateRangeOpen}
                />
                <TradeTypeOption
                    isTradeTypeOpen={isTradeTypeOpen}
                    // setTradeType={setTradeType}
                    setTradeTypeOpen={setTradeTypeOpen}
                />
            </div>
        </>
    );
}

export default TradeDetail;
