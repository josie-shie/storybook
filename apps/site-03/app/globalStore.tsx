'use client';
import type { ReactNode } from 'react';
import { creatContestInfoStore } from './contestInfoStore';
import { createMessageStore } from './messageStore';
import { creatNotificationStore } from './notificationStore';
import { creatAuthStore } from './(auth)/authStore';

function GlobalStore({ children }: { children: ReactNode }) {
    creatContestInfoStore({ contestInfo: {} });
    createMessageStore({
        forbiddenWords: [],
        newMessageNotify: { uid: '0', sender: '', roomId: '', number: 0 },
        unreadMessageNotify: { uid: '0', totalCount: 0, chatCount: 0, mailCount: 0 },
        isNewMessageVisible: false
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
