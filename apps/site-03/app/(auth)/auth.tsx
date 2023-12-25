'use client';
import type {
    GetMemberInfoResponse,
    GetMemberSubscriptionStatusResponse,
    TagType
} from 'data-center';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import { creatUserStore } from '@/app/userStore';
import AuthDrawer from './authDrawer';

function Auth({ userInfo }: { userInfo: null | GetMemberInfoResponse }) {
    const isCookieExist = Cookies.get('access');
    const searchParams = useSearchParams();
    const query = searchParams.get('auth');
    const invite = searchParams.get('inviteCode');

    const info = isCookieExist
        ? {
              inviteCode: invite ? invite : '',
              authQuery: query ? query : '',
              userInfo: userInfo || ({} as GetMemberInfoResponse),
              tags: userInfo ? userInfo.tags : ({} as TagType),
              memberSubscribeStatus: {} as GetMemberSubscriptionStatusResponse,
              token: isCookieExist || '',
              isLogin: true
          }
        : {
              inviteCode: invite ? invite : '',
              authQuery: query ? query : '',
              userInfo: {} as GetMemberInfoResponse,
              tags: {} as TagType,
              memberSubscribeStatus: {} as GetMemberSubscriptionStatusResponse,
              token: isCookieExist || '',
              isLogin: false
          };

    creatUserStore(info);

    return <AuthDrawer />;
}

export default Auth;
