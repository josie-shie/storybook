'use client';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import style from './layout.module.scss';
import WeekButton from './components/weekButton/weekButton';
import Banner from './img/banner.png';
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
                <Image alt="" className={style.banner} src={Banner} />
                <WeekButton />
                {children}
            </div>
            <Footer />
        </>
    );
}

export default PredictLayout;
