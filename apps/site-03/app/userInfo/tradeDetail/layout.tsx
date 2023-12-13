'use client';
import type { ReactNode } from 'react';
import { creatTardeDetailStore } from './tradeDetailStore';

function TardeLayout({ children }: { children: ReactNode }) {
    creatTardeDetailStore({
        tradeDetailList: [
            {
                id: 111,
                changeTypeCategory: 'recharge',
                data: {
                    changeTypeDisplayName: '充值-男模會館大禮包',
                    currency: 'USDT',
                    exchangeRate: 2345,
                    createdAt: 12345678,
                    rechargeId: '2SFJIJLEPQHV666',
                    amountOfChange: 1000,
                    rechargeStatus: 'succes',
                    balanceAfter: 2200
                }
            },
            {
                id: 222,
                changeTypeCategory: 'recharge',
                data: {
                    changeTypeDisplayName: '充值-包月訂閱',
                    currency: 'USDT',
                    exchangeRate: 2345,
                    createdAt: 12345678,
                    rechargeId: '7SFJIJLEPQHV666',
                    amountOfChange: 1000,
                    rechargeStatus: 'padding',
                    balanceAfter: 2200
                }
            },
            {
                id: 333,
                changeTypeCategory: 'recharge',
                data: {
                    changeTypeDisplayName: '充值-男模會館大禮包',
                    currency: 'USDT',
                    exchangeRate: 2345,
                    createdAt: 12345678,
                    rechargeId: '0SFJIJLEPQHV666',
                    amountOfChange: 1000,
                    rechargeStatus: 'fail',
                    balanceAfter: 2200
                }
            },
            {
                id: 444,
                changeTypeCategory: 'payment',
                data: {
                    changeTypeDisplayName: '支付-包月女郎',
                    type: 1,
                    createdAt: 12345678,
                    amountOfChange: -200,
                    balanceAfter: 800
                }
            },
            {
                id: 555,
                changeTypeCategory: 'payment',
                data: {
                    changeTypeDisplayName: '支付-解锁高手分布',
                    type: 2,
                    createdAt: 12345678,
                    amountOfChange: -200,
                    balanceAfter: 800
                }
            },
            {
                id: 666,
                changeTypeCategory: 'income',
                data: {
                    changeTypeDisplayName: '獎勵-你是貓奴好棒',
                    type: 3,
                    createdAt: 12345678,
                    amountOfChange: 200,
                    balanceAfter: 800
                }
            },
            {
                id: 777,
                changeTypeCategory: 'income',
                data: {
                    changeTypeDisplayName: '獎勵-手鏟貓砂好棒',
                    type: 4,
                    createdAt: 12345678,
                    amountOfChange: 100,
                    balanceAfter: 800
                }
            }
        ]
    });

    return <>{children}</>;
}

export default TardeLayout;
