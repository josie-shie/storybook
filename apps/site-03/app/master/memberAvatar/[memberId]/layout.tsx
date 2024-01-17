'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header/headerTransparent';
import Info from './info';
import style from './layout.module.scss';

function MasterAvatarLayout({
    params,
    children
}: {
    params: { memberId: string };
    children: ReactNode;
}) {
    const headerProps = {
        title: '专家聊球'
    };

    return (
        <div className={style.layout}>
            <Header title={headerProps.title} />
            <div className={style.memberAvatarLayout}>
                <Info params={params} />
                {children}
            </div>
        </div>
    );
}

export default MasterAvatarLayout;
