'use client';
import { type ReactNode } from 'react';
import { Slick } from 'ui';
import { useSearchParams, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
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
                        zIndex: 10,
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

function ContestListLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const isFliterOpen = searchParams.get('filter');

    const tabList = [
        {
            label: '全部',
            href: '/',
            status: null
        },
        {
            label: '已开赛',
            href: '/?status=progress',
            status: 'progress'
        },
        {
            label: '赛程',
            href: '/?status=schedule',
            status: 'schedule'
        },
        {
            label: '完场',
            href: '/?status=result',
            status: 'result'
        }
    ];

    const slideActive = status ? tabList.findIndex(tab => tab.status === status) : 0;

    return (
        <div className="contestListLayout">
            <Header />
            <div className={style.main}>
                <Slick
                    slideActive={slideActive}
                    styling="button"
                    tabs={tabList}
                    touchMove={!isFliterOpen}
                >
                    {tabList.map(item => {
                        return <div key={item.label}>{item.status === status && children}</div>;
                    })}
                </Slick>
            </div>

            <Footer />
            <InterceptingDetail modal={modal} />
        </div>
    );
}

export default ContestListLayout;
