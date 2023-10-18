'use client';
import type { ReactNode } from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <div>Tab here</div>
            <div>{children}</div>
            <Footer />
        </>
    );
}

export default HomeLayout;
