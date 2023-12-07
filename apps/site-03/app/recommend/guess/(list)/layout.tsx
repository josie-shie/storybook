'use client';
import type { ReactNode } from 'react';
import style from './layout.module.scss';
import { Tabs } from '@/components/tabs/tabs';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';

function ContestLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <div className={style.guess}>
                <div className={style.childrenTab}>
                    <Tabs
                        labels={['賽事', '週榜', '月榜', '季榜', '連紅榜']}
                        paths={[
                            '/recommend/guess',
                            '/recommend/guess/rank?status=week',
                            '/recommend/guess/rank?status=month',
                            '/recommend/guess/rank?status=season',
                            '/recommend/guess/masterRank'
                        ]}
                        styling="button"
                    />
                </div>
                {children}
            </div>
            <Footer />
        </>
    );
}

export default ContestLayout;
