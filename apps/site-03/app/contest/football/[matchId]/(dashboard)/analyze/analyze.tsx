'use client';
import type {
    FormatRecordDataResponse,
    GetAnalysisOthersResponse,
    GetLeaguePointsRankResponse,
    GetBeforeGameIndexResponse
} from 'data-center';
import BeforeGameTable from './beforeGameTable';
import LeagueRankTables from './leagueRankTables';
import LeagueTrendTables from './leagueTrendTables';
import WinLoseCountTable from './winLoseCountTable';
import { createAnalyzeStore } from './analyzeStore';

interface PropsType {
    analysisData: GetAnalysisOthersResponse;
    beforeGameData: GetBeforeGameIndexResponse;
}

function Analyze({ analysisData, beforeGameData }: PropsType) {
    createAnalyzeStore({
        companyDetailAnalyze: beforeGameData,
        leaguePointsRankData: {} as GetLeaguePointsRankResponse,
        teamInfo: analysisData.teamInfo,
        leagueTrendData: analysisData.leagueTrendData,
        battleRecordData: {} as FormatRecordDataResponse,
        lastMatches: {
            home: {} as FormatRecordDataResponse,
            away: {} as FormatRecordDataResponse
        },
        winLoseCountData: analysisData.winLoseCountData
    });

    return (
        <>
            <BeforeGameTable />
            <LeagueRankTables />
            <LeagueTrendTables />
            <WinLoseCountTable />
        </>
    );
}

export default Analyze;
