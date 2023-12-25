'use client';
import { useState, type ReactNode, useEffect } from 'react';
import { getFootballStatsResult, type GetFootballStatsReportResponse } from 'data-center';
import { useUserStore } from '@/app/userStore';
import { createAnalysisResultStore } from './analysisResultStore';
import { creatMatchFilterStore } from './matchFilterStore';
// import { useHandicapAnalysisFormStore } from '../formStore';

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
    const userInfo = useUserStore.use.userInfo();
    const [resultData, setResultData] = useState<GetFootballStatsReportResponse>();
    // const endDate = useHandicapAnalysisFormStore.use.endDate();
    // const startDate = useHandicapAnalysisFormStore.use.startDate();
    // const teamSelected = useHandicapAnalysisFormStore.use.teamSelected();
    // const teamHandicapOdds = useHandicapAnalysisFormStore.use.teamHandicapOdds();
    // const handicapOddsSelected = useHandicapAnalysisFormStore.use.handicapOddsSelected();

    const fetchData = async () => {
        const res = await getFootballStatsResult({
            ticketId: '0fbdd0b',
            memberId: userInfo.uid
        });

        if (res.success) {
            setResultData(res.data);
        }
    };

    useEffect(() => {
        void fetchData();
    }, [userInfo.uid]);

    return resultData ? <CreateStore resultData={resultData}>{children}</CreateStore> : null;
}

export default DetailLayout;
