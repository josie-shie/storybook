import Image from 'next/image';
import Link from 'next/link';
import { useUserStore } from '@/app/userStore';
import { useAuthStore } from '@/app/(auth)/authStore';
import profileIcon from '../../img/profileIcon.png';
import profileVipIcon from '../../img/profileVipIcon.png';
import style from './profile.module.scss';

function formatNumberWithCommas(total: number): string {
    return total.toString().replace(/\B(?=(?<temp1>\d{3})+(?!\d))/g, ',');
}

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
        <div className={style.profile}>
            {memberSubscribeStatus.planId === 1 ? (
                <Image alt="" className={style.icon} height={24} src={profileVipIcon} width={24} />
            ) : (
                <Image alt="" className={style.icon} height={24} src={profileIcon} width={24} />
            )}
            <div
                className={`${style.totalNumber} ${
                    memberSubscribeStatus.planId === 1 ? style.vipTotalNumber : ''
                }`}
            >
                {isLogin && typeof userInfo.balance === 'number' ? (
                    <Link href="/userInfo">{formatNumberWithCommas(userInfo.balance)}</Link>
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
    );
}

export default Profile;
