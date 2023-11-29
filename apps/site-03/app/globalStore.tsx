'use client';
import type { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { creatContestInfoStore } from './contestInfoStore';
import { creatUserStore } from './userStore';
import { creatNotificationStore } from './notificationStore';
import { creatAuthStore } from './(auth)/authStore';

function GlobalStore({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const query = searchParams.get('auth');

    creatContestInfoStore({ contestInfo: {} });
    creatUserStore({
        authQuery: query ? query : ''
    });
    creatNotificationStore({
        message: '',
        type: 'success',
        isVisible: false
    });
    creatAuthStore({
        loading: false
    });

    return <>{children}</>;
}

export default GlobalStore;
