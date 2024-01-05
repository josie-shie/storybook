'use client';
import { useEffect, type ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { createAnalysisResultStore } from './analysisResultStore';
import { creatMatchFilterStore } from './matchFilterStore';
import style from './layout.module.scss';

function InterceptingDetail({ modal }: { modal: ReactNode }) {
    const params = useParams();
    return (
        <AnimatePresence>
            {params.matchId ? (
                <motion.div
                    animate={{ transform: 'translateX(0)' }}
                    exit={{ transform: 'translateX(100%)' }}
                    initial={{ transform: 'translateX(100%)' }}
                    key="modalDetail"
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
                    <div className={style.modal}>{modal}</div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

function CreateStore({ children }: { children: ReactNode }) {
    createAnalysisResultStore({
        analysisResultData: undefined
    });

    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });

    return <>{children}</>;
}

function DetailLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <>
            <CreateStore>{children}</CreateStore>
            <InterceptingDetail modal={modal} />
        </>
    );
}

export default DetailLayout;
