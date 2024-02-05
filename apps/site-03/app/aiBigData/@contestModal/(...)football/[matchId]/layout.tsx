'use client';
import { useState, useEffect, useRef } from 'react';
import '@/app/football/[matchId]/dataTable.scss';
import type { GetSingleMatchResponse } from 'data-center';
import { getMatchDetail } from 'data-center';
import LiveBox from '@/app/football/[matchId]/liveBox';
import GuessBar from '@/app/football/[matchId]/guessBar';
import TabContent from '@/app/football/[matchId]/tabContent';
import OddMqttService from '@/app/football/[matchId]/oddMqttService';
import { useInterceptPassStore } from '@/store/interceptPassStore';
import { useLockBodyScroll } from '@/hooks/lockScroll';

interface InterceptDataType {
    awayChs: string;
    awayHalfScore: number;
    awayScore: number;
    countryCn: string;
    homeChs: string;
    homeHalfScore: number;
    homeScore: number;
    isFamous: boolean;
    leagueChsShort: string;
    leagueId: number;
    leagueLevel: number;
    matchId: number;
    startTime: number;
    [key: string]: number | string | boolean;
}

function DetailLayout({ params }: { params: { matchId: number } }) {
    const secondRender = useRef(false);
    const [contestDetail, setContestDetail] = useState({});
    const interceptData = useInterceptPassStore.use.interceptData();
    const resetInterceptData = useInterceptPassStore.use.resetInterceptData();

    useLockBodyScroll();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getMatchDetail(params.matchId);
            if (!res.success) return;
            setContestDetail(res.data);
        };
        void fetchData();

        return () => {
            if (secondRender.current) {
                resetInterceptData();
            } else {
                secondRender.current = true;
            }
        };
    }, [params.matchId, resetInterceptData]);

    return (
        <>
            <LiveBox
                backHistory
                contestDetail={contestDetail as GetSingleMatchResponse}
                interceptData={interceptData as InterceptDataType}
                matchId={params.matchId}
            />
            <GuessBar />
            <TabContent initStatus="messageBoard" matchId={params.matchId} />
            <OddMqttService />
        </>
    );
}

export default DetailLayout;
