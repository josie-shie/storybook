'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { getMemberInfo, getMemberSubscriptionStatus } from 'data-center';
import Register from '@/app/(auth)/register/register';
import Login from '@/app/(auth)/login/login';
import { useUserStore } from '@/app/userStore';
import ForgetPassword from '@/app/(auth)/forgetPassword/forgetPassword';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import ChangePassword from '@/app/(auth)/changePassword/changePassword';
import { useNotificationStore } from '../notificationStore';
import { useAuthStore } from './authStore';
import style from './authDrawer.module.scss';
import closeIcon from './components/authComponent/img/closeIcon.png';
import headerBg from './components/authComponent/img/headerBg.jpeg';

function AuthDrawer() {
    const authQuery = useUserStore.use.authQuery();
    const isDrawerOpen = useAuthStore.use.isDrawerOpen();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const removeAuthQuery = useAuthStore.use.removeAuthQuery();
    const removeInvitCode = useAuthStore.use.removeInvitCode();
    const setUserInfo = useUserStore.use.setUserInfo();
    const setTags = useUserStore.use.setTags();
    const setMemberSubscribeStatus = useUserStore.use.setMemberSubscribeStatus();
    const setIsLogin = useUserStore.use.setIsLogin();
    const setToken = useUserStore.use.setToken();
    const isCookieExist = Cookies.get('access');
    const setNotificationVisible = useNotificationStore.use.setIsVisible();
    const setUserInfoIsLoading = useUserStore.use.setUserInfoIsLoading();
    const authContent = useAuthStore.use.authContent();
    const setAuthContent = useAuthStore.use.setAuthContent();
    const title = useAuthStore.use.title();
    const setTitle = useAuthStore.use.setTitle();

    const resetAuthContent = () => {
        if (authQuery === 'register') {
            setAuthContent(<Register />);
            setTitle(<p>注册</p>);
        } else if (authQuery === 'login') {
            setAuthContent(<Login />);
            setTitle(
                <p className={style.futureTitle}>
                    <span className={style.future}>未来</span>体育
                </p>
            );
        } else if (authQuery === 'forgetPassword') {
            setAuthContent(<ForgetPassword />);
            setTitle(<p>忘记密码</p>);
        } else if (authQuery === 'changePassword') {
            setAuthContent(<ChangePassword />);
            setTitle(<p>修改密码</p>);
        } else {
            setAuthContent(null);
            setTitle(null);
        }
    };

    const closeDrawer = () => {
        setAuthQuery('');
        setIsDrawerOpen(false);
        removeAuthQuery();
        removeInvitCode();
    };

    const getUserInfo = async () => {
        const res = await getMemberInfo();

        // 曾經登陸過
        if (isCookieExist) {
            if (res.success) {
                setUserInfo(res.data);
                setTags(res.data.tags);
                setIsLogin(true);
                setToken(isCookieExist);
                removeAuthQuery();
                removeInvitCode();
                const subscriptionRespons = await getMemberSubscriptionStatus({
                    memberId: res.data.uid
                });
                if (subscriptionRespons.success) {
                    setMemberSubscribeStatus(subscriptionRespons.data);
                }
            } else {
                setNotificationVisible('登陆已过期，请重新登陆', 'error');
            }
            // 沒有登陸過但是有帶auth query
        } else if (authContent) {
            setIsDrawerOpen(true);
        }
    };

    useEffect(() => {
        if (isCookieExist) {
            void getUserInfo();
            return;
        }

        setUserInfoIsLoading(false);
    }, []);

    useEffect(() => {
        resetAuthContent();
    }, [isDrawerOpen, authQuery]);

    return (
        <BottomDrawer
            isOpen={isDrawerOpen}
            onClose={() => {
                closeDrawer();
            }}
            onOpen={() => {
                setIsDrawerOpen(true);
            }}
            propsStyle={{
                height: '580px',
                backgroundColor: '#1665df',
                borderRadius: '16px 16px 0 0'
            }}
            topLineDisplay="none"
        >
            <div className={style.loginDrawer}>
                <div className={style.header} style={{ backgroundImage: `url(${headerBg.src})` }}>
                    <div className={style.title}>{title}</div>
                    <Image
                        alt=""
                        className={style.closeBtn}
                        height={16}
                        onClick={() => {
                            closeDrawer();
                        }}
                        src={closeIcon.src}
                        width={16}
                    />
                    {authContent}
                </div>
            </div>
        </BottomDrawer>
    );
}

export default AuthDrawer;
