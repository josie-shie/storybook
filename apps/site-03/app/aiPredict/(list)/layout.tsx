'use client';
import type { ReactNode } from 'react';
import { creatAiPredictStore } from '../aiPredictStore';
import style from './layout.module.scss';

function AiPredictPageLayout({ children }: { children: ReactNode }) {
    creatAiPredictStore({
        aiPredictList: [],
        aiHistoryList: []
    });

    return <div className={style.aiPredictPageLayout}>{children}</div>;
}

export default AiPredictPageLayout;
