import {
    fetcher,
    truncateFloatingPoint,
    convertHandicap,
    timestampToString,
    convertOdds
} from 'lib';
import { z } from 'zod';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import {
    GET_BEFORE_GAME_INDEX_ANALYZE_QUERY,
    GET_LEAGUE_STANDINGS_QUERY,
    GET_ANALYSIS_QUERY,
    GET_MATCHES_ODDS_DETAIL_QUERY
} from './graphqlQueries';

const HandicapsInfoSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialHandicap: z.number(),
    homeInitialOdds: z.number(),
    awayInitialOdds: z.number(),
    currentHandicap: z.number(),
    homeCurrentOdds: z.number(),
    awayCurrentOdds: z.number(),
    oddsChangeTime: z.number(),
    oddsType: z.number(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    isClosed: z.boolean()
});

const TotalGoalsInfoSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialTotalGoals: z.number(),
    overInitialOdds: z.number(),
    underInitialOdds: z.number(),
    currentTotalGoals: z.number(),
    overCurrentOdds: z.number(),
    underCurrentOdds: z.number(),
    oddsChangeTime: z.number(),
    oddsType: z.number(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    isClosed: z.boolean()
});

const WinDrawLoseSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialHomeOdds: z.number(),
    initialDrawOdds: z.number(),
    initialAwayOdds: z.number(),
    currentHomeOdds: z.number(),
    currentDrawOdds: z.number(),
    currentAwayOdds: z.number(),
    oddsChangeTime: z.number(),
    isClosed: z.boolean(),
    oddsType: z.number(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number()
});

const GetBeforeGameIndexResultSchema = z.object({
    getCompanyOddsDetail: z.object({
        companyOdds: z.object({
            companyId: z.number(),
            companyName: z.string(),
            fullHandicap: z.array(HandicapsInfoSchema),
            fullTotalGoal: z.array(TotalGoalsInfoSchema),
            fullWinDrawLose: z.array(WinDrawLoseSchema)
        })
    })
});

const GetBeforeGameIndex = z.object({
    label: z.string(),
    init: z.number(),
    initHome: z.number(),
    initAway: z.number(),
    current: z.number(),
    currentHome: z.number(),
    currentAway: z.number()
});

export type GetBeforeGameIndex = z.infer<typeof GetBeforeGameIndex>;
export type GetBeforeGameIndexResponse = GetBeforeGameIndex[];

type GetBeforeGameIndexResult = z.infer<typeof GetBeforeGameIndexResultSchema>;

const SingleMatchTeamNameSchema = z.object({
    homeEn: z.string(),
    homeChs: z.string(),
    homeCht: z.string(),
    awayEn: z.string(),
    awayChs: z.string(),
    awayCht: z.string(),
    homeId: z.number(),
    awayId: z.number()
});

export type SingleMatchTeamName = z.infer<typeof SingleMatchTeamNameSchema>;

const LeagueStandingsSchema = z.object({
    teamId: z.number(),
    totalCount: z.number(),
    winCount: z.number(),
    drawCount: z.number(),
    loseCount: z.number(),
    getScore: z.number(),
    loseScore: z.number(),
    goalDifference: z.number(),
    integral: z.number(),
    rank: z.number(),
    winRate: z.number(),
    homeTotalCount: z.number(),
    homeWinCount: z.number(),
    homeDrawCount: z.number(),
    homeLoseCount: z.number(),
    homeGetScore: z.number(),
    homeLoseScore: z.number(),
    homeGoalDifference: z.number(),
    homeIntegral: z.number(),
    homeRank: z.number(),
    homeWinRate: z.number(),
    awayTotalCount: z.number(),
    awayWinCount: z.number(),
    awayDrawCount: z.number(),
    awayLoseCount: z.number(),
    awayGetScore: z.number(),
    awayLoseScore: z.number(),
    awayGoalDifference: z.number(),
    awayIntegral: z.number(),
    awayRank: z.number(),
    awayWinRate: z.number(),
    recentTotalCount: z.number(),
    recentWinCount: z.number(),
    recentDrawCount: z.number(),
    recentLoseCount: z.number(),
    recentGetScore: z.number(),
    recentLoseScore: z.number(),
    recentGoalDifference: z.number(),
    recentIntegral: z.number(),
    recentWinRate: z.number(),
    teamName: z.string()
});

const GetLeaguePointsRankSchema = z.object({
    getLeagueStandings: z.object({
        homeTeamStandings: z.nullable(LeagueStandingsSchema),
        awayTeamStandings: z.nullable(LeagueStandingsSchema)
    })
});

type GetLeaguePointsRankResult = z.infer<typeof GetLeaguePointsRankSchema>;

export interface LeaguePointsRankInfo {
    totalCount: number;
    winCount: number;
    drawCount: number;
    loseCount: number;
    getScore: number;
    loseScore: number;
    goalDifference: number;
    integral: number;
    rank: number | string;
    winRate: number;
}

export interface LeaguePointsRank {
    total: LeaguePointsRankInfo;
    home: LeaguePointsRankInfo;
    away: LeaguePointsRankInfo;
    recent: LeaguePointsRankInfo;
}

export interface GetLeaguePointsRankResponse {
    homeTeam: LeaguePointsRank | Record<'total' | 'home' | 'away' | 'recent', never>;
    awayTeam: LeaguePointsRank | Record<'total' | 'home' | 'away' | 'recent', never>;
}

