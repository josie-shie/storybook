'use client';
import type { ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import ScrollTop from '@/components/scrollTop/scrollTop';
import style from './layout.module.scss';
import { creatRankStore } from './rankStore';

function InterceptingContent({ para }: { para: ReactNode }) {
    const scrollContentRef = useRef<HTMLDivElement>(null);
    const params = useParams();

    return (
        <>
            {params.matchId || params.masterId ? (
                <>
                    <motion.div
                        animate={{ left: '0%' }}
                        initial={{ left: '100%' }}
                        key="interceptingContent"
                        ref={scrollContentRef}
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
                    <ScrollTop scrollContainerRef={scrollContentRef} />
                </>
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
