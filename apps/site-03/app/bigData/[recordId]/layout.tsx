import type { ReactNode } from 'react';
import { getAiAnalysisReport, getBigDataRecordList } from 'data-center';
import BigData from './bigData';

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
        <BigData analysisData={analysisData.data} recordList={recordList.data}>
            {children}
        </BigData>
    );
}

export default DetailLayout;
