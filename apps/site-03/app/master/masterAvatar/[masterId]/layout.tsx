'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header/headerTransparent';
import Info from './info';
import style from './layout.module.scss';

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
            <div className={style.masterAvatarLayout}>
                <Info params={params} />
                {children}
            </div>
        </>
    );
}

export default MasterAvatarLayout;
