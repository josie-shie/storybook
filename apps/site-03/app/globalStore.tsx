'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { getContestList } from 'data-center';
import { createMessageStore } from '@/store/messageStore';
import { createNotificationStore } from '@/store/notificationStore';
import { createLiveContestStore } from '@/store/liveContestStore';
import { createAuthStore } from '@/store/authStore';
import {
    createContestListGlobalStore,
    useContestListGlobalStore
} from '@/store/contestListGlobalStore';
import { createInterceptPassStore } from '@/store/interceptPassStore';
import { createAppStateStore } from '@/store/appStateStore';
import { useContestListStore } from './(list)/contestListStore';

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

    const fetchData = async (isWorker = false) => {
        const timestamp = Math.floor(Date.now() / 1000);
        const todayContest = await getContestList(timestamp);
        if (todayContest.success) {
            if (!isWorker) {
                createContestListGlobalStore(todayContest.data);
            }

            if (typeof useContestListStore !== 'undefined' && isWorker) {
                useContestListGlobalStore
                    .getState()
                    .setContestList({ contestList: todayContest.data.contestList });
                useContestListGlobalStore
                    .getState()
                    .setContestInfo({ contestInfo: todayContest.data.contestInfo });
                useContestListStore
                    .getState()
                    .setContestList({ contestList: todayContest.data.contestList });
                useContestListStore
                    .getState()
                    .setContestInfo({ contestInfo: todayContest.data.contestInfo });
            }
        }
    };

    useEffect(() => {
        if (typeof Worker !== 'undefined') {
            const worker = new Worker(new URL('lib/src/matchUpdateWorker.ts', import.meta.url));

            worker.onmessage = event => {
                if (event.data === 'updateMatchData') {
                    void fetchData(true);
                }
            };

            worker.postMessage('setMatchWorker');

            return () => {
                worker.terminate();
            };
        }
    }, []);

    useEffect(() => {
        void fetchData();
    }, []);

    return <>{children}</>;
}

export default GlobalStore;
