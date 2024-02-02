import Image from 'next/image';
import Link from 'next/link';
import { formatNumberWithCommas } from 'lib';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import profileIcon from '../../img/profileIcon.png';
import style from './profile.module.scss';

function IsVipProfile() {
    const isLogin = useUserStore.use.isLogin();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const userInfo = useUserStore.use.userInfo();

    const openLoginDrawer = () => {
        setAuthQuery('login');
        setIsDrawerOpen(true);
    };
    return (
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
    return <IsVipProfile />;
}

export default Profile;
