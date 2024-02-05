'use client';
import type { ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import style from './layout.module.scss';
import { creatRankStore } from './rankStore';

function InterceptingContent({ para }: { para: ReactNode }) {
    const params = useParams();

    return (
        <>
            {params.matchId || params.masterId ? (
                <motion.div
                    animate={{ transform: 'translateX(0)' }}
                    initial={{ transform: 'translateX(100%)' }}
                    key="interceptingContent"
                    style={{
                        background: '#fff',
                        width: '100%',
                        position: 'fixed',
                        top: 0,
                        zIndex: 1000,
                        height: '100dvh',
                        overflowY: 'auto'
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {para}
                </motion.div>
            ) : null}
        </>
    );
}

function ContestLayout({ children, para }: { children: ReactNode; para: ReactNode }) {
    creatRankStore({ weekRankList: [], monthRankList: [], seasonRankList: [], masterRankList: [] });

    return (
        <div className={style.guessLayout}>
            <Header link="/guess" title="猜球" />
            <div className={style.guess}>{children}</div>
            <Footer />
            <InterceptingContent para={para} />
        </div>
    );
}

export default ContestLayout;
