'use client';
import type { ReactNode } from 'react';
import { creatSubscriberStore } from './subscribeStore';

function SubscribeLayout({ children }: { children: ReactNode }) {
    creatSubscriberStore({
        planList: [
            { planId: 1, period: 200, discount: '体验包', price: 120 },
            { planId: 2, period: 600, discount: '5折', price: 280 },
            { planId: 3, period: 1000, discount: '5折', price: 450 },
            { planId: 4, period: 2000, discount: '5折+优惠', price: 900 }
        ]
    });

    return <>{children}</>;
}

export default SubscribeLayout;
