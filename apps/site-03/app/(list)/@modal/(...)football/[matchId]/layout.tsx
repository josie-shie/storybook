'use client';
import { useState, useEffect } from 'react';
import '@/app/football/[matchId]/dataTable.scss';
import type { GetSingleMatchResponse } from 'data-center';
import { getMatchDetail } from 'data-center';
import LiveBox from '@/app/football/[matchId]/liveBox';
import GuessBar from '@/app/football/[matchId]/guessBar';
import TabContent from '@/app/football/[matchId]/tabContent';
import OddMqttService from '@/app/football/[matchId]/oddMqttService';

function DetailLayout({ params }: { params: { matchId: number } }) {
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
            <TabContent initStatus="messageBoard" matchId={params.matchId} />
            <OddMqttService />
        </>
    );
}

export default DetailLayout;
