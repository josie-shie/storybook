'use client';
import { type ReactNode } from 'react';
import { creatHandicapAnalysisStore } from './formStore';

function BigDataLayout({ children }: { children: ReactNode }) {
    creatHandicapAnalysisStore({
        recordList: []
    });
    return <>{children}</>;
}

export default BigDataLayout;
