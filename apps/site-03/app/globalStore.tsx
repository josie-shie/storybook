'use client';
import type { ReactNode } from 'react';
import { creatContestInfoStore } from './contestInfoStore';
import { createMessageStore } from './messageStore';
import { creatNotificationStore } from './notificationStore';
import { creatAuthStore } from './(auth)/authStore';

function GlobalStore({ children }: { children: ReactNode }) {
    creatContestInfoStore({ contestInfo: {} });
    createMessageStore({ forbiddenWords: [] });

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
