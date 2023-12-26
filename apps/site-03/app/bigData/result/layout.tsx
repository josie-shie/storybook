'use client';
import { type ReactNode } from 'react';
import { createAnalysisResultStore } from './analysisResultStore';
import { creatMatchFilterStore } from './matchFilterStore';

function CreateStore({ children }: { children: ReactNode }) {
    createAnalysisResultStore({
        analysisResultData: undefined
    });

    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });

    return <>{children}</>;
}

function DetailLayout({ children }: { children: ReactNode }) {
    return <CreateStore>{children}</CreateStore>;
}

export default DetailLayout;
