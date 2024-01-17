import Image from 'next/image';
import Link from 'next/link';
import { formatNumberWithCommas } from 'lib';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import profileIcon from '../../img/profileIcon.png';
import ProfileVipIcon from '../../img/profileVipIcon.svg';
import style from './profile.module.scss';

function IsVipProfile() {
    const isLogin = useUserStore.use.isLogin();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const userInfo = useUserStore.use.userInfo();
    const memberSubscribeStatus = useUserStore.use.memberSubscribeStatus();

    const openLoginDrawer = () => {
        setAuthQuery('login');
        setIsDrawerOpen(true);
    };
    return isLogin && memberSubscribeStatus.planId === 1 ? (
        <Link href="/userInfo">
            <div className={style.vipProfile}>
                <ProfileVipIcon className={style.icon} />

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
                <Image alt="" className={style.icon} height={24} src={profileIcon} width={24} />
                <div className={style.totalNumber}>
                    {isLogin && typeof userInfo.balance === 'number' ? (
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
    );
}

function Profile() {
    const loading = useUserStore.use.userInfoIsLoading();

    return <>{loading ? null : <IsVipProfile />}</>;
}

export default Profile;
