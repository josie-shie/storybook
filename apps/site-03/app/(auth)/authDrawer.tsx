'use client';
import { useEffect, type ReactNode } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { getMemberInfo } from 'data-center';
import { useNotificationStore } from '../notificationStore';
import { useAuthStore } from './authStore';
import style from './authDrawer.module.scss';
import closeIcon from './components/authComponent/img/closeIcon.png';
import headerBg from './components/authComponent/img/headerBg.jpeg';
import Register from '@/app/(auth)/register/register';
import Login from '@/app/(auth)/login/login';
import { useUserStore } from '@/app/userStore';
import ForgetPassword from '@/app/(auth)/forgetPassword/forgetPassword';
import ChangePassword from '@/app/(auth)/changePassword/changePassword';
import BottomDrawer from '@/components/drawer/bottomDrawer';

function AuthDrawer() {
    const authQuery = useUserStore.use.authQuery();
    const isDrawerOpen = useAuthStore.use.isDrawerOpen();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const removeAuthQuery = useAuthStore.use.removeAuthQuery();
    const setUserInfo = useUserStore.use.setUserInfo();
    const setIsLogin = useUserStore.use.setIsLogin();
    const setToken = useUserStore.use.setToken();
    const isCookieExist = Cookies.get('access');
    const setNotificationVisible = useNotificationStore.use.setIsVisible();

    let content: ReactNode;
    let title: ReactNode;
    if (authQuery === 'register') {
        content = <Register />;
        title = <p>注册</p>;
    } else if (authQuery === 'login') {
        content = <Login />;
        title = (
            <p className={style.futureTitle}>
                <span className={style.future}>未来</span>体育
            </p>
        );
    } else if (authQuery === 'forgetPassword') {
        content = <ForgetPassword />;
        title = <p>忘记密码</p>;
    } else if (authQuery === 'changePassword') {
        content = <ChangePassword />;
        title = <p>修改密码</p>;
    } else {
        content = null;
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        removeAuthQuery();
    };

    const getUserInfo = async () => {
        const res = await getMemberInfo();

        // 曾經登陸過
        if (isCookieExist) {
            if (res.success) {
                setUserInfo(res.data);
                setIsLogin(true);
                setToken(isCookieExist);
                removeAuthQuery();
            } else {
                setNotificationVisible('登陆已过期，请重新登陆', 'error');
            }
            // 沒有登陸過但是有帶auth query
        } else if (content) {
            setIsDrawerOpen(true);
        }
    };

    useEffect(() => {
        if (isCookieExist) {
            void getUserInfo();
            return;
        }

        if (content) {
            setIsDrawerOpen(true);
        }
    }, []);

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
                backgroundColor: '#1665df'
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
                    {content}
                </div>
            </div>
        </BottomDrawer>
    );
}

export default AuthDrawer;
