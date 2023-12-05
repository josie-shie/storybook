'use client';
import { useState, type ReactNode, useEffect } from 'react';
import '@/app/[matchId]/dataTable.scss';
import type { GetSingleMatchResponse } from 'data-center';
import { getMatchDetail } from 'data-center';
import LiveBox from '@/app/[matchId]/liveBox';
import GuessBar from '@/app/[matchId]/guessBar';
import TabBar from '@/app/[matchId]/tabBar';
import OddMqttService from '@/app/[matchId]/oddMqttService';

function DetailLayout({ children, params }: { children: ReactNode; params: { matchId: number } }) {
    const [contestDetail, setContestDetail] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await getMatchDetail(params.matchId);
            if (!res.success) return;
            setContestDetail(res.data);
        };
        void fetchData();
    }, [params.matchId]);

    return (
        <>
            <LiveBox
                backHistory
                contestDetail={contestDetail as GetSingleMatchResponse}
                matchId={params.matchId}
            />
            <GuessBar />
            <TabBar matchId={params.matchId}>{children}</TabBar>
            <OddMqttService />
        </>
    );
}

export default DetailLayout;