const HTHEuropeOddsSchema = z.object({
    initialHomeOdds: z.number(),
    initialDrawOdds: z.number(),
    initialAwayOdds: z.number(),
    currentHomeOdds: z.number(),
    currentDrawOdds: z.number(),
    currentAwayOdds: z.number()
});

const HTHOverUnderOddsSchema = z.object({
    initialHandicap: z.number(),
    initialOverOdds: z.number(),
    initialUnderOdds: z.number(),
    currentHandicap: z.number(),
    currentOverOdds: z.number(),
    currentUnderOdds: z.number()
});

const HTHAsiaOddsSchema = z.object({
    homeInitialOdds: z.number(),
    initialHandicap: z.number(),
    awayInitialOdds: z.number(),
    homeCurrentOdds: z.number(),
    currentHandicap: z.number(),
    awayCurrentOdds: z.number()
});

export type HTHAsiaOdds = z.infer<typeof HTHAsiaOddsSchema>;

const HTHMatchSchema = z.object({
    matchId: z.number(),
    leagueId: z.number(),
    leagueEn: z.string(),
    leagueChs: z.string(),
    leagueCht: z.string(),
    matchTime: z.number(),
    matchLocation: z.string(),
    homeId: z.number(),
    homeEn: z.string(),
    homeChs: z.string(),
    homeCht: z.string(),
    awayId: z.number(),
    awayEn: z.string(),
    awayChs: z.string(),
    awayCht: z.string(),
    homeScore: z.number(),
    awayScore: z.number(),
    homeHalfScore: z.number(),
    awayHalfScore: z.number(),
    homeRed: z.number(),
    awayRed: z.number(),
    homeCorner: z.number(),
    awayCorner: z.number(),
    asiaOdds: HTHAsiaOddsSchema,
    europeOdds: HTHEuropeOddsSchema,
    overUnderOdds: HTHOverUnderOddsSchema,
    winLose: z.union([z.literal('0'), z.literal('1'), z.literal('2')]),
    leagueCup: z.union([z.literal('0'), z.literal('1')])
});

type HTHMatch = z.infer<typeof HTHMatchSchema>;

const AnalysisOddsSchema = z.object({
    name: z.string(),
    played: z.number(),
    handicapWin: z.number(),
    handicapDraw: z.number(),
    handicapLose: z.number(),
    HandicapWinRate: z.number(),
    overUnderOver: z.number(),
    overUnderOverRate: z.number(),
    overUnderUnder: z.number(),
    overUnderUnderRate: z.number()
});

export type AnalysisOdds = z.infer<typeof AnalysisOddsSchema>;

const AnalysisLastSixResultSchema = z.object({
    name: z.string(),
    played: z.number(),
    handicapResult: z.string(),
    handicapWinRate: z.number(),
    overUnderResult: z.string()
});

export type AnalysisLastSixResult = z.infer<typeof AnalysisLastSixResultSchema>;
const HTWinCountsSchema = z.object({
    victoryVictory: z.string(),
    victoryDraw: z.string(),
    victoryDefeat: z.string(),
    drawVictory: z.string(),
    drawDraw: z.string(),
    drawDefeat: z.string(),
    defeatVictory: z.string(),
    defeatDraw: z.string(),
    defeatDefeat: z.string()
});

const HTWinCountsStatSchema = z.object({
    total: HTWinCountsSchema,
    home: HTWinCountsSchema,
    away: HTWinCountsSchema
});

type HTWinCountsStat = z.infer<typeof HTWinCountsStatSchema>;

const HomeAwayOddsSchema = z.object({
    totalFullTime: AnalysisOddsSchema,
    homeFullTime: AnalysisOddsSchema,
    awayFullTime: AnalysisOddsSchema,
    lastSixResultFullTime: AnalysisLastSixResultSchema,
    totalHalfTime: AnalysisOddsSchema,
    homeHalfTime: AnalysisOddsSchema,
    awayHalfTime: AnalysisOddsSchema,
    lastSixResultHalfTime: AnalysisLastSixResultSchema
});

export type HomeAwayOdds = z.infer<typeof HomeAwayOddsSchema>;

interface Rows {
    name: string;
    label: 'totalFullTime' | 'homeFullTime' | 'awayFullTime';
}

interface LeagueTrend {
    played: number;
    handicapDraw: number;
    handicapLose: number;
    handicapWinRate: number;
    overUnderOver: number;
    overUnderOverRate: number;
    overUnderUnder: number;
    overUnderUnderRate: number;
    name: string;
    label: 'totalFullTime' | 'homeFullTime' | 'awayFullTime';
}

export interface GetLeagueTrendResponse {
    homeTrendList: LeagueTrend[];
    awayTrendList: LeagueTrend[];
    teamInfo: SingleMatchTeamName;
}

const GetAnalyzeSchema = z.object({
    getSingleMatch: SingleMatchTeamNameSchema,
    getAnalysis: z.object({
        statistics: z.object({
            headToHead: z.array(HTHMatchSchema),
            homeLastMatches: z.array(HTHMatchSchema),
            awayLastMatches: z.array(HTHMatchSchema),
            homeOdds: HomeAwayOddsSchema,
            awayOdds: HomeAwayOddsSchema,
            homeHT: HTWinCountsStatSchema,
            awayHT: HTWinCountsStatSchema
        })
    })
});

type GetAnalyzeResult = z.infer<typeof GetAnalyzeSchema>;

