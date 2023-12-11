'use client';
import type { ReactNode } from 'react';
import { creatTardeDetailStore } from './tradeDetailStore';

function TardeLayout({ children }: { children: ReactNode }) {
    creatTardeDetailStore({
        tradeDetailList: [
            {
                id: 111,
                tradeType: 'deposit',
                data: {
                    currency: 'USDT',
                    exchangeRate: 2345,
                    time: 444444444,
                    tradeNumber: '2SFJIJLEPQHV666',
                    result: 1000,
                    status: 'completed',
                    overage: 2200
                }
            },
            {
                id: 222,
                tradeType: 'inCome',
                data: {
                    currency: 'USDT',
                    exchangeRate: 2345,
                    time: 444444444,
                    tradeNumber: '7SFJIJLEPQHV666',
                    result: 1000,
                    status: 'inProgress',
                    overage: 2200
                }
            },
            {
                id: 333,
                tradeType: 'expend',
                data: {
                    currency: 'USDT',
                    exchangeRate: 2345,
                    time: 444444444,
                    tradeNumber: '0SFJIJLEPQHV666',
                    result: 1000,
                    status: 'fail',
                    overage: 2200
                }
            },
            {
                id: 444,
                tradeType: 'deposit',
                data: {
                    type: 1,
                    time: 444444444,
                    result: -200,
                    overage: 800
                }
            },
            {
                id: 555,
                tradeType: 'inCome',
                data: {
                    type: 2,
                    time: 444444444,
                    result: -200,
                    overage: 800
                }
            },
            {
                id: 666,
                tradeType: 'expend',
                data: {
                    type: 3,
                    time: 444444444,
                    result: 200,
                    overage: 800
                }
            },
            {
                id: 777,
                tradeType: 'income',
                data: {
                    type: 4,
                    time: 444444444,
                    result: 100,
                    overage: 800
                }
            }
        ]
    });

    return <>{children}</>;
}

export default TardeLayout;
