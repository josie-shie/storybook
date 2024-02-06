'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { getContestList } from 'data-center';
import { createMessageStore } from '@/store/messageStore';
import { createNotificationStore } from '@/store/notificationStore';
import { createLiveContestStore } from '@/store/liveContestStore';
import { createAuthStore } from '@/store/authStore';
import { createContestListGlobalStore } from '@/store/contestListGlobalStore';
import { createInterceptPassStore } from '@/store/interceptPassStore';
import { createAppStateStore } from '@/store/appStateStore';

function GlobalStore({ children }: { children: ReactNode }) {
    createLiveContestStore({ contestInfo: {} });
    createInterceptPassStore({ interceptData: {} });
    createMessageStore({
        forbiddenWords: [],
        newMessageNotify: { uid: '0', sender: '', roomId: '', number: 0 },
        unreadMessageNotify: { uid: '0', totalCount: 0, chatCount: 0, mailCount: 0 },
        isNewMessageVisible: false
    });

    createNotificationStore({
        message: '',
        type: 'success',
        isVisible: false
    });

    createAuthStore({
        loading: false
    });

    createAppStateStore({
        isClientSide: false
    });

    useEffect(() => {
        const fetchData = async () => {
            const timestamp = Math.floor(Date.now() / 1000);
            const todayContest = await getContestList(timestamp);
            if (todayContest.success) {
                createContestListGlobalStore(todayContest.data);
            }
        };

        void fetchData();
    }, []);

    return <>{children}</>;
}

export default GlobalStore;