const AsiaMatchSchema = z.object({
    matchId: z.number(),
    matchTime: z.number(),
    startTime: z.number(),
    leagueId: z.number(),
    leagueEn: z.string(),
    leagueChs: z.string(),
    leagueCht: z.string(),
    homeEn: z.string(),
    homeChs: z.string(),
    homeCht: z.string(),
    awayEn: z.string(),
    awayChs: z.string(),
    awayCht: z.string(),
    homeId: z.number(),
    awayId: z.number(),
    homeRank: z.string(),
    awayRank: z.string(),
    isNeutral: z.boolean(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    homeRed: z.number(),
    awayRed: z.number()
});
const MatchesHandicapSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialHandicap: z.number(),
    homeInitialOdds: z.number(),
    awayInitialOdds: z.number(),
    currentHandicap: z.number(),
    homeCurrentOdds: z.number(),
    awayCurrentOdds: z.number(),
    isMaintained: z.boolean(),
    isInProgress: z.boolean(),
    oddsChangeTime: z.number(),
    isClosed: z.boolean(),
    oddsType: z.number()
});

const MatchesOverUnderSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialHandicap: z.number(),
    initialOverOdds: z.number(),
    initialUnderOdds: z.number(),
    currentHandicap: z.number(),
    currentOverOdds: z.number(),
    currentUnderOdds: z.number(),
    oddsChangeTime: z.number(),
    isClosed: z.boolean(),
    oddsType: z.number()
});
const MatchesHandicapHalfSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialHandicap: z.number(),
    homeInitialOdds: z.number(),
    awayInitialOdds: z.number(),
    currentHandicap: z.number(),
    homeCurrentOdds: z.number(),
    awayCurrentOdds: z.number(),
    oddsChangeTime: z.number(),
    oddsType: z.number()
});
const MatchesOverUnderHalfSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialHandicap: z.number(),
    initialOverOdds: z.number(),
    initialUnderOdds: z.number(),
    currentHandicap: z.number(),
    currentOverOdds: z.number(),
    currentUnderOdds: z.number(),
    oddsChangeTime: z.number(),
    oddsType: z.number()
});
const MatchesOddsDetailSchema = z.object({
    match: AsiaMatchSchema,
    handicap: MatchesHandicapSchema,
    handicapHalf: MatchesHandicapHalfSchema,
    overUnder: MatchesOverUnderSchema,
    overUnderHalf: MatchesOverUnderHalfSchema
});

const MatchesOddsDetailsSchema = z.object({
    crownResponse: z.array(MatchesOddsDetailSchema),
    bet365Response: z.array(MatchesOddsDetailSchema)
});

type GetMatchesOddsDetailsResult = z.infer<typeof MatchesOddsDetailsSchema>;

export interface HomeTrend {
    name: string;
    label: string;
    played: number;
    handicapDraw: number;
    handicapLose: number;
    handicapWinRate: number;
    overUnderOver: number;
    overUnderOverRate: number;
    overUnderUnder: number;
    overUnderUnderRate: number;
}

export interface FormatLeagueTrendDataResponse {
    homeTrendList: HomeTrend[];
    awayTrendList: HomeTrend[];
    homeResult: {
        handicap: string;
        overUnder: string;
    };
    awayResult: {
        handicap: string;
        overUnder: string;
    };
}

export interface WinLoseCountDate {
    homeHome: string;
    homeAway: string;
    awayHome: string;
    awayAway: string;
    name: string;
    label:
        | 'victoryVictory'
        | 'drawVictory'
        | 'defeatVictory'
        | 'victoryDraw'
        | 'drawDraw'
        | 'defeatDraw'
        | 'victoryDefeat'
        | 'drawDefeat'
        | 'defeatDefeat';
}

export interface TotalCount {
    homeHome: number;
    homeAway: number;
    awayHome: number;
    awayAway: number;
}

export interface FormatWinLoseCountDataResponse {
    data: WinLoseCountDate[];
    totalCount: TotalCount;
}

interface OddsDetail {
    matchId: number;
    leagueCup: '0' | '1' | '2';
    matchTime: string;
    winLose: '0' | '1' | '2';
    isHome: boolean;
    homeScore: number;
    awayScore: number;
    homeHalfScore: number;
    awayHalfScore: number;
    homeTeamName: string;
    awayTeamName: string;
    leagueName: string;
    initial: {
        handicap: string;
        overUnder: string;
        handicapType: string;
        overType: string;
    };
    current: {
        handicap: string;
        overUnder: string;
        handicapType: string;
        overType: string;
    };
}

interface FullHalfOddsResponse {
    full: OddsDetail[];
    half: OddsDetail[];
}

/**
 * 聯賽走勢 format
 * - returns {@link FormatLeagueTrendDataResponse} {@link HomeTrend}
 */
