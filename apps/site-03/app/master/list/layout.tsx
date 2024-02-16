'use client';

import type { ReactNode } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/components/header/headerLogo';
import Footer from '@/components/footer/footer';
import style from './layout.module.scss';

function InterceptingArticle({ art }: { art: ReactNode }) {
    const params = useParams();
    const path = usePathname();
    const isMatchedURL = path.includes('/articleDetail');

    return (
        <>
            {params.articleId && isMatchedURL ? (
                <motion.div
                    animate={{ left: '0%' }}
                    initial={{ left: '100%' }}
                    key="modalArticleDetail"
                    style={{
                        background: '#fff',
                        width: '100%',
                        position: 'fixed',
                        top: 0,
                        zIndex: 999,
                        height: '100dvh',
                        overflowY: 'auto'
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {art}
                </motion.div>
            ) : null}
        </>
    );
}

function InterceptingExpert({ personal }: { personal: ReactNode }) {
    const params = useParams();
    const path = usePathname();
    const isMatchedURL = path.includes('/masterAvatar');

    return (
        <>
            {params.masterId && isMatchedURL ? (
                <motion.div
                    animate={{ left: '0%' }}
                    initial={{ left: '100%' }}
                    key="modalMasterDetail"
                    style={{
                        background: '#fff',
                        width: '100%',
                        position: 'fixed',
                        top: 0,
                        zIndex: 999,
                        height: '100dvh',
                        overflowY: 'auto'
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {personal}
                </motion.div>
            ) : null}
        </>
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
            <div className={style.predict}>{children}</div>
            <Footer />
            <InterceptingArticle art={art} />
            <InterceptingExpert personal={personal} />
        </div>
    );
}

export default MasterLayout;
