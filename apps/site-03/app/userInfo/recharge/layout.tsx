'use client';
import type { ReactNode } from 'react';
import { creatRechargeStore } from './rechargeStore';

function DetailLayout({ children }: { children: ReactNode }) {
    creatRechargeStore({
        planList: []
    });

    return <>{children}</>;
}

export default DetailLayout;
