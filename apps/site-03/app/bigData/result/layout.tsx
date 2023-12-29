'use client';
import { useEffect, type ReactNode } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { createAnalysisResultStore } from './analysisResultStore';
import { creatMatchFilterStore } from './matchFilterStore';
import style from './layout.module.scss';

const pageTransitionVariants = {
    initial: {
        transform: 'translateX(100%)',
        transition: { ease: [0.05, 0.7, 0.1, 1.0], duration: 0.2 }
    },
    animate: {
        transform: 'translateX(0)',
        transition: { ease: [0.05, 0.7, 0.1, 1.0], duration: 0.2 }
    },
    exit: {
        transform: 'translateX(100%)',
        transition: { ease: [0.05, 0.7, 0.1, 1.0], duration: 0.2 }
    }
};

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
                        height: '100vh',
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
    const params = usePathname();

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <>
            <AnimatePresence mode="popLayout">
                <motion.div
                    animate="animate"
                    className={style.layout}
                    exit="exit"
                    initial="initial"
                    key={params}
                    variants={pageTransitionVariants}
                >
                    <CreateStore>{children}</CreateStore>
                </motion.div>
            </AnimatePresence>
            <InterceptingDetail modal={modal} />
        </>
    );
}

export default DetailLayout;
