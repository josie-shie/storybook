'use client';
import { Select } from '../recharge/components/select/select';
import style from './tradeDetail.module.scss';
import { creatTardeDetailStore } from './tradeDetailStore';
import TradeDetailList from './tradeDetailList';
import Header from '@/components/header/headerTitleDetail';

const dateOptions = [{ label: '今天', value: 'today' }];
const typeOption = [{ label: '全部', value: 'total' }];

function TradeDetail() {
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
            <Header title="交易明細" />
            <div className={style.tradeDetail}>
                <p>交易明細</p>
                <div className={style.selectBlock}>
                    <Select options={dateOptions} showDragBar value="today" />
                    <Select options={typeOption} showDragBar value="total" />
                </div>
                <TradeDetailList />
            </div>
        </>
    );
}

export default TradeDetail;
