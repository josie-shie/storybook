'use client';
import type { ReactNode } from 'react';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/headerLogo';
import style from './layout.module.scss';
import { creatAiPredictStore } from './aiPredictStore';

function AiPredictPageLayout({ children }: { children: ReactNode }) {
    creatAiPredictStore({
        aiPredictList: []
    });

    return (
        <div className={style.aiPredictPageLayout}>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default AiPredictPageLayout;
