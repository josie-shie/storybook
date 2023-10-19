'use client';
import type { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
// import Header from '../components/headerSwitch/header';
import Header from '../components/header/headerTabs';
import Footer from '../components/footer/footer';
import { Tabs } from '../components/tabs/tabs';
import Logo from '../components/header/img/logo.svg';
import style from './recommend.module.scss';

function RecommendLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const paramName = usePathname();

    const headerProps = {
        logo: <Logo />,
        tabList: [
            { label: '足球', value: 'football' },
            { label: '籃球', value: 'basketball' }
        ],
        total: 999999
    };

    useEffect(() => {
        if (paramName === '/recommend') {
            router.push('/recommend/guess/contest');
        }
    }, [router, paramName]);

    return (
        <>
            <Header
                logo={headerProps.logo}
                tabList={headerProps.tabList}
                total={headerProps.total}
            />
            <div className={style.layout}>
                <Tabs
                    labels={['競猜', '專家預測', '大數據分析']}
                    paths={['/recommend/guess', '/recommend/predict', '/recommend/bigData']}
                />
                {children}
            </div>
            <Footer />
        </>
    );
}

export default RecommendLayout;