const formatLeagueTrendData = (homeOdds: HomeAwayOdds, awayOdds: HomeAwayOdds) => {
    const rows: Rows[] = [
        { name: '总', label: 'totalFullTime' },
        { name: '主', label: 'homeFullTime' },
        { name: '客', label: 'awayFullTime' }
    ];

    const homeTrendList = rows.map(item => {
        return {
            ...item,
            played: homeOdds[item.label].played,
            handicapDraw: homeOdds[item.label].handicapDraw,
            handicapLose: homeOdds[item.label].handicapLose,
            handicapWinRate: truncateFloatingPoint(homeOdds[item.label].HandicapWinRate, 2),
            overUnderOver: homeOdds[item.label].overUnderOver,
            overUnderOverRate: truncateFloatingPoint(homeOdds[item.label].overUnderOverRate, 2),
            overUnderUnder: homeOdds[item.label].overUnderUnder,
            overUnderUnderRate: truncateFloatingPoint(homeOdds[item.label].overUnderUnderRate, 2)
        };
    });

    const awayTrendList = rows.map(item => {
        return {
            ...item,
            played: awayOdds[item.label].played,
            handicapDraw: awayOdds[item.label].handicapDraw,
            handicapLose: awayOdds[item.label].handicapLose,
            handicapWinRate: truncateFloatingPoint(homeOdds[item.label].HandicapWinRate, 2),
            overUnderOver: awayOdds[item.label].overUnderOver,
            overUnderOverRate: truncateFloatingPoint(homeOdds[item.label].overUnderOverRate, 2),
            overUnderUnder: awayOdds[item.label].overUnderUnder,
            overUnderUnderRate: truncateFloatingPoint(homeOdds[item.label].overUnderUnderRate, 2)
        };
    });
    const data: FormatLeagueTrendDataResponse = {
        homeTrendList,
        awayTrendList,
        homeResult: {
            handicap: homeOdds.lastSixResultFullTime.handicapResult,
            overUnder: homeOdds.lastSixResultFullTime.overUnderResult
        },
        awayResult: {
            handicap: awayOdds.lastSixResultFullTime.handicapResult,
            overUnder: awayOdds.lastSixResultFullTime.overUnderResult
        }
    };
    return data;
};

/**
 * 半场/全场胜负统计(进两赛季) format]
 * - returns {@link FormatWinLoseCountDataResponse} {@link WinLoseCountDate} {@link TotalCount}
 */
const formatWinLoseCountData = (homeHT: HTWinCountsStat, awayHT: HTWinCountsStat) => {
    interface WinLoseCount {
        name: string;
        label:
            | 'victoryVictory'
            | 'drawVictory'
            | 'defeatVictory'
            | 'victoryDraw'
            | 'drawDraw'
            | 'defeatDraw'
            | 'victoryDefeat'
            | 'drawDefeat'
            | 'defeatDefeat';
    }

    const rows: WinLoseCount[] = [
        { name: '半胜/全胜', label: 'victoryVictory' },
        { name: '半平/全胜', label: 'drawVictory' },
        { name: '半負/全胜', label: 'defeatVictory' },
        { name: '半胜/全平', label: 'victoryDraw' },
        { name: '半平/全平', label: 'drawDraw' },
        { name: '半負/全平', label: 'defeatDraw' },
        { name: '半胜/全負', label: 'victoryDefeat' },
        { name: '半平/全負', label: 'drawDefeat' },
        { name: '半負/全負', label: 'defeatDefeat' }
    ];

    const totalCount = {
        homeHome: 0,
        homeAway: 0,
        awayHome: 0,
        awayAway: 0
    };

    const rowData = rows.map(item => {
        totalCount.homeHome = totalCount.homeHome + Number(homeHT.home[item.label] || 0);
        totalCount.homeAway = totalCount.homeAway + Number(homeHT.away[item.label] || 0);
        totalCount.awayHome = totalCount.awayHome + Number(awayHT.home[item.label] || 0);
        totalCount.awayAway = totalCount.awayAway + Number(awayHT.away[item.label] || 0);

        return {
            ...item,
            homeHome: homeHT.home[item.label],
            homeAway: homeHT.away[item.label],
            awayHome: awayHT.home[item.label],
            awayAway: awayHT.away[item.label]
        };
    });

    const data: FormatWinLoseCountDataResponse = { data: rowData, totalCount };
    return data;
};

export interface FormatRecordDataResponse {
    bet365: FullHalfOddsResponse;
    crown: FullHalfOddsResponse;
}

export interface GetAnalysisOthersResponse {
    teamInfo: SingleMatchTeamName;
    leagueTrendData: FormatLeagueTrendDataResponse;
    battleRecordData: FormatRecordDataResponse;
    LastMatches: {
        home: FormatRecordDataResponse;
        away: FormatRecordDataResponse;
    };
    winLoseCountData: FormatWinLoseCountDataResponse;
}

const handleOddsType = ({
    handicap,
    overUnder,
    homeScore,
    awayScore
}: {
    handicap: number;
    overUnder: number;
    homeScore: number;
    awayScore: number;
}) => {
    const totalScore = homeScore + awayScore;
    let handicapType = '';
    let overType = '';

    if (
        homeScore - convertOdds(handicap)[0] > awayScore ||
        homeScore - convertOdds(handicap)[1] > awayScore
    ) {
        handicapType = 'win';
    }

    if (
        homeScore - convertOdds(handicap)[0] === awayScore ||
        homeScore - convertOdds(handicap)[1] === awayScore
    ) {
        handicapType = 'draw';
    }

    if (
        homeScore - convertOdds(handicap)[0] < awayScore &&
        homeScore - convertOdds(handicap)[1] < awayScore
    ) {
        handicapType = 'lose';
    }

    if (convertOdds(overUnder)[0] > totalScore || convertOdds(overUnder)[1] > totalScore) {
        overType = 'big';
    }

    if (convertOdds(overUnder)[0] < totalScore && convertOdds(overUnder)[1] < totalScore) {
        overType = 'small';
    }

    if (convertOdds(overUnder)[0] === totalScore && convertOdds(overUnder)[1] === totalScore) {
        overType = 'draw';
    }

    return {
        overType,
        handicapType
    };
};

