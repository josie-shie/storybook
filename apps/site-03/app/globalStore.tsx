'use client';
import type { ReactNode } from 'react';
import { creatContestInfoStore } from './contestInfoStore';
import { creatUserStore } from './userStore';
import { creatNotificationStore } from './notificationStore';

function GlobalStore({ children }: { children: ReactNode }) {
    creatContestInfoStore({ contestInfo: {} });
    creatUserStore({
        token: ''
    });
    creatNotificationStore({
        message: '',
        type: 'success',
        isVisible: false
    });
    return <>{children}</>;
}

export default GlobalStore;
