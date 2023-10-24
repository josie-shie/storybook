'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import style from './layout.module.scss';
import Logo from './img/logo.svg';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import { Tabs } from '@/components/tabs/tabs';

function RecommendLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isMatchIdRoute = /\/recommend\/guess\/\d+/.test(pathname);
    const headerProps = {
        logo: <Logo />,
        total: 999999
    };

    if (isMatchIdRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <Header logo={headerProps.logo} total={headerProps.total} />
            <div className={style.layout}>
                <Tabs
                    labels={['竟猜', '专家预测', '大数据分析']}
                    paths={['/recommend/guess', '/recommend/predict', '/recommend/bigData']}
                />
                {children}
            </div>
            <Footer />
        </>
    );
}

export default RecommendLayout;
