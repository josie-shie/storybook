'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import Logo from './img/logo.svg';
import style from './home.module.scss';
import HeaderLogo from '@/components/header/headerLogo';
import HeaderTitle from '@/components/header/headerTitle';
import Footer from '@/components/footer/footer';
import { Tabs } from '@/components/tabs/tabs';

function NormalLayout({ children }: { children: ReactNode }) {
    const headerProps = {
        logo: <Logo />,
        total: 999999
    };

    return (
        <>
            <HeaderLogo logo={headerProps.logo} total={headerProps.total} />
            <div className={style.home}>
                <Tabs labels={['熱門', '快訊']} paths={['/', '/news']} />
                {children}
            </div>
            <Footer />
        </>
    );
}

function ArticleLayout({ children }: { children: ReactNode }) {
    const headerProps = {
        title: '快訊',
        total: 999999
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

    if (isArticlePage) {
        return <ArticleLayout>{children}</ArticleLayout>;
    }

    return <NormalLayout>{children}</NormalLayout>;
}

export default HomeLayout;
