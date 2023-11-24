'use client';
import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode, Suspense } from 'react';
import Image from 'next/image';
import LogoImg from './img/logo.png';
import style from './home.module.scss';
import HeaderLogo from '@/components/header/headerLogo';
import HeaderTitle from '@/components/header/headerTitle';
import Footer from '@/components/footer/footer';
import { Tabs } from '@/components/tabs/tabs';
import { version } from '@/package.json';
import Loading from '@/components/loading/loading';

function NormalLayout({ children }: { children: ReactNode }) {
    const headerProps = {
        logo: <Image alt="" height={13} src={LogoImg} width={66} />,
        total: 999999
    };

    return (
        <>
            <HeaderLogo logo={headerProps.logo} total={headerProps.total} />
            <div className={style.home}>
                <Tabs labels={['熱門', '快讯']} paths={['/', '/news']} />
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
            <Footer />
        </>
    );
}

function ArticleLayout({ children }: { children: ReactNode }) {
    const headerProps = {
        title: '快讯',
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

    useEffect(() => {
        // eslint-disable-next-line -- log version
        console.info(
            `version: %c${version}`,
            'color:white;background:#ff9f19;padding: 2px 0.5em; border-radius: 10px'
        );
    }, []);

    if (isArticlePage) {
        return <ArticleLayout>{children}</ArticleLayout>;
    }

    return <NormalLayout>{children}</NormalLayout>;
}

export default HomeLayout;
