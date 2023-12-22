'use client';
import { useState, type ReactNode, useEffect } from 'react';
import { getFootballStatsResult, type GetFootballStatsReportResponse } from 'data-center';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/app/userStore';
import { createAnalysisResultStore } from './analysisResultStore';
import { creatMatchFilterStore } from './matchFilterStore';

function CreateStore({
    resultData,
    children
}: {
    resultData: GetFootballStatsReportResponse;
    children: ReactNode;
}) {
    createAnalysisResultStore({
        analysisResultData: resultData
    });

    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });

    return <>{children}</>;
}

function DetailLayout({ children }: { children: ReactNode }) {
    const params = useParams();
    const userInfo = useUserStore.use.userInfo();
    const [resultData, setResultData] = useState<GetFootballStatsReportResponse>();

    const fetchData = async () => {
        const res = await getFootballStatsResult({
            ticketId: params.recordId.toString(),
            memberId: userInfo.uid
        });

        if (res.success) {
            setResultData(res.data);
        }
    };

    useEffect(() => {
        void fetchData();
    }, [params.recordId, userInfo.uid]);

    return resultData ? <CreateStore resultData={resultData}>{children}</CreateStore> : null;
}

export default DetailLayout;
