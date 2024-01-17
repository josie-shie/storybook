'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header/headerTransparent';
import Info from '@/app/master/masterAvatar/[masterId]/info';
import MasterAvatar from '@/app/master/masterAvatar/[masterId]/masterAvatar';

function Layout({ params, children }: { params: { masterId: string }; children: ReactNode }) {
    return (
        <>
            <Header title="专家聊球" />
            <Info params={params} />
            <MasterAvatar params={params} />
            {children}
        </>
    );
}

export default Layout;
