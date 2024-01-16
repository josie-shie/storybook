'use client';

import type { ReactNode } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs } from '@/components/tabs/tabs';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import style from './layout.module.scss';

function InterceptingArticle({ art }: { art: ReactNode }) {
    const params = useParams();
    const path = usePathname();
    const isMatchedURL = path.includes('/articleDetail');

    return (
        <AnimatePresence>
            {params.articleId && isMatchedURL ? (
                <motion.div
                    animate={{ transform: 'translateX(0)' }}
                    exit={{ transform: 'translateX(100%)' }}
                    initial={{ transform: 'translateX(100%)' }}
                    key="modalArticleDetail"
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
                    {art}
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

function InterceptingExpert({ personal }: { personal: ReactNode }) {
    const params = useParams();
    const path = usePathname();
    const isMatchedURL = path.includes('/masterAvatar');

    return (
        <AnimatePresence>
            {params.masterId && isMatchedURL ? (
                <motion.div
                    animate={{ transform: 'translateX(0)' }}
                    exit={{ transform: 'translateX(100%)' }}
                    initial={{ transform: 'translateX(100%)' }}
                    key="modalMasterDetail"
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
                    {personal}
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

function MasterLayout({
    children,
    art,
    personal
}: {
    children: ReactNode;
    art: ReactNode;
    personal: ReactNode;
}) {
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
            <InterceptingArticle art={art} />
            <InterceptingExpert personal={personal} />
        </div>
    );
}

export default MasterLayout;
