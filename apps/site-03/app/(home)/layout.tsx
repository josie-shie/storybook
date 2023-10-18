'use client';
import type { ReactNode } from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import style from './home.module.scss';

function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <div className={style.home}>
                <div>Tab here</div>
                <div>{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default HomeLayout;
