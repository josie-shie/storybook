'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import style from './layout.module.scss';
import Logo from './img/logo.png';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import { Tabs } from '@/components/tabs/tabs';

function RecommendLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isGuessMatchIdRoute = /\/recommend\/guess\/\d+/.test(pathname);
    const isPredictMatchIdRoute = /\/recommend\/predict\/\d+/.test(pathname);
    const isMasterList = pathname.includes('masterList');
    const isMasterAvatar = pathname.includes('masterAvatar');
    const isBigData = pathname.includes('bigData');
    const headerProps = {
        logo: <Image alt="logo" src={Logo} width={66} />,
        total: 999999
    };

    if (
        isGuessMatchIdRoute ||
        isPredictMatchIdRoute ||
        isMasterList ||
        isMasterAvatar ||
        isBigData
    ) {
        return <>{children}</>;
    }

    return (
        <>
            <Header logo={headerProps.logo} total={headerProps.total} />
            <div className={style.layout}>
                <Tabs
                    labels={['竟猜', '专家预测', '大数据分析']}
                    paths={[
                        '/recommend/guess',
                        '/recommend/predict',
                        '/recommend/bigData?status=analysis'
                    ]}
                />
                {children}
            </div>
            <Footer />
        </>
    );
}

export default RecommendLayout;
