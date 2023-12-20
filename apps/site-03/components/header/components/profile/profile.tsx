import Image from 'next/image';
import Link from 'next/link';
import { formatNumberWithCommas } from 'lib';
import { useUserStore } from '@/app/userStore';
import { useAuthStore } from '@/app/(auth)/authStore';
import profileIcon from '../../img/profileIcon.png';
import profileVipIcon from '../../img/profileVipIcon.png';
import style from './profile.module.scss';

function Profile() {
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const userInfo = useUserStore.use.userInfo();
    const memberSubscribeStatus = useUserStore.use.memberSubscribeStatus();
    const isLogin = useUserStore.use.isLogin();

    const openLoginDrawer = () => {
        setAuthQuery('login');
        setIsDrawerOpen(true);
    };

    return (
        <>
            {isLogin && memberSubscribeStatus.planId === 1 ? (
                <Link href="/userInfo">
                    <div className={style.vipProfile}>
                        <Image
                            alt=""
                            className={style.icon}
                            height={12}
                            src={profileVipIcon}
                            width={14}
                        />
                        <div className={style.totalNumber}>
                            {typeof userInfo.balance === 'number' ? (
                                <>{formatNumberWithCommas(userInfo.balance)}</>
                            ) : (
                                <div
                                    className={style.loginButton}
                                    onClick={() => {
                                        openLoginDrawer();
                                    }}
                                >
                                    登入注册
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            ) : (
                <Link href="/userInfo">
                    <div className={style.profile}>
                        <Image
                            alt=""
                            className={style.icon}
                            height={24}
                            src={profileIcon}
                            width={24}
                        />
                        <div className={style.totalNumber}>
                            {isLogin && typeof userInfo.balance === 'number' ? (
                                <Link href="/userInfo">
                                    {formatNumberWithCommas(userInfo.balance)}
                                </Link>
                            ) : (
                                <div
                                    className={style.loginButton}
                                    onClick={() => {
                                        openLoginDrawer();
                                    }}
                                >
                                    登入注册
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
}

export default Profile;
