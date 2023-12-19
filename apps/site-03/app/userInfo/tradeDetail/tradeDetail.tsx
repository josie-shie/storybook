'use client';
import { useEffect, useState } from 'react';
import { getMemberTransactionList } from 'data-center';
import Image from 'next/image';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/headerTitleDetail';
import Loading from '@/components/loading/loading';
import style from './tradeDetail.module.scss';
import FilterIcon from './img/filterIcon.png';
import TradeDetailList from './tradeDetailList';
import DateRangeDrawer from './components/dateOptionDrawer/dateOptionDrawer';
import TradeTypeDrawer from './components/tradeTypeDrawer/tradeTypeDrawer';
import { useTardeDetailStore, type DateOption, type TradeTypeOption } from './tradeDetailStore';

function TradeDetail() {
    const router = useRouter();
    const back = () => {
        router.push('/userInfo');
    };
    const setTradeDetailList = useTardeDetailStore.use.setTradeDetailList();
    const dateOption = useTardeDetailStore.use.dateOption();
    const tradeOption = useTardeDetailStore.use.tradeOption();
    const [isLoading, setIsLoading] = useState(false);
    const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
    const [isTradeTypeOpen, setIsTradeTypeOpen] = useState(false);
    const [activeDate, setActiveDate] = useState<DateOption>('ALL');
    const [tradeType, setTradeType] = useState<TradeTypeOption>('ALL');
    const [start, setStart] = useState<number | undefined>();
    const [end, setEnd] = useState<number | undefined>();

    const openOption = (value: 'dateRange' | 'tradeType') => {
        value === 'dateRange' ? setIsDateRangeOpen(true) : setIsTradeTypeOpen(true);
    };

    const dateDisplay = (startDate: number | undefined, endDate: number | undefined) => {
        const startDisplay = dayjs(startDate).format('YYYY/MM/DD');
        const endDisplay = dayjs(endDate).format('YYYY/MM/DD');
        return end ? `${startDisplay} - ${endDisplay}` : startDisplay;
    };

    useEffect(() => {
        const initFetch = async () => {
            setIsLoading(true);
            const data = await getMemberTransactionList({
                // TODO 等後端改 選全部 時間要帶0
                startTime: 1,
                endTime: 1702813684,
                changeTypeCategory: 'ALL',
                currencyPage: 1,
                prepage: 20
            });
            if (data.success) {
                setTradeDetailList({
                    detailList: data.data.list,
                    pagination: {
                        pageCount: data.data.totalPages,
                        totalCount: data.data.totalCount
                    }
                });
            }
            setIsLoading(false);
        };
        void initFetch();
    }, [setTradeDetailList]);

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
                        <span>
                            {activeDate === 'RANGE'
                                ? dateDisplay(start, end)
                                : dateOption.find(option => option.value === activeDate)?.label}
                        </span>
                        <Image alt="filterIcon" src={FilterIcon} />
                    </div>
                    <div
                        className={style.filterButton}
                        onClick={() => {
                            openOption('tradeType');
                        }}
                    >
                        <span>{tradeOption.find(option => option.value === tradeType)?.label}</span>
                        <Image alt="filterIcon" src={FilterIcon} />
                    </div>
                </div>
                {isLoading ? (
                    <div className={style.loaderBox}>
                        <Loading />
                    </div>
                ) : (
                    <TradeDetailList end={end} start={start} tradeType={tradeType} />
                )}
                <DateRangeDrawer
                    activeDate={activeDate}
                    isDateRangeOpen={isDateRangeOpen}
                    setActiveDate={setActiveDate}
                    setEndDate={setEnd}
                    setIsDateRangeOpen={setIsDateRangeOpen}
                    setStartDate={setStart}
                    tradeType={tradeType}
                />
                <TradeTypeDrawer
                    end={end}
                    isTradeTypeOpen={isTradeTypeOpen}
                    setIsTradeTypeOpen={setIsTradeTypeOpen}
                    setTradeType={setTradeType}
                    start={start}
                    tradeType={tradeType}
                />
            </div>
        </>
    );
}

export default TradeDetail;
