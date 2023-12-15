'use client';
import type { ReactNode } from 'react';
import type { GetFootballStatsReportResponse } from 'data-center';
import AnalysisResult from './analysisResult';
import { createAnalysisResultStore } from './analysisResultStore';
import { creatMatchFilterStore } from './matchFilterStore';

function DetailLayout({ children }: { children: ReactNode }) {
    createAnalysisResultStore({
        analysisResultData: {} as GetFootballStatsReportResponse
    });
    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });

    return <AnalysisResult>{children}</AnalysisResult>;
}

export default DetailLayout;
