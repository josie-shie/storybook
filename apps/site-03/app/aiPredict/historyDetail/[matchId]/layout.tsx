'use client';
import type { ReactNode } from 'react';
import style from './layout.module.scss';

function AiPredictDetailLayout({ children }: { children: ReactNode }) {
    return <div className={style.aiHistoryDetailLayout}>{children}</div>;
}

export default AiPredictDetailLayout;
