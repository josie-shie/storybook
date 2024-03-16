'use client';
import type { ReactNode } from 'react';
import style from './layout.module.scss';
import { creatAiPredictStore } from './aiPredictStore';

function AiPredictPageLayout({ children }: { children: ReactNode }) {
    creatAiPredictStore({
        aiPredictList: [],
        aiHistoryList: []
    });

    return <div className={style.aiPredictPageLayout}>{children}</div>;
}

export default AiPredictPageLayout;
