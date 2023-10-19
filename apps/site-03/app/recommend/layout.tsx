'use client';
import type { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import style from './recommend.module.scss';
import Logo from './img/logo.svg';
import Header from '@/components/header/headerTabs';
import { Tabs } from '@/components/tabs/tabs';

function RecommendLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const paramName = usePathname();

    const headerProps = {
        logo: <Logo />,
        total: 999999,
        tabList: ['足球', '籃球']
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
        </>
    );
}

export default RecommendLayout;
