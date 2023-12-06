'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../(auth)/authStore';
import { useUserStore } from '../userStore';

function UserInfoLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const setAuthQuery = useUserStore.use.setAuthQuery();
    const setIsDrawerOpen = useAuthStore.use.setIsDrawerOpen();
    const isCookieExist = Cookies.get('access');

    useEffect(() => {
        const path = pathname;

        if (path === '/userInfo' && !isCookieExist) {
            router.push('/?auth=login');
            setAuthQuery('login');
            setIsDrawerOpen(true);
        }
    }, [router]);

    return <>{children}</>;
}

export default UserInfoLayout;