/**
 * 對戰紀錄 format
 * - returns {@link FormatRecordDataResponse} {@link MatchCompanyOdds}
 */
const formatRecordData = ({
    matchesList,
    matchesOddsDetails,
    homeId
}: {
    matchesList: HTHMatch[];
    matchesOddsDetails: GetMatchesOddsDetailsResult;
    homeId: number;
}) => {
    const matchesDataMap = matchesList.reduce((acc, item) => {
        acc.set(item.matchId, item);
        return acc;
    }, new Map<number, HTHMatch>());

    const bet365Response = matchesOddsDetails.bet365Response.reduce<FullHalfOddsResponse>(
        (preItem, item) => {
            const matchData = matchesDataMap.get(item.match.matchId);
            let mainScore = 0;
            let secondScore = 0;
            const basicInfo = {
                matchId: item.match.matchId,
                leagueCup: matchData?.leagueCup || '0',
                matchTime: timestampToString(item.match.matchTime),
                winLose: matchData?.winLose || '0',
                isHome: homeId === item.match.homeId,
                homeTeamName: item.match.homeChs,
                awayTeamName: item.match.homeChs,
                homeScore: matchData?.homeScore || 0,
                awayScore: matchData?.awayScore || 0,
                homeHalfScore: matchData?.homeHalfScore || 0,
                awayHalfScore: matchData?.awayHalfScore || 0,
                leagueName: item.match.leagueChs
            };

            if (homeId === item.match.homeId) {
                mainScore = matchData?.homeScore || 0;
                secondScore = matchData?.awayScore || 0;
            } else {
                mainScore = matchData?.awayScore || 0;
                secondScore = matchData?.homeScore || 0;
            }

            const full = {
                ...basicInfo,
                initial: {
                    handicap: convertHandicap(item.handicap.initialHandicap),
                    overUnder: convertHandicap(item.overUnder.initialHandicap),
                    handicapType: handleOddsType({
                        handicap: item.handicap.initialHandicap,
                        overUnder: item.overUnder.initialHandicap,
                        homeScore: mainScore,
                        awayScore: secondScore
                    }).handicapType,
                    overType: handleOddsType({
                        handicap: item.handicap.initialHandicap,
                        overUnder: item.overUnder.initialHandicap,
                        homeScore: mainScore,
                        awayScore: secondScore
                    }).overType
                },
                current: {
                    handicap: convertHandicap(item.handicap.currentHandicap),
                    overUnder: convertHandicap(item.overUnder.currentHandicap),
                    handicapType: handleOddsType({
                        handicap: item.handicap.currentHandicap,
                        overUnder: item.overUnder.currentHandicap,
                        homeScore: mainScore,
                        awayScore: secondScore
                    }).handicapType,
                    overType: handleOddsType({
                        handicap: item.handicap.currentHandicap,
                        overUnder: item.overUnder.currentHandicap,
                        homeScore: mainScore,
                        awayScore: secondScore
                    }).overType
                }
            };

            const half = {
                ...basicInfo,
                initial: {
                    handicap: convertHandicap(item.handicapHalf.initialHandicap),
                    overUnder: convertHandicap(item.overUnderHalf.initialHandicap),
                    handicapType: handleOddsType({
                        handicap: item.handicapHalf.initialHandicap,
                        overUnder: item.overUnderHalf.initialHandicap,
                        homeScore: matchData?.homeScore || 0,
                        awayScore: secondScore
                    }).handicapType,
                    overType: handleOddsType({
                        handicap: item.handicapHalf.initialHandicap,
                        overUnder: item.overUnderHalf.initialHandicap,
                        homeScore: matchData?.homeScore || 0,
                        awayScore: secondScore
                    }).overType
                },
                current: {
                    handicap: convertHandicap(item.handicapHalf.currentHandicap),
                    overUnder: convertHandicap(item.overUnderHalf.currentHandicap),
                    handicapType: handleOddsType({
                        handicap: item.handicapHalf.currentHandicap,
                        overUnder: item.overUnderHalf.currentHandicap,
                        homeScore: matchData?.homeScore || 0,
                        awayScore: secondScore
                    }).handicapType,
                    overType: handleOddsType({
                        handicap: item.handicapHalf.currentHandicap,
                        overUnder: item.overUnderHalf.currentHandicap,
                        homeScore: matchData?.homeScore || 0,
                        awayScore: secondScore
                    }).overType
                }
            };

            preItem.full.push(full);
            preItem.half.push(half);

            return preItem;
        },
        { full: [], half: [] }
    );

    const crownResponse = matchesOddsDetails.crownResponse.reduce<FullHalfOddsResponse>(
        (preItem, item) => {
            const matchData = matchesDataMap.get(item.match.matchId);
            let mainScore = 0;
            let secondScore = 0;
            const basicInfo = {
                matchId: item.match.matchId,
                leagueCup: matchData?.leagueCup || '0',
                matchTime: timestampToString(item.match.matchTime),
                winLose: matchData?.winLose || '0',
                isHome: homeId === item.match.homeId,
                homeTeamName: item.match.homeChs,
                awayTeamName: item.match.homeChs,
                homeScore: matchData?.homeScore || 0,
                awayScore: matchData?.awayScore || 0,
                homeHalfScore: matchData?.homeHalfScore || 0,
                awayHalfScore: matchData?.awayHalfScore || 0,
                leagueName: item.match.leagueChs
            };

            if (homeId === item.match.homeId) {
                mainScore = matchData?.homeScore || 0;
                secondScore = matchData?.awayScore || 0;
            } else {
                mainScore = matchData?.awayScore || 0;
                secondScore = matchData?.homeScore || 0;
            }

            const full: OddsDetail = {
                ...basicInfo,
                initial: {
                    handicap: convertHandicap(item.handicap.initialHandicap),
                    overUnder: convertHandicap(item.overUnder.initialHandicap),
                    handicapType: handleOddsType({
                        handicap: item.handicap.initialHandicap,
                        overUnder: item.overUnder.initialHandicap,
                        homeScore: mainScore,
                        awayScore: secondScore
                    }).handicapType,
                    overType: handleOddsType({
                        handicap: item.handicap.initialHandicap,
                        overUnder: item.overUnder.initialHandicap,
                        homeScore: mainScore,
                        awayScore: secondScore
                    }).overType
                },
                current: {
                    handicap: convertHandicap(item.handicap.currentHandicap),
                    overUnder: convertHandicap(item.overUnder.currentHandicap),
                    handicapType: handleOddsType({
                        handicap: item.handicap.currentHandicap,
                        overUnder: item.overUnder.currentHandicap,
                        homeScore: mainScore,
                        awayScore: secondScore
                    }).handicapType,
                    overType: handleOddsType({
                        handicap: item.handicap.currentHandicap,
                        overUnder: item.overUnder.currentHandicap,
                        homeScore: mainScore,
                        awayScore: secondScore
                    }).overType
                }
            };

            const half: OddsDetail = {
                ...basicInfo,
                initial: {
                    handicap: convertHandicap(item.handicapHalf.initialHandicap),
                    overUnder: convertHandicap(item.overUnderHalf.initialHandicap),
                    handicapType: handleOddsType({
                        handicap: item.handicapHalf.initialHandicap,
                        overUnder: item.overUnderHalf.initialHandicap,
                        homeScore: mainScore,
                        awayScore: secondScore
                    }).handicapType,
                    overType: handleOddsType({
                        handicap: item.handicapHalf.initialHandicap,
                        overUnder: item.overUnderHalf.initialHandicap,
                        homeScore: mainScore,
                        awayScore: secondScore
                    }).overType
                },
                current: {
                    handicap: convertHandicap(item.handicapHalf.currentHandicap),
                    overUnder: convertHandicap(item.overUnderHalf.currentHandicap),
                    handicapType: handleOddsType({
                        handicap: item.handicapHalf.currentHandicap,
                        overUnder: item.overUnderHalf.currentHandicap,
                        homeScore: mainScore,
                        awayScore: secondScore
                    }).handicapType,
                    overType: handleOddsType({
                        handicap: item.handicapHalf.currentHandicap,
                        overUnder: item.overUnderHalf.currentHandicap,
                        homeScore: mainScore,
                        awayScore: secondScore
                    }).overType
                }
            };

            preItem.full.push(full);
            preItem.half.push(half);

            return preItem;
        },
        { full: [], half: [] }
    );

    const halfHandicapData: FormatRecordDataResponse = {
        bet365: bet365Response,
        crown: crownResponse
    };

    return halfHandicapData;
};

