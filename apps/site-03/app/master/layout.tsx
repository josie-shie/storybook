'use client';

import type { ReactNode } from 'react';
import style from './layout.module.scss';
import { Tabs } from '@/components/tabs/tabs';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';

function MasterLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <div className={style.predict}>
                <div className={style.childrenTab}>
                    <Tabs
                        labels={['专家预测文章', '专家列表']}
                        paths={['/master/predict', '/master/masterList']}
                        styling="button"
                    />
                </div>
                {children}
            </div>
            <Footer />
        </>
    );
}

export default MasterLayout;
