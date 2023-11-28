'use client';
import { type ReactNode } from 'react';
import { creatAuthStore } from './authStore';
import Register from '@/app/(auth)/register/register';
import Login from '@/app/(auth)/login/login';
import { useUserStore } from '@/app/userStore';
import ForgetPassword from '@/app/(auth)/forgetPassword/forgetPassword';
import ChangePassword from '@/app/(auth)/changePassword/changePassword';

function AuthDrawer() {
    creatAuthStore({
        loading: false
    });

    const authQuery = useUserStore.use.authQuery();

    let content: ReactNode;
    if (authQuery === 'register') {
        content = <Register />;
    } else if (authQuery === 'login') {
        content = <Login />;
    } else if (authQuery === 'forgetPassword') {
        content = <ForgetPassword />;
    } else if (authQuery === 'changePassword') {
        content = <ChangePassword />;
    } else {
        content = null;
    }

    return content;
}

export default AuthDrawer;
