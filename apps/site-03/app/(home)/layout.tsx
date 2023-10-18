'use client';
import type { ReactNode } from 'react';
import Header from '../components/header/headerTabs';
import Footer from '../components/footer/footer';
import Logo from '../components/header/img/logo.svg';
import style from './home.module.scss';

function HomeLayout({ children }: { children: ReactNode }) {
    const headerProps = {
        logo: <Logo />,
        tabList: [
            { label: '足球', value: 'football' },
            { label: '籃球', value: 'basketball' }
        ],
        total: 999999
    };

    return (
        <>
            <Header
                logo={headerProps.logo}
                tabList={headerProps.tabList}
                total={headerProps.total}
            />
            <div className={style.home}>
                <div>Tab here</div>
                <div>{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default HomeLayout;
