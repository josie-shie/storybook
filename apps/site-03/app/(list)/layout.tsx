'use client';
import { type ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import style from './layout.module.scss';
import { creatLongDragonStore } from './longDragonStore';

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

function ContestListLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
    creatLongDragonStore({
        hintsSelectType: 'WIN',
        hintsSelectProgres: 'FULL',
        handicapTips: []
    });
    return (
        <div className="contestListLayout">
            <Header />
            <div className={style.main}>{children}</div>
            <Footer />
            <InterceptingDetail modal={modal} />
        </div>
    );
}

export default ContestListLayout;
