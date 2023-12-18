'use client';
import type { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import type {
    GetMemberInfoResponse,
    GetMemberSubscriptionStatusResponse,
    TagType
} from 'data-center';
import { creatContestInfoStore } from './contestInfoStore';
import { createMessageStore } from './messageStore';
import { creatUserStore } from './userStore';
import { creatNotificationStore } from './notificationStore';
import { creatAuthStore } from './(auth)/authStore';

function GlobalStore({ children }: { children: ReactNode }) {
    const searchParams = useSearchParams();
    const query = searchParams.get('auth');
    const invite = searchParams.get('invitCode');

    creatContestInfoStore({ contestInfo: {} });
    createMessageStore({ forbiddenWords: [] });
    creatUserStore({
        inviteCode: invite ? invite : '',
        authQuery: query ? query : '',
        userInfo: {} as GetMemberInfoResponse,
        tags: {} as TagType,
        memberSubscribeStatus: {} as GetMemberSubscriptionStatusResponse
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
