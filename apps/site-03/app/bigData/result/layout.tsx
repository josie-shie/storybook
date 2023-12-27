'use client';
import { useState, type ReactNode, useEffect } from 'react';
import { getFootballStatsResult, type GetFootballStatsReportResponse } from 'data-center';
import { useUserStore } from '@/app/userStore';
import { useHandicapAnalysisFormStore } from '../formStore';
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
    const userInfo = useUserStore.use.userInfo();
    const [resultData, setResultData] = useState<GetFootballStatsReportResponse>();
    const setLoading = useHandicapAnalysisFormStore.use.setLoading();
    // const endDate = useHandicapAnalysisFormStore.use.endDate();
    // const startDate = useHandicapAnalysisFormStore.use.startDate();
    // const teamSelected = useHandicapAnalysisFormStore.use.teamSelected();
    // const teamHandicapOdds = useHandicapAnalysisFormStore.use.teamHandicapOdds();
    // const handicapOddsSelected = useHandicapAnalysisFormStore.use.handicapOddsSelected();

    const fetchData = async () => {
        setLoading(true);
        const res = await getFootballStatsResult({
            ticketId: '0fbdd0b',
            memberId: userInfo.uid
        });

        if (res.success) {
            setResultData(res.data);
        }

        setLoading(false);
    };

    useEffect(() => {
        void fetchData();
    }, [userInfo.uid]);

    return resultData ? <CreateStore resultData={resultData}>{children}</CreateStore> : null;
}

export default DetailLayout;
