'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import style from './tradeDetail.module.scss';
import FilterIcon from './img/filterIcon.png';
import TradeDetailList from './tradeDetailList';
import DateRangeDrawer from './components/dateOptionDrawer/dateOptionDrawer';
import TradeTypeDrawer from './components/tradeTypeDrawer/tradeTypeDrawer';
// import { useUserStore } from '@/app/userStore';
import {
    useTardeDetailStore,
    type DateOption,
    type TradeTypeOption,
    type TradeDetailItem
} from './tradeDetailStore';
import Header from '@/components/header/headerTitleDetail';

function TradeDetail() {
    const DateMap = {
        all: '全部时间',
        today: '今日',
        week: '最近一週',
        month: '最近一个月',
        threeMonths: '最近三个月'
    };
    const TypeMap = {
        all: '全部分类',
        deposit: '充值',
        inCome: '收入',
        expend: '支付'
    };

    const router = useRouter();
    const back = () => {
        router.push('/userInfo');
    };
    const setTradeDetailList = useTardeDetailStore.use.setTradeDetailList();
    // const memberId = useUserStore.use.userInfo().uid;
    const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
    const [isTradeTypeOpen, setIsTradeTypeOpen] = useState(false);
    const [activeDate, setActiveDate] = useState<DateOption>('all');
    const [tradeType, setTradeType] = useState<TradeTypeOption>('all');
    const [startDate, setStartDate] = useState<number>();
    const [endDate, setEndDate] = useState<number>();

    const openOption = (value: 'dateRange' | 'tradeType') => {
        value === 'dateRange' ? setIsDateRangeOpen(true) : setIsTradeTypeOpen(true);
    };

    const fetchData = (
        start: number | undefined,
        end: number | undefined,
        type: TradeTypeOption
    ) => {
        // await fetchData({ memberId, startDate: start, endDate: end });
        return [
            {
                id: 111,
                changeTypeCategory: type,
                data: {
                    changeTypeDisplayName: '充值-男模會館大禮包',
                    currency: 'USDT',
                    exchangeRate: 2345,
                    createdAt: start,
                    rechargeId: '2SFJIJLEPQHV666',
                    amountOfChange: 1000,
                    rechargeStatus: 'succes',
                    balanceAfter: 2200
                }
            },
            {
                id: 222,
                changeTypeCategory: type,
                data: {
                    changeTypeDisplayName: '充值-包月訂閱',
                    currency: 'USDT',
                    exchangeRate: 2345,
                    createdAt: end,
                    rechargeId: '7SFJIJLEPQHV666',
                    amountOfChange: 1000,
                    rechargeStatus: 'padding',
                    balanceAfter: 2200
                }
            }
        ];
    };

    const handleChangeOption = ({ start = startDate, end = endDate, type = tradeType } = {}) => {
        const newData = fetchData(start, end, type);
        setTradeDetailList(newData as TradeDetailItem[]);
    };

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
                        <span>{DateMap[activeDate]}</span>
                        <Image alt="filterIcon" src={FilterIcon} />
                    </div>
                    <div
                        className={style.filterButton}
                        onClick={() => {
                            openOption('tradeType');
                        }}
                    >
                        <span>{TypeMap[tradeType]}</span>
                        <Image alt="filterIcon" src={FilterIcon} />
                    </div>
                </div>
                <TradeDetailList />
                <DateRangeDrawer
                    activeDate={activeDate}
                    handleChangeOption={handleChangeOption}
                    isDateRangeOpen={isDateRangeOpen}
                    setActiveDate={setActiveDate}
                    setEndDate={setEndDate}
                    setIsDateRangeOpen={setIsDateRangeOpen}
                    setStartDate={setStartDate}
                />
                <TradeTypeDrawer
                    handleChangeOption={handleChangeOption}
                    isTradeTypeOpen={isTradeTypeOpen}
                    setIsTradeTypeOpen={setIsTradeTypeOpen}
                    setTradeType={setTradeType}
                    tradeType={tradeType}
                />
            </div>
        </>
    );
}

export default TradeDetail;
