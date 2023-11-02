'use client';
import type {
    SingleMatchTeamName,
    FormatLeagueTrendDataResponse,
    FormatRecordDataResponse,
    GetAnalysisOthersResponse
} from 'data-center';
import BeforeGameTable from './beforeGameTable';
import LeagueRankTables from './leagueRankTables';
import LeagueTrendTables from './leagueTrendTables';
import WinLoseCountTable from './winLoseCountTable';
import { createAnalyzeStore } from './analyzeStore';

function Analyze({ analysisData }: { analysisData: GetAnalysisOthersResponse }) {
    createAnalyzeStore({
        companyDetailAnalyze: [],
        teamInfo: {} as SingleMatchTeamName,
        leagueTrendData: {} as FormatLeagueTrendDataResponse,
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
