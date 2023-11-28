'use client';
import { useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';
import { creatAuthStore } from './authStore';
import Register from '@/app/(auth)/register/register';
import Login from '@/app/(auth)/login/login';

function AuthDrawer() {
    const searchParams = useSearchParams();
    const status = searchParams.get('auth');
    creatAuthStore({
        loading: false
    });

    let content: ReactNode;
    if (status === 'register') {
        content = <Register />;
    } else if (status === 'login') {
        content = <Login />;
    } else {
        content = null;
    }

    return content;
}

export default AuthDrawer;