/**
 * 取得賽前指數分析
 * - param (matchId: number, companyId: number)
 * - returns : {@link GetBeforeGameIndexResponse}
 * -  {@link GetBeforeGameIndex}
 */
export const getBeforeGameIndex = async (
    matchId: number,
    companyId: number
): Promise<ReturnData<GetBeforeGameIndexResponse>> => {
    try {
        const { data }: { data: GetBeforeGameIndexResult } = await fetcher(
            {
                data: {
                    query: GET_BEFORE_GAME_INDEX_ANALYZE_QUERY,
                    variables: {
                        input: {
                            matchId,
                            companyId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );
        GetBeforeGameIndexResultSchema.parse(data);
        const companyOdds = data.getCompanyOddsDetail.companyOdds;
        const rows: GetBeforeGameIndexResponse = [
            {
                label: '欧',
                init: truncateFloatingPoint(companyOdds.fullWinDrawLose[0]?.initialDrawOdds, 2),
                initHome: truncateFloatingPoint(companyOdds.fullWinDrawLose[0]?.initialHomeOdds, 2),
                initAway: truncateFloatingPoint(companyOdds.fullWinDrawLose[0]?.initialAwayOdds, 2),
                current: truncateFloatingPoint(companyOdds.fullWinDrawLose[0]?.currentDrawOdds, 2),
                currentHome: truncateFloatingPoint(
                    companyOdds.fullWinDrawLose[0]?.currentHomeOdds,
                    2
                ),
                currentAway: truncateFloatingPoint(
                    companyOdds.fullWinDrawLose[0]?.currentAwayOdds,
                    2
                )
            },
            {
                label: '亞',
                init: truncateFloatingPoint(companyOdds.fullHandicap[0]?.initialHandicap, 2),
                initHome: truncateFloatingPoint(companyOdds.fullHandicap[0]?.homeInitialOdds, 2),
                initAway: truncateFloatingPoint(companyOdds.fullHandicap[0]?.awayInitialOdds, 2),
                current: truncateFloatingPoint(companyOdds.fullHandicap[0]?.awayCurrentOdds, 2),
                currentHome: truncateFloatingPoint(companyOdds.fullHandicap[0]?.homeCurrentOdds, 2),
                currentAway: truncateFloatingPoint(companyOdds.fullHandicap[0]?.awayCurrentOdds, 2)
            },
            {
                label: '大',
                init: truncateFloatingPoint(companyOdds.fullTotalGoal[0]?.initialTotalGoals, 2),
                initHome: truncateFloatingPoint(companyOdds.fullTotalGoal[0]?.overInitialOdds, 2),
                initAway: truncateFloatingPoint(companyOdds.fullTotalGoal[0]?.underInitialOdds, 2),
                current: truncateFloatingPoint(companyOdds.fullTotalGoal[0]?.currentTotalGoals, 2),
                currentHome: truncateFloatingPoint(
                    companyOdds.fullTotalGoal[0]?.overCurrentOdds,
                    2
                ),
                currentAway: truncateFloatingPoint(
                    companyOdds.fullTotalGoal[0]?.underCurrentOdds,
                    2
                )
            }
        ];

        return {
            success: true,
            data: rows
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得聯賽積分排名
 * - TODO: 排名API
 * - param (matchId: number)
 * - returns : {@link GetLeaguePointsRankResponse}
 * -  {@link GetBeforeGameIndex} {@link SingleMatchTeamName}
 */
export const getLeaguePointsRank = async (
    matchId: number
): Promise<ReturnData<GetLeaguePointsRankResponse>> => {
    try {
        const { data }: { data: GetLeaguePointsRankResult } = await fetcher(
            {
                data: {
                    query: GET_LEAGUE_STANDINGS_QUERY,
                    variables: {
                        input: {
                            matchId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetLeaguePointsRankSchema.parse(data);

        const { homeTeamStandings, awayTeamStandings } = data.getLeagueStandings;

        if (!homeTeamStandings || !awayTeamStandings) {
            return {
                success: true,
                data: {
                    homeTeam: {} as Record<string, never>,
                    awayTeam: {} as Record<string, never>
                }
            };
        }

        const homeTeam = {
            total: {
                totalCount: homeTeamStandings.totalCount,
                winCount: homeTeamStandings.winCount,
                drawCount: homeTeamStandings.drawCount,
                loseCount: homeTeamStandings.loseCount,
                getScore: homeTeamStandings.getScore,
                loseScore: homeTeamStandings.loseScore,
                goalDifference: homeTeamStandings.goalDifference,
                integral: homeTeamStandings.integral,
                rank: homeTeamStandings.rank,
                winRate: truncateFloatingPoint(homeTeamStandings.winRate, 1)
            },
            home: {
                totalCount: homeTeamStandings.homeTotalCount,
                winCount: homeTeamStandings.homeWinCount,
                drawCount: homeTeamStandings.homeDrawCount,
                loseCount: homeTeamStandings.homeLoseCount,
                getScore: homeTeamStandings.homeGetScore,
                loseScore: homeTeamStandings.homeLoseScore,
                goalDifference: homeTeamStandings.homeGoalDifference,
                integral: homeTeamStandings.homeIntegral,
                rank: homeTeamStandings.homeRank,
                winRate: truncateFloatingPoint(homeTeamStandings.homeWinRate, 1)
            },
            away: {
                totalCount: homeTeamStandings.awayTotalCount,
                winCount: homeTeamStandings.awayWinCount,
                drawCount: homeTeamStandings.awayDrawCount,
                loseCount: homeTeamStandings.awayLoseCount,
                getScore: homeTeamStandings.awayGetScore,
                loseScore: homeTeamStandings.awayLoseScore,
                goalDifference: homeTeamStandings.awayGoalDifference,
                integral: homeTeamStandings.awayIntegral,
                rank: homeTeamStandings.awayRank,
                winRate: truncateFloatingPoint(homeTeamStandings.awayWinRate, 1)
            },
            recent: {
                totalCount: homeTeamStandings.recentTotalCount,
                winCount: homeTeamStandings.recentWinCount,
                drawCount: homeTeamStandings.recentDrawCount,
                loseCount: homeTeamStandings.recentLoseCount,
                getScore: homeTeamStandings.recentGetScore,
                loseScore: homeTeamStandings.recentLoseScore,
                goalDifference: homeTeamStandings.recentGoalDifference,
                integral: homeTeamStandings.recentIntegral,
                rank: '-',
                winRate: truncateFloatingPoint(homeTeamStandings.recentWinRate, 1)
            }
        };

        const awayTeam = {
            total: {
                totalCount: awayTeamStandings.totalCount,
                winCount: awayTeamStandings.winCount,
                drawCount: awayTeamStandings.drawCount,
                loseCount: awayTeamStandings.loseCount,
                getScore: awayTeamStandings.getScore,
                loseScore: awayTeamStandings.loseScore,
                goalDifference: awayTeamStandings.goalDifference,
                integral: awayTeamStandings.integral,
                rank: awayTeamStandings.rank,
                winRate: truncateFloatingPoint(awayTeamStandings.winRate, 1)
            },
            home: {
                totalCount: awayTeamStandings.homeTotalCount,
                winCount: awayTeamStandings.homeWinCount,
                drawCount: awayTeamStandings.homeDrawCount,
                loseCount: awayTeamStandings.homeLoseCount,
                getScore: awayTeamStandings.homeGetScore,
                loseScore: awayTeamStandings.homeLoseScore,
                goalDifference: awayTeamStandings.homeGoalDifference,
                integral: awayTeamStandings.homeIntegral,
                rank: awayTeamStandings.homeRank,
                winRate: truncateFloatingPoint(awayTeamStandings.homeWinRate, 1)
            },
            away: {
                totalCount: awayTeamStandings.awayTotalCount,
                winCount: awayTeamStandings.awayWinCount,
                drawCount: awayTeamStandings.awayDrawCount,
                loseCount: awayTeamStandings.awayLoseCount,
                getScore: awayTeamStandings.awayGetScore,
                loseScore: awayTeamStandings.awayLoseScore,
                goalDifference: awayTeamStandings.awayGoalDifference,
                integral: awayTeamStandings.awayIntegral,
                rank: awayTeamStandings.awayRank,
                winRate: truncateFloatingPoint(awayTeamStandings.awayWinRate, 1)
            },
            recent: {
                totalCount: awayTeamStandings.recentTotalCount,
                winCount: awayTeamStandings.recentWinCount,
                drawCount: awayTeamStandings.recentDrawCount,
                loseCount: awayTeamStandings.recentLoseCount,
                getScore: awayTeamStandings.recentGetScore,
                loseScore: awayTeamStandings.recentLoseScore,
                goalDifference: awayTeamStandings.recentGoalDifference,
                integral: awayTeamStandings.recentIntegral,
                rank: '-',
                winRate: truncateFloatingPoint(awayTeamStandings.recentWinRate, 1)
            }
        };

        return {
            success: true,
            data: { homeTeam, awayTeam }
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得聯賽走勢、對賽往績、近期戰績、半场/全场胜负统计(进两赛季)
 * - param (matchId: number)
 * - returns {@link GetAnalysisOthersResponse}
 */
export const getAnalysisOthers = async (
    matchId: number
): Promise<ReturnData<GetAnalysisOthersResponse>> => {
    try {
        const { data: analysis }: { data: GetAnalyzeResult } = await fetcher(
            {
                data: {
                    query: GET_ANALYSIS_QUERY,
                    variables: {
                        singleMatchInput: {
                            matchId
                        },
                        analysisInput: {
                            matchId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetAnalyzeSchema.parse(analysis);

        const { homeOdds, awayOdds, headToHead, homeHT, awayHT, homeLastMatches, awayLastMatches } =
            analysis.getAnalysis.statistics;

        const headToHeadMatchesId = headToHead.map(item => item.matchId);
        const homeLastMatchesId = homeLastMatches.map(item => item.matchId);
        const awayLastMatchesId = awayLastMatches.map(item => item.matchId);

        /* 取得全部不同三方的對戰紀錄 */
        const { data: matchesOddsDetails }: { data: GetMatchesOddsDetailsResult } = await fetcher(
            {
                data: {
                    query: GET_MATCHES_ODDS_DETAIL_QUERY,
                    variables: {
                        input1: {
                            matchIds: headToHeadMatchesId,
                            companyId: 3
                        },
                        input2: {
                            matchIds: headToHeadMatchesId,
                            companyId: 8
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        /* 取得主場隊伍不同三方的對戰紀錄 */
        const { data: homeMatchesOddsDetails }: { data: GetMatchesOddsDetailsResult } =
            await fetcher(
                {
                    data: {
                        query: GET_MATCHES_ODDS_DETAIL_QUERY,
                        variables: {
                            input1: {
                                matchIds: homeLastMatchesId,
                                companyId: 3
                            },
                            input2: {
                                matchIds: homeLastMatchesId,
                                companyId: 8
                            }
                        }
                    }
                },
                { cache: 'no-store' }
            );

        /* 取得客場隊伍不同三方的對戰紀錄 */
        const { data: awayMatchesOddsDetails }: { data: GetMatchesOddsDetailsResult } =
            await fetcher(
                {
                    data: {
                        query: GET_MATCHES_ODDS_DETAIL_QUERY,
                        variables: {
                            input1: {
                                matchIds: awayLastMatchesId,
                                companyId: 3
                            },
                            input2: {
                                matchIds: awayLastMatchesId,
                                companyId: 8
                            }
                        }
                    }
                },
                { cache: 'no-store' }
            );

        MatchesOddsDetailsSchema.parse(matchesOddsDetails);
        MatchesOddsDetailsSchema.parse(homeMatchesOddsDetails);
        MatchesOddsDetailsSchema.parse(awayMatchesOddsDetails);

        const teamInfo = analysis.getSingleMatch;

        const leagueTrendData = formatLeagueTrendData(homeOdds, awayOdds);
        const winLoseCountData = formatWinLoseCountData(homeHT, awayHT);
        const battleRecordData = formatRecordData({
            matchesList: headToHead,
            matchesOddsDetails,
            homeId: teamInfo.homeId
        });
        const homeMatches = formatRecordData({
            matchesList: homeLastMatches,
            matchesOddsDetails: homeMatchesOddsDetails,
            homeId: teamInfo.homeId
        });
        const awayMatches = formatRecordData({
            matchesList: awayLastMatches,
            matchesOddsDetails: awayMatchesOddsDetails,
            homeId: teamInfo.awayId
        });

        const res: GetAnalysisOthersResponse = {
            teamInfo,
            leagueTrendData,
            battleRecordData,
            LastMatches: {
                home: homeMatches,
                away: awayMatches
            },
            winLoseCountData
        };
        return {
            success: true,
            data: res
        };
    } catch (error) {
        return handleApiError(error);
    }
};
