'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header/headerTransparent';
import Footer from '@/components/footer/footer';
import style from '@/app/master/(dashboard)/layout.module.scss';

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className={style.articleLayout}>
            <Header title="专家预测文章" />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
