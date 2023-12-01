'use client';
import { usePathname } from 'next/navigation';
import { type ReactNode, Suspense, useEffect } from 'react';
import Image from 'next/image';
import type { GetMemberInfoResponse } from 'data-center';
import { useUserStore } from '../userStore';
import LogoImg from './img/logo.png';
import style from './home.module.scss';
import HeaderLogo from '@/components/header/headerLogo';
import HeaderTitle from '@/components/header/headerTitle';
import Footer from '@/components/footer/footer';
import { Tabs } from '@/components/tabs/tabs';
import { version } from '@/package.json';
import Loading from '@/components/loading/loading';

function NormalLayout({
    children,
    userInfo,
    isLogin
}: {
    children: ReactNode;
    userInfo: GetMemberInfoResponse;
    isLogin: boolean;
}) {
    const headerProps = {
        logo: <Image alt="" height={13} src={LogoImg} width={66} />,
        total: isLogin ? userInfo.balance : null
    };

    return (
        <>
            <HeaderLogo logo={headerProps.logo} total={headerProps.total} />
            <div className={style.home}>
                <Tabs labels={['熱門', '快讯']} paths={['/', '/news']} />
                <Suspense fallback={<Loading backgroundColor="#FFF" />}>{children}</Suspense>
            </div>
            <Footer />
        </>
    );
}

function ArticleLayout({
    children,
    userInfo,
    isLogin
}: {
    children: ReactNode;
    userInfo: GetMemberInfoResponse;
    isLogin: boolean;
}) {
    const headerProps = {
        title: '快讯',
        total: isLogin ? userInfo.balance : 0
    };

    return (
        <>
            <HeaderTitle title={headerProps.title} total={headerProps.total} />
            <div className={style.home}>{children}</div>
        </>
    );
}

function HomeLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isArticlePage = /^\/news\/[^/]+$/.test(pathname);
    const userInfo = useUserStore.use.userInfo();
    const isLogin = useUserStore.use.isLogin();

    useEffect(() => {
        // eslint-disable-next-line -- log version
        console.info(
            `version: %c${version}`,
            'color:white;background:#ff9f19;padding: 2px 0.5em; border-radius: 10px'
        );
    }, []);

    if (isArticlePage) {
        return (
            <ArticleLayout isLogin={isLogin} userInfo={userInfo}>
                {children}
            </ArticleLayout>
        );
    }

    return (
        <NormalLayout isLogin={isLogin} userInfo={userInfo}>
            {children}
        </NormalLayout>
    );
}

export default HomeLayout;
