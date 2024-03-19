'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header/headerTransparent';
import Footer from '@/components/footer/footer';
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
        title: '其他会员'
    };

    return (
        <div className={style.layout}>
            <Header title={headerProps.title} />
            <div className={style.memberAvatarLayout}>
                <Info params={params} />
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default MasterAvatarLayout;
