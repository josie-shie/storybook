'use client';
import type { ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import style from './layout.module.scss';
import { creatRankStore } from './rankStore';

function InterceptingContent({ para }: { para: ReactNode }) {
    const params = useParams();

    return (
        <AnimatePresence>
            {params.matchId || params.masterId ? (
                <motion.div
                    animate={{ transform: 'translateX(0)' }}
                    exit={{ transform: 'translateX(100%)' }}
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
        </AnimatePresence>
    );
}

function ContestLayout({ children, para }: { children: ReactNode; para: ReactNode }) {
    creatRankStore({ weekRankList: [], monthRankList: [], seasonRankList: [], masterRankList: [] });

    return (
        <>
            <Header link="/guess" title="高手榜" />
            <div className={style.guess}>{children}</div>
            <Footer />
            <InterceptingContent para={para} />
        </>
    );
}

export default ContestLayout;
