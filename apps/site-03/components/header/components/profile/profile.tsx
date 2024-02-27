import { useRouter } from 'next/navigation';
import { formatNumberWithCommas } from 'lib';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import StarIcon from '../../img/star.svg';
import style from './profile.module.scss';

function IsVipProfile() {
    const router = useRouter();
    const isLogin = useUserStore.use.isLogin();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const userInfo = useUserStore.use.userInfo();

    const openLoginDrawer = () => {
        setAuthQuery('login');
        setIsDrawerOpen(true);
    };

    return (
        <div
            className={style.profile}
            onClick={() => {
                isLogin ? router.push('/userInfo') : openLoginDrawer();
            }}
        >
            <StarIcon className={style.icon} />
            <div className={style.totalNumber}>
                {isLogin && typeof userInfo.balance === 'number' ? (
                    <div className={style.loginButton}>
                        {formatNumberWithCommas(userInfo.balance)}
                    </div>
                ) : (
                    <div className={style.loginButton}>登入注册</div>
                )}
            </div>
        </div>
    );
}

function Profile() {
    return <IsVipProfile />;
}

export default Profile;
