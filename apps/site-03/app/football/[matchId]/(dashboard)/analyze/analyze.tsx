'use client';
import type {
    GetAnalysisOthersResponse,
    GetLeaguePointsRankResponse,
    GetBeforeGameIndexResponse
} from 'data-center';
import { resetSwiperHight } from 'ui/stories/slickPro/slick';
import PageEndText from '@/components/pageEndText/pageEndText';
import { createAnalyzeStore } from '../../analyzeStore';
import BeforeGameTable from './beforeGameTable';
import LeagueRankTables from './leagueRankTables';
import LeagueTrendTables from './leagueTrendTables';
import WinLoseCountTable from './winLoseCountTable';
import { createBattleRecordStore } from './battleRecordTable/battleRecordStore';
import { createHomeRecordStore } from './homeAwayRecordTable/homeRecordStore';
import { createAwayRecordStore } from './homeAwayRecordTable/awayRecordStore';
import BattleRecordTable from './battleRecordTable/battleRecordTable';
import HomeAwayRecord from './homeAwayRecordTable/homeAwayRecordTable';

interface PropsType {
    analysisData: GetAnalysisOthersResponse;
    beforeGameData: GetBeforeGameIndexResponse;
    leaguePointsRank: GetLeaguePointsRankResponse;
    analysisDataLoading: boolean;
    beforeGameDataLoading: boolean;
    leaguePointsRankLoading: boolean;
}

function Analyze({
    analysisData,
    beforeGameData,
    leaguePointsRank,
    analysisDataLoading,
    beforeGameDataLoading,
    leaguePointsRankLoading
}: PropsType) {
    createAnalyzeStore({
        companyDetailAnalyze: beforeGameData,
        leaguePointsRankData: leaguePointsRank,
        teamInfo: analysisData.teamInfo,
        leagueTrendData: analysisData.leagueTrendData,
        winLoseCountData: analysisData.winLoseCountData,
        analysisDataLoading,
        companyDetailAnalyzeLoading: beforeGameDataLoading,
        leaguePointsRankLoading
    });

    createBattleRecordStore({
        battleRecordData: analysisData.battleRecordData
    });

    createHomeRecordStore({
        homeRecordData: analysisData.LastMatches.home
    });

    createAwayRecordStore({
        awayRecordData: analysisData.LastMatches.away
    });

    resetSwiperHight();

    return (
        <>
            <BeforeGameTable />
            <LeagueRankTables />
            <LeagueTrendTables />
            <BattleRecordTable />
            <HomeAwayRecord />
            <WinLoseCountTable />
            <PageEndText paddingBottom={126} paddingTop={32} />
        </>
    );
}

export default Analyze;
