import Image from 'next/image';
import type { ReactNode } from 'react';
import Link from 'next/link';
import profileIcon from '../../img/profileIcon.png';
import style from './profile.module.scss';
import { useUserStore } from '@/app/userStore';
import { useAuthStore } from '@/app/(auth)/authStore';

interface ProfileProps {
    total: number | ReactNode;
}

function formatNumberWithCommas(total: number): string {
    return total.toString().replace(/\B(?=(?<temp1>\d{3})+(?!\d))/g, ',');
}

function Profile({ total }: ProfileProps) {
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();

    const openLoginDrawer = () => {
        setAuthQuery('login');
        setIsDrawerOpen(true);
    };

    return (
        <div className={style.profile}>
            <Image alt="" className={style.icon} height={24} src={profileIcon} width={24} />
            <div className={style.totalNumber}>
                {typeof total === 'number' ? (
                    <Link href="/userInfo">{formatNumberWithCommas(total)}</Link>
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
