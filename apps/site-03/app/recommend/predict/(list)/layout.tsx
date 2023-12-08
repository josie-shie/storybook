'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import style from './layout.module.scss';
import { Tabs } from '@/components/tabs/tabs';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';

function PredictLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isMasterListRoute = pathname.includes('masterList');
    const isMasterAvatarRoute = pathname.includes('masterAvatar');
    const isPredictMatchIdRoute = /\/recommend\/predict\/\d+/.test(pathname);

    if (isMasterListRoute || isPredictMatchIdRoute || isMasterAvatarRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <div className={style.predict}>
                <div className={style.childrenTab}>
                    <Tabs
                        labels={['专家预测文章', '专家列表']}
                        paths={['/recommend/predict', '/recommend/predict/master']}
                        styling="button"
                    />
                </div>

                {children}
            </div>
            <Footer />
        </>
    );
}

export default PredictLayout;
