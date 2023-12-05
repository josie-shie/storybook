'use client';
import { useState, type ReactNode, useEffect } from 'react';
import '@/app/football/[matchId]/dataTable.scss';
import type { GetSingleMatchResponse } from 'data-center';
import { getMatchDetail } from 'data-center';
import LiveBox from '@/app/football/[matchId]/liveBox';
import GuessBar from '@/app/football/[matchId]/guessBar';
import TabBar from '@/app/football/[matchId]/tabBar';
import OddMqttService from '@/app/football/[matchId]/oddMqttService';

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
