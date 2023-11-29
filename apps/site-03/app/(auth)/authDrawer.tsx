'use client';
import { useEffect, type ReactNode } from 'react';
import Image from 'next/image';
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

    useEffect(() => {
        if (content) {
            setIsDrawerOpen(true);
        }
    }, []);

    return (
        <BottomDrawer
            isOpen={isDrawerOpen}
            onClose={() => {
                setIsDrawerOpen(false);
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
                            setIsDrawerOpen(false);
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
