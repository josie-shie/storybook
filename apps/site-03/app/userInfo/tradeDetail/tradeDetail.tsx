'use client';
import { useEffect, useState, useRef } from 'react';
import { getMemberTransactionList, type ChangeTypeCategory } from 'data-center';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@mui/material';
import ScrollTop from '@/components/scrollTop/scrollTop';
import Header from '@/components/header/headerTitleDetail';
import { useUserStore } from '@/store/userStore';
import style from './tradeDetail.module.scss';
import FilterIcon from './img/filterIcon.svg';
import TradeDetailList from './tradeDetailList';
import DateRangeDrawer from './components/dateOptionDrawer/dateOptionDrawer';
import TradeTypeDrawer from './components/tradeTypeDrawer/tradeTypeDrawer';
import { useTardeDetailStore, type DateOption } from './tradeDetailStore';
import { dateOption, tradeOption } from './options';

function DetailSkeleton() {
    return (
        <>
            {Array.from({ length: 9 }).map((_, idx) => (
                <div className={style.skeletonBox} key={`${idx.toString()}`}>
                    <Skeleton animation="wave" height={32} variant="circular" width={32} />
                    <div className={style.center}>
                        <Skeleton animation="wave" height={24} width={70} />
                        <Skeleton animation="wave" height={16} width={120} />
                    </div>
                    <div className={style.right}>
                        <h1>球币 0</h1>
                        <p>可用馀额：0</p>
                    </div>
                </div>
            ))}
        </>
    );
}

function TradeDetail() {
    const setTradeDetailList = useTardeDetailStore.use.setTradeDetailList();
    const setIsTradeListUnread = useUserStore.use.setIsTradeListUnread();
    const router = useRouter();
    const scrollTradeRef = useRef<HTMLDivElement>(null);
    const back = () => {
        setIsTradeListUnread(false);
        router.push('/userInfo');
    };
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
            <div className={style.tradeDetail} ref={scrollTradeRef}>
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
                        <FilterIcon />
                    </div>
                    <div
                        className={style.filterButton}
                        onClick={() => {
                            openOption('tradeType');
                        }}
                    >
                        <span>{tradeOption.find(option => option.value === tradeType)?.label}</span>
                        <FilterIcon />
                    </div>
                </div>
                {isLoading ? (
                    <DetailSkeleton />
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
            <ScrollTop hasFooter={false} scrollContainerRef={scrollTradeRef} />
        </>
    );
}

export default TradeDetail;
