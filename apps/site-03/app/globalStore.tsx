'use client';
import type { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { creatContestInfoStore } from './contestInfoStore';
import { creatUserStore } from './userStore';
import { creatNotificationStore } from './notificationStore';

function GlobalStore({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const query = searchParams.get('auth');

    creatContestInfoStore({ contestInfo: {} });
    creatUserStore({
        token: '',
        authQuery: query ? query : ''
    });
    creatNotificationStore({
        message: '',
        type: 'success',
        isVisible: false
    });
    return <>{children}</>;
}

export default GlobalStore;
