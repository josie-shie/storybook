'use client';

import type { ReactNode } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { Tabs } from '@/components/tabs/tabs';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import style from './layout.module.scss';

function MasterLayout({ children }: { children: ReactNode }) {
    const params = useParams();
    const route = usePathname().split('/');
    const isNone = route.includes('masterAvatar');
    return (
        <div className={style.articleLayout}>
            {params.articleId || isNone ? null : <Header />}
            <div className={style.predict}>
                {params.articleId || isNone ? null : (
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
