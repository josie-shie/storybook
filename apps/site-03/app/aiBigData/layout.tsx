'use client';
import { type ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { creatQueryFormStore } from './queryFormStore';
import { creatLeagueStore } from './leagueStore';

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
                    {modal}
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

function BigDataLayout({
    children,
    contestModal
}: {
    children: ReactNode;
    contestModal: ReactNode;
}) {
    creatQueryFormStore({
        loading: false
    });
    creatLeagueStore({
        loading: false
    });

    return (
        <>
            {children}
            <InterceptingDetail modal={contestModal} />
        </>
    );
}

export default BigDataLayout;
