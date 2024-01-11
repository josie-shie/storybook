'use client';

import type { ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs } from '@/components/tabs/tabs';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import style from './layout.module.scss';

function InterceptingDetail({ list }: { list: ReactNode }) {
    const params = useParams();
    return (
        <AnimatePresence>
            {params.articleId || params.masterId ? (
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
                    {list}
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

function MasterLayout({ children, list }: { children: ReactNode; list: ReactNode }) {
    return (
        <div className={style.articleLayout}>
            <Header />
            <div className={style.predict}>
                <div className={style.childrenTab}>
                    <Tabs
                        labels={['专家预测文章', '专家列表']}
                        paths={['/master/article', '/master/expert']}
                        styling="button"
                    />
                </div>
                {children}
            </div>

            <Footer />
            <InterceptingDetail list={list} />
        </div>
    );
}

export default MasterLayout;
