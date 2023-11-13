'use client';
import type { ReactNode } from 'react';
// import style from './layout.module.scss';
import Header from '@/components/header/headerTitle';
import Footer from '@/components/footer/footer';

function UserInfoLayout({ children }: { children: ReactNode }) {
    const headerProps = {
        title: '我的',
        total: 0
    };

    return (
        <>
            <Header title={headerProps.title} total={headerProps.total} />
            {/* <Header logo={headerProps.logo} total={headerProps.total} /> */}
            {children}
            <Footer />
        </>
    );
}

export default UserInfoLayout;
