'use client';

import type { ReactNode } from 'react';
import { useParams } from 'next/navigation';
import style from './layout.module.scss';
import { Tabs } from '@/components/tabs/tabs';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';

function MasterLayout({ children }: { children: ReactNode }) {
    const params = useParams();
    return (
        <div className={style.articleLayout}>
            {params.articleId ? null : <Header />}
            <div className={style.predict}>
                {params.articleId ? null : (
                    <div className={style.childrenTab}>
                        <Tabs
                            labels={['专家预测文章', '专家列表']}
                            paths={['/master/article', '/master/expert']}
                            styling="button"
                        />
                    </div>
                )}

                {children}
            </div>
            <Footer />
        </div>
    );
}

export default MasterLayout;
