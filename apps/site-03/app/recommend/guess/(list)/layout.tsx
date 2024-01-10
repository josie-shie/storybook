'use client';
import type { ReactNode } from 'react';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import style from './layout.module.scss';
import { creatRankStore } from './rankStore';

function ContestLayout({ children }: { children: ReactNode }) {
    creatRankStore({ weekRankList: [], monthRankList: [], seasonRankList: [], masterRankList: [] });

    return (
        <>
            <Header link="/recommend/guess" title="高手榜" />
            <div className={style.guess}>{children}</div>
            <Footer />
        </>
    );
}

export default ContestLayout;
