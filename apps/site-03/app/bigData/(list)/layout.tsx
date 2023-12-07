'use client';
import { Suspense, type ReactNode } from 'react';
import { Tab, Tabs } from 'ui';
import Image from 'next/image';
import Logo from './img/logo.png';
import AnimationData from './animationData';
import style from './layout.module.scss';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/headerLogo';
import Loading from '@/components/loading/loading';
import { useUserStore } from '@/app/userStore';

function BigDataLayout({ children }: { children: ReactNode }) {
    const userInfo = useUserStore.use.userInfo();

    const tabStyle = {
        gap: 8,
        swiperOpen: true,
        buttonRadius: 30
    };
    const tabList = [
        {
            label: '盘路分析',
            to: '/bigData?status=analysis'
        },
        {
            label: '盘路提示',
            to: '/bigData?status=tips'
        }
    ];

    const headerProps = {
        logo: <Image alt="logo" height={13} src={Logo} width={66} />,
        total: userInfo.balance
    };
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
                                <Suspense fallback={<Loading />}>{children}</Suspense>
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
