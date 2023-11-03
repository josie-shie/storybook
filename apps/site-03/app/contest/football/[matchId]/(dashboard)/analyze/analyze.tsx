'use client';
import type {
    GetAnalysisOthersResponse,
    GetLeaguePointsRankResponse,
    GetBeforeGameIndexResponse
} from 'data-center';
import BeforeGameTable from './beforeGameTable';
import LeagueRankTables from './leagueRankTables';
import LeagueTrendTables from './leagueTrendTables';
import WinLoseCountTable from './winLoseCountTable';
import { createAnalyzeStore } from './analyzeStore';
import { createBattleRecordStore } from './battleRecordTable/battleRecordStore';
import BattleRecordTable from './battleRecordTable/battleRecordTable';
import HomeAwayRecord from './homeAwayRecordTable';

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
        lastMatches: {
            home: analysisData.LastMatches.home,
            away: analysisData.LastMatches.away
        },
        winLoseCountData: analysisData.winLoseCountData
    });

    createBattleRecordStore({
        battleRecordData: analysisData.battleRecordData
    });

    return (
        <>
            <BeforeGameTable />
            <LeagueRankTables />
            <LeagueTrendTables />
            <BattleRecordTable />
            <HomeAwayRecord />
            <WinLoseCountTable />
        </>
    );
}

export default Analyze;
