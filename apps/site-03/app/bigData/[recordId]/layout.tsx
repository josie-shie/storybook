import type { ReactNode } from 'react';
import { getAiAnalysisReport } from 'data-center';
import AnalysisResult from './analysisResult';

async function DetailLayout({
    children,
    params
}: {
    children: ReactNode;
    params: { recordId: number };
}) {
    const analysisData = await getAiAnalysisReport({ recordId: Number(params.recordId) });

    if (!analysisData.success) {
        return <div />;
    }

    return <AnalysisResult analysisData={analysisData.data}>{children}</AnalysisResult>;
}

export default DetailLayout;
