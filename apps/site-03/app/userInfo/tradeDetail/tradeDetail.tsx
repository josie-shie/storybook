'use client';
import { Select } from '../recharge/components/select/select';
import style from './tradeDetail.module.scss';
import TradeItem from './tradeItem/tradeItem';
import Header from '@/components/header/headerTitleDetail';

const dateOptions = [{ label: '今天', value: 'today' }];

const typeOption = [{ label: '全部', value: 'total' }];

interface ItemData {
    currency: string;
    exchangeRate: number;
    time: string;
    tradeNumber: string;
    result: number;
    status: 'inProgress' | 'fail' | 'completed';
    overage: number;
}

const data: { id: number; type: 'recharge' | 'payment' | 'income'; data: ItemData }[] = [
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
    }
];

function TradeDetail() {
    return (
        <>
            <Header title="交易明細" />
            <div className={style.tradeDetail}>
                <p>交易明細</p>
                <div className={style.selectBlock}>
                    <Select options={dateOptions} showDragBar value="today" />
                    <Select options={typeOption} showDragBar value="total" />
                </div>
                {data.map(item => {
                    if (item.type === 'recharge')
                        return <TradeItem data={item.data} key={item.id} />;
                    return <div key={item.id}>收支</div>;
                })}
            </div>
        </>
    );
}

export default TradeDetail;
