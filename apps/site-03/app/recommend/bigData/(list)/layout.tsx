'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Tab, Tabs } from 'ui';
import Image from 'next/image';
import Logo from './img/logo.png';
import AnimationData from './animationData';
import style from './layout.module.scss';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/headerLogo';

function BigDataLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isBigDataDetail = pathname.includes('resultDetail');

    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };
    const tabList = [
        {
            label: '盘路分析',
            to: '/recommend/bigData?status=analysis'
        },
        {
            label: '盘路提示',
            to: '/recommend/bigData?status=tips'
        }
    ];

    const headerProps = {
        logo: <Image alt="logo" height={13} src={Logo} width={66} />,
        total: 999999
    };

    if (isBigDataDetail) {
        return <>{children}</>;
    }

    return (
        <>
            <Header logo={headerProps.logo} total={headerProps.total} />
            <AnimationData />
            <div className={style.main}>
                <Tabs
                    buttonRadius={tabStyle.buttonRadius}
                    gap={tabStyle.gap}
                    position="center"
                    styling="button"
                    swiperOpen={tabStyle.swiperOpen}
                >
                    {tabList.map(item => {
                        return (
                            <Tab key={item.label} label={item.label} to={item.to}>
                                {children}
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
            <Footer />
        </>
    );
}

export default BigDataLayout;
