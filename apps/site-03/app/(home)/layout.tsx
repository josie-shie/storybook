'use client';
import type { ReactNode } from 'react';
import Logo from './img/logo.svg';
import style from './home.module.scss';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';

function HomeLayout({ children }: { children: ReactNode }) {
    const headerProps = {
        logo: <Logo />,
        total: 999999
    };

    return (
        <>
            <Header logo={headerProps.logo} total={headerProps.total} />
            <div className={style.home}>
                <div>{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default HomeLayout;
