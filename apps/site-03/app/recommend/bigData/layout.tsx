'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Logo from '../img/logo.svg';
import style from './layout.module.scss';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';

function BigDataLayout({ children }: { children: ReactNode }) {
    const headerProps = {
        logo: <Logo />,
        total: 999999
    };

    return (
        <>
            <Header logo={headerProps.logo} total={headerProps.total} />
            <div className={style.dataTab}>
                <div className={style.tab}>
                    <Link href="/recommend/guess">竟猜</Link>
                    <Link href="/recommend/predict">专家预测</Link>
                    <Link className={style.active} href="/recommend/bigData">
                        大数据分析
                    </Link>
                </div>
                {children}
            </div>
            <Footer />
        </>
    );
}

export default BigDataLayout;
