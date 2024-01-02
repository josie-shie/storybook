'use client';
import { InfiniteScroll } from 'ui';
import { CircularProgress } from '@mui/material';
import { getMemberTransactionList } from 'data-center';
import NoData from '@/components/baseNoData/noData';
import RechargeItem from './rechargeItem/rechargeItem';
import Payment from './payment/payment';
import {
    useTardeDetailStore,
    type RechargeData,
    type PaymentData,
    type TradeTypeOption
} from './tradeDetailStore';
import style from './tradeDetail.module.scss';

interface TradeDetailListProps {
    end: number;
    start: number;
    tradeType: TradeTypeOption;
    page: number;
    setPage: (page: number) => void;
}

function TradeDetailList({ end, start, tradeType, page, setPage }: TradeDetailListProps) {
    const tradeDetailList = useTardeDetailStore.use.tradeDetailList().detailList;
    const pagination = useTardeDetailStore.use.tradeDetailList().pagination;
    const setTradeDetailList = useTardeDetailStore.use.setTradeDetailList();

    const loadMoreList = async () => {
        if (page === pagination.pageCount) return;
        const data = await getMemberTransactionList({
            startTime: start,
            endTime: end,
            changeTypeCategory: tradeType,
            currencyPage: page + 1,
            prepage: 20
        });
        if (data.success) {
            setTradeDetailList({
                detailList: tradeDetailList.concat(data.data.list),
                pagination: {
                    pageCount: data.data.totalPages,
                    totalCount: data.data.totalCount
                }
            });
            setPage(page + 1);
        }
    };

    return (
        <>
            {tradeDetailList.length > 0 ? (
                <>
                    {tradeDetailList.map(item =>
                        item.changeTypeCategory === 'RECHARGE' ? (
                            <RechargeItem data={item.data as RechargeData} key={item.balanceId} />
                        ) : (
                            <Payment data={item.data as PaymentData} key={item.balanceId} />
                        )
                    )}
                    {tradeDetailList.length < pagination.totalCount ? (
                        <InfiniteScroll onVisible={loadMoreList}>
                            <div className={style.loadMore}>
                                <CircularProgress size={24} />
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <div className={style.listEnd}>
                            <p>已滑到底啰</p>
                        </div>
                    )}
                </>
            ) : (
                <NoData />
            )}
        </>
    );
}

export default TradeDetailList;
