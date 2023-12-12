import type { ReactNode } from 'react';
import { getAiAnalysisReport, getBigDataRecordList } from 'data-center';
import AnalysisResult from './analysisResult';

async function DetailLayout({
    children,
    params
}: {
    children: ReactNode;
    params: { recordId: number };
}) {
    const analysisData = await getAiAnalysisReport({ recordId: Number(params.recordId) });
    const recordList = await getBigDataRecordList();

    if (!analysisData.success || !recordList.success) {
        return <div />;
    }

    return (
        <AnalysisResult analysisData={analysisData.data} recordList={recordList.data}>
            {children}
        </AnalysisResult>
    );
}

export default DetailLayout;
