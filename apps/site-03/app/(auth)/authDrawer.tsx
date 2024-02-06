'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { getMemberSubscriptionStatus } from 'data-center';
import Cookies from 'js-cookie';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Register from '@/app/(auth)/register/register';
import Login from '@/app/(auth)/login/login';
import { useUserStore } from '@/store/userStore';
import ForgetPassword from '@/app/(auth)/forgetPassword/forgetPassword';
import BottomDrawer from '@/components/drawer/bottomDrawer';
import ChangePassword from '@/app/(auth)/changePassword/changePassword';
import { useNotificationStore } from '@/store/notificationStore';
import { useAuthStore } from '@/store/authStore';
import headerBg from './components/authComponent/img/headerBg.jpeg';
import closeIcon from './components/authComponent/img/closeIcon.png';
import style from './authDrawer.module.scss';
import backIcon from './components/authComponent/img/backIcon.png';
import titleIcon from './img/title.png';

function AuthDrawer() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const auth = searchParams.get('auth');
    const authQuery = useUserStore.use.authQuery();

    const isDrawerOpen = useAuthStore.use.isDrawerOpen();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const setAuthQuery = useUserStore.use.setAuthQuery();

    const authContent = useAuthStore.use.authContent();
    const setAuthContent = useAuthStore.use.setAuthContent();
    const title = useAuthStore.use.title();
    const setTitle = useAuthStore.use.setTitle();

    const setIsVipUseAnalysis = useUserStore.use.setIsVipUseAnalysis();
    const setIsVisible = useNotificationStore.use.setIsVisible();

    const resetAuthContent = () => {
        if (authQuery === 'register') {
            setAuthContent(<Register />);
            setTitle(<p>注册</p>);
        } else if (authQuery === 'login') {
            setAuthContent(<Login />);
            setTitle(<Image alt="" height={40} src={titleIcon} width={116} />);
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
        if (auth) {
            setAuthQuery('');
            router.replace(
                `${pathname}${
                    searchParams.get('status') ? `?status=${searchParams.get('status')}` : ''
                }`
            );
        }
        setIsDrawerOpen(false);
    };
    const setMemberSubscribeStatus = useUserStore.use.setMemberSubscribeStatus();
    const setUserInfoIsLoading = useUserStore.use.setUserInfoIsLoading();
    const userId = useUserStore.use.userInfo();

    const isToken = Cookies.get('access');
    useEffect(() => {
        const fetchSubscription = async () => {
            setUserInfoIsLoading(true);
            const subscriptionResponse = await getMemberSubscriptionStatus({
                memberId: userId.uid
            });

            if (!subscriptionResponse.success) {
                const errorMessage = !subscriptionResponse.error
                    ? subscriptionResponse.error
                    : '连线异常，请联系客服人员';
                setIsVisible(errorMessage, 'error');
                return;
            }
            setMemberSubscribeStatus(subscriptionResponse.data);
            setUserInfoIsLoading(false);

            if (subscriptionResponse.data.planId === 1 || userId.balance >= 80) {
                setIsVipUseAnalysis(true);
            } else {
                setIsVipUseAnalysis(false);
            }
        };

        if (isToken && userId.uid) void fetchSubscription();
    });

    useEffect(() => {
        resetAuthContent();
    }, [isDrawerOpen, authQuery]);

    useEffect(() => {
        if (auth) {
            setAuthQuery(auth);
            resetAuthContent();
            setIsDrawerOpen(true);
        } else {
            closeDrawer();
        }
    }, [auth]);

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
                height: '450px',
                backgroundColor: '#1665df',
                borderRadius: '16px 16px 0 0'
            }}
            swipeAreaWidth={-100}
            topLineDisplay="none"
        >
            <div className={style.loginDrawer}>
                <div className={style.header} style={{ backgroundImage: `url(${headerBg.src})` }}>
                    <div className={style.title}>{title}</div>
                    <Image
                        alt=""
                        className={style.closeBtn}
                        height={12}
                        onClick={() => {
                            closeDrawer();
                        }}
                        src={closeIcon.src}
                        width={12}
                    />
                    {['register', 'forgetPassword'].includes(authQuery) && (
                        <Image
                            alt=""
                            className={style.backBtn}
                            height={12}
                            onClick={() => {
                                setAuthQuery('login');
                            }}
                            src={backIcon.src}
                            width={12}
                        />
                    )}
                    {authContent}
                </div>
            </div>
        </BottomDrawer>
    );
}

export default AuthDrawer;
