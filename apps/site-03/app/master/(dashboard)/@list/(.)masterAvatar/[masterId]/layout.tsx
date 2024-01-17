'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header/headerTransparent';
import Info from '@/app/master/masterAvatar/[masterId]/info';
import style from '@/app/master/(dashboard)/layout.module.scss';

function Layout({ children, params }: { children: ReactNode; params: { masterId: string } }) {
    return (
        <div className={style.articleLayout}>
            <Header title="专家预测文章" />
            <Info params={params} />
            {children}
        </div>
    );
}

export default Layout;
