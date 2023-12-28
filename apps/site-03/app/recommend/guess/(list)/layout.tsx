'use client';
import type { ReactNode } from 'react';
import { Tabs } from '@/components/tabs/tabs';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import style from './layout.module.scss';
import { creatRankStore } from './rank/rankStore';

function ContestLayout({ children }: { children: ReactNode }) {
    creatRankStore({ rankList: [] });

    return (
        <>
            <Header link="/recommend/guess" title="高手榜" />
            <div className={style.guess}>
                <div className={style.childrenTab}>
                    <Tabs
                        labels={['赛事', '周榜', '月榜', '季榜', '连红榜']}
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
