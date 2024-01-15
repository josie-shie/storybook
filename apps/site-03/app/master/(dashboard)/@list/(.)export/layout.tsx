'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header/headerTitle';
import Info from '@/app/master/masterAvatar/[masterId]/info';

function Layout({ children, params }: { children: ReactNode; params: { masterId: string } }) {
    return (
        <div>
            <Header title="专家预测文章" />
            <Info params={params} />
            {children}
        </div>
    );
}

export default Layout;
