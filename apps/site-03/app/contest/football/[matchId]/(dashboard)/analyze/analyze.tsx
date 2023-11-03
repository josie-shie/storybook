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
import { createHomeRecordStore } from './homeAwayRecordTable/homeRecordStore';
import { createAwayRecordStore } from './homeAwayRecordTable/awayRecordStore';
import BattleRecordTable from './battleRecordTable/battleRecordTable';
import HomeAwayRecord from './homeAwayRecordTable/homeAwayRecordTable';

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
        winLoseCountData: analysisData.winLoseCountData
    });

    createBattleRecordStore({
        // battleRecordData: analysisData.battleRecordData
        battleRecordData: {
            bet365: {
                full: [
                    {
                        matchId: 1,
                        leagueCup: '1',
                        leagueName: '韩K联',
                        matchTime: '23-11-02',
                        winLose: '1',
                        isHome: true,
                        homeScore: 1,
                        awayScore: 3,
                        homeHalfScore: 1,
                        awayHalfScore: 0,
                        homeTeamName: 'Team A',
                        awayTeamName: 'Team B',
                        initial: {
                            handicap: '0.25',
                            overUnder: 2.5,
                            handicapType: 'lose',
                            overType: 'big'
                        },
                        current: {
                            handicap: '0.75',
                            overUnder: 3.0,
                            handicapType: 'lose',
                            overType: 'big'
                        }
                    }
                ],
                half: [
                    {
                        matchId: 1,
                        leagueCup: '1',
                        leagueName: '韩K联',
                        matchTime: '23-11-02',
                        winLose: '0',
                        isHome: true,
                        homeScore: 3,
                        awayScore: 1,
                        homeHalfScore: 1,
                        awayHalfScore: 0,
                        homeTeamName: 'Team A',
                        awayTeamName: 'Team B',
                        initial: {
                            handicap: '0.25',
                            overUnder: 2.5,
                            handicapType: 'win',
                            overType: 'big'
                        },
                        current: {
                            handicap: '0.75',
                            overUnder: 3.0,
                            handicapType: 'win',
                            overType: 'big'
                        }
                    }
                ]
            },
            crown: {
                full: [
                    {
                        matchId: 1,
                        leagueCup: '1',
                        leagueName: '韩K联',
                        matchTime: '23-11-02',
                        winLose: '0',
                        isHome: true,
                        homeScore: 3,
                        awayScore: 1,
                        homeHalfScore: 1,
                        awayHalfScore: 0,
                        homeTeamName: 'Team A',
                        awayTeamName: 'Team B',
                        initial: {
                            handicap: '0.25',
                            overUnder: 2.5,
                            handicapType: 'win',
                            overType: 'big'
                        },
                        current: {
                            handicap: '0.75',
                            overUnder: 3.0,
                            handicapType: 'win',
                            overType: 'big'
                        }
                    }
                ],
                half: [
                    {
                        matchId: 1,
                        leagueCup: '1',
                        leagueName: '韩K联',
                        matchTime: '23-11-02',
                        winLose: '0',
                        isHome: true,
                        homeScore: 3,
                        awayScore: 1,
                        homeHalfScore: 1,
                        awayHalfScore: 0,
                        homeTeamName: 'Team A',
                        awayTeamName: 'Team B',
                        initial: {
                            handicap: '0.25',
                            overUnder: 2.5,
                            handicapType: 'win',
                            overType: 'big'
                        },
                        current: {
                            handicap: '0.75',
                            overUnder: 3.0,
                            handicapType: 'win',
                            overType: 'big'
                        }
                    }
                ]
            }
        }
    });

    createHomeRecordStore({
        homeRecordData: analysisData.LastMatches.home
    });

    createAwayRecordStore({
        awayRecordData: analysisData.LastMatches.away
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
