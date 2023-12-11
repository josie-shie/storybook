'use client';
import type { ReactNode } from 'react';
import { creatSubscriberStore } from './subscribeStore';

function SubscribeLayout({ children }: { children: ReactNode }) {
    creatSubscriberStore({
        yearPlanList: [],
        planList: [
            { planId: 1, period: 200, discount: '体验包', price: 120, freePlan: 2, unlock: 1 },
            { planId: 2, period: 600, discount: '5折', price: 280, freePlan: 6, unlock: 4 },
            { planId: 3, period: 1000, discount: '5折', price: 450, freePlan: 12, unlock: 8 },
            { planId: 4, period: 2000, discount: '5折+优惠', price: 900, freePlan: 24, unlock: 16 }
        ]
    });

    return <>{children}</>;
}

export default SubscribeLayout;
