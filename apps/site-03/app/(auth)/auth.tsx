'use client';
import type {
    GetMemberInfoResponse,
    GetMemberSubscriptionStatusResponse,
    TagType
} from 'data-center';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import { createUserStore } from '@/store/userStore';
import AuthDrawer from './authDrawer';

function Auth({ userInfo }: { userInfo: null | GetMemberInfoResponse }) {
    const isCookieExist = Cookies.get('access');
    const searchParams = useSearchParams();
    const query = searchParams.get('auth');
    const invite = searchParams.get('inviteCode');

    createUserStore({
        inviteCode: invite ? invite : '',
        authQuery: query ? query : '',
        isTradeListUnread: false,
        userInfo: userInfo || ({} as GetMemberInfoResponse),
        tags: userInfo ? userInfo.tags : ({} as TagType),
        memberSubscribeStatus: {} as GetMemberSubscriptionStatusResponse,
        token: isCookieExist || '',
        isLogin: Boolean(isCookieExist)
    });

    return <AuthDrawer />;
}

export default Auth;
