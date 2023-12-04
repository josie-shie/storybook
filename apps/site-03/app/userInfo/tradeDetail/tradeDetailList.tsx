'use client';
import RechargeItem from './rechargeItem/rechargeItem';
import Payment from './payment/payment';
import { useTardeDetailStore, type RechargeData, type PaymentData } from './tradeDetailStore';
import NoData from '@/components/baseNoData/noData';

function TradeDetailList() {
    const tradeDetailList = useTardeDetailStore.use.tradeDetailList();
    return (
        <>
            {tradeDetailList.length > 0 ? (
                tradeDetailList.map(item =>
                    item.type === 'recharge' ? (
                        <RechargeItem data={item.data as RechargeData} key={item.id} />
                    ) : (
                        <Payment data={item.data as PaymentData} key={item.id} />
                    )
                )
            ) : (
                <NoData />
            )}
        </>
    );
}

export default TradeDetailList;
