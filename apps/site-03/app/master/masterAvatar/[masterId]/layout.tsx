'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header/headerTitle';
import Info from './info';

function MasterAvatarLayout({
    params,
    children
}: {
    params: { masterId: string };
    children: ReactNode;
}) {
    const headerProps = {
        title: '专家聊球'
    };

    return (
        <>
            <Header title={headerProps.title} />
            <Info params={params} />
            {children}
        </>
    );
}

export default MasterAvatarLayout;
