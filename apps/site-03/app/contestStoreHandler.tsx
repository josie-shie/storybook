'use client';
import { useEffect } from 'react';
import { getContestList, getMemberInfo } from 'data-center';
import Cookies from 'js-cookie';
import { createContestListGlobalStore } from './contestListGlobalStore';
import { useUserStore } from './userStore';
import { useNotificationStore } from './notificationStore';

function ContestStoreHandler() {
    const setUserInfo = useUserStore.use.setUserInfo();
    const setIsLogin = useUserStore.use.setIsLogin();
    const setToken = useUserStore.use.setToken();
    const isCookieExist = Cookies.get('access');
    const setNotificationVisible = useNotificationStore.use.setIsVisible();

    useEffect(() => {
        const fetchData = async () => {
            const timestamp = Math.floor(Date.now() / 1000);
            const todayContest = await getContestList(timestamp);
            if (todayContest.success) {
                createContestListGlobalStore(todayContest.data);
            }
        };

        const getUserInfo = async () => {
            const res = await getMemberInfo();

            if (res.success && isCookieExist) {
                setUserInfo(res.data);
                setIsLogin(true);
                setToken(isCookieExist);
            } else {
                setNotificationVisible('登陆已过期，请重新登陆', 'error');
            }
        };

        void fetchData();
        if (isCookieExist) {
            void getUserInfo();
        }
    }, []);

    return null;
}

export default ContestStoreHandler;
