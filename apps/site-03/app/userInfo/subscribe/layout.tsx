'use client';
import type { ReactNode } from 'react';
import { creatSubscriberStore } from './subscribeStore';

function SubscribeLayout({ children }: { children: ReactNode }) {
    creatSubscriberStore({
        yearPlanList: [],
        planList: []
    });

    return <>{children}</>;
}

export default SubscribeLayout;
