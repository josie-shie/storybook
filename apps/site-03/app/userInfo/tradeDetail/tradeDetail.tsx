'use client';
import { useEffect, useState } from 'react';
import { getMemberTransactionList, type ChangeTypeCategory } from 'data-center';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/headerTitleDetail';
import Loading from '@/components/loading/loading';
import style from './tradeDetail.module.scss';
import FilterIcon from './img/filterIcon.png';
import TradeDetailList from './tradeDetailList';
import DateRangeDrawer from './components/dateOptionDrawer/dateOptionDrawer';
import TradeTypeDrawer from './components/tradeTypeDrawer/tradeTypeDrawer';
import { useTardeDetailStore, type DateOption } from './tradeDetailStore';
import { dateOption, tradeOption } from './options';

function TradeDetail() {
    const router = useRouter();
    const back = () => {
        router.push('/userInfo');
    };
    const setTradeDetailList = useTardeDetailStore.use.setTradeDetailList();
    const [isLoading, setIsLoading] = useState(false);
    const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
    const [isTradeTypeOpen, setIsTradeTypeOpen] = useState(false);
    const [activeDate, setActiveDate] = useState<DateOption>('ALL');
    const [dateDisplay, setDateDisplay] = useState<string>();
    const [tradeType, setTradeType] = useState<ChangeTypeCategory>('ALL');
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const openOption = (value: 'dateRange' | 'tradeType') => {
        value === 'dateRange' ? setIsDateRangeOpen(true) : setIsTradeTypeOpen(true);
    };

    useEffect(() => {
        const initFetch = async () => {
            setIsLoading(true);
            const data = await getMemberTransactionList({
                startTime: 0,
                endTime: 0,
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
                                ? dateDisplay
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
                    <TradeDetailList
                        end={end}
                        page={page}
                        setPage={setPage}
                        start={start}
                        tradeType={tradeType}
                    />
                )}
                <DateRangeDrawer
                    activeDate={activeDate}
                    isDateRangeOpen={isDateRangeOpen}
                    setActiveDate={setActiveDate}
                    setDateDisplay={setDateDisplay}
                    setEndDate={setEnd}
                    setIsDateRangeOpen={setIsDateRangeOpen}
                    setPage={setPage}
                    setStartDate={setStart}
                    tradeType={tradeType}
                />
                <TradeTypeDrawer
                    end={end}
                    isTradeTypeOpen={isTradeTypeOpen}
                    setIsTradeTypeOpen={setIsTradeTypeOpen}
                    setPage={setPage}
                    setTradeType={setTradeType}
                    start={start}
                    tradeType={tradeType}
                />
            </div>
        </>
    );
}

export default TradeDetail;
