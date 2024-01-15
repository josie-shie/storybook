'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header/headerTransparent';
import Footer from '@/components/footer/footer';
import style from './layout.module.scss';

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className={style.articleDetail}>
            <Header title="专家预测文章" />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
