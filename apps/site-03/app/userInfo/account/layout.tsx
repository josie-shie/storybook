'use client';
import type { ReactNode } from 'react';
import { creatAccountStore } from './accountStore';

function AccountLayout({ children }: { children: ReactNode }) {
    creatAccountStore({ loading: false });

    return <>{children}</>;
}

export default AccountLayout;
