'use client';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ScrollTop from '@/components/scrollTop/scrollTop';
import { creatAiPredictStore } from '../aiPredictStore';
import style from './layout.module.scss';

function InterceptingContent({ para }: { para: ReactNode }) {
    const scrollContentRef = useRef<HTMLDivElement>(null);
    const params = useParams();

    return (
        <>
            {params.matchId ? (
                <>
                    <motion.div
                        animate={{ left: '0%' }}
                        initial={{ left: '100%' }}
                        key="interceptingContent"
                        ref={scrollContentRef}
                        style={{
                            background: 'linear-gradient(91deg, #003c9f 0.72%, #2575fc 98.56%)',
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

function AiPredictPageLayout({ children, para }: { children: ReactNode; para: ReactNode }) {
    creatAiPredictStore({
        aiPredictList: [],
        aiHistoryList: []
    });
    return (
        <div className={style.aiPredictPageLayout}>
            {children}
            <InterceptingContent para={para} />
        </div>
    );
}

export default AiPredictPageLayout;
