import { z } from 'zod';
import { fetcher } from 'lib';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import {
    GET_ODDS_HINT_LIST_QUERY,
    GET_FOOTBALL_STATS_RECORD_QUERY,
    GET_FOOTBALL_STATS_QUERY,
    GET_FOOTBALL_STATS_MATCHES_QUERY,
    GET_FOOTBALL_LEAGUE_QUERY,
    CHECK_MATCHES_COUNT_QUERY
} from './graphqlQueries';

export interface CheckMatchesCountRequest {
    mission: string;
    leagues: number[];
    handicapSide: string;
    handicapValues: string;
    overUnderValues: string;
    startTime: number;
    endTime: number;
}

const CheckMatchesCountSchema = z.object({
    leagueId: z.number(),
    count: z.number()
});

const CheckMatchesCountResultSchema = z.object({
    checkMatchesCount: z.object({
        list: z.array(CheckMatchesCountSchema)
    })
});

type CheckMatchesCountResult = z.infer<typeof CheckMatchesCountResultSchema>;

export type CheckMatchesCount = z.infer<typeof CheckMatchesCountSchema>;
export type CheckMatchesCountResponse = CheckMatchesCount[];

export type FootballLeagueType = 'areaId' | 'contryId' | 'leagueId' | 'cupType' | 'rating' | 'all';
export interface GetFootballLeagueRequest {
    filter: FootballLeagueType;
    value?: string;
}

const GetFootballLeagueSchema = z.object({
    leagueId: z.number(),
    color: z.string(),
    nameEn: z.string(),
    nameEnShort: z.string(),
    nameChs: z.string(),
    leagueChsShort: z.string(),
    nameCht: z.string(),
    nameChtShort: z.string(),
    type: z.number(),
    subSclassEn: z.string(),
    subSclassCn: z.string(),
    sumRound: z.number(),
    currRound: z.number(),
    currSeason: z.string(),
    countryId: z.number(),
    countryEn: z.string(),
    countryCn: z.string(),
    leagueLogo: z.string(),
    countryLogo: z.string(),
    areaId: z.number(),
    rating: z.number()
});

const GetFootballLeagueResultSchema = z.object({
    getLeague: z.object({
        list: z.array(GetFootballLeagueSchema)
    })
});

type GetFootballLeagueResult = z.infer<typeof GetFootballLeagueResultSchema>;

export type GetFootballLeague = z.infer<typeof GetFootballLeagueSchema>;
export type GetFootballLeagueResponse = GetFootballLeague[];

export interface GetFootballStatsRecordRequest {
    memberId: number;
}

const GetFootballStatsRecordSchema = z.object({
    memberId: z.number(),
    ticketId: z.string(),
    handicapSide: z.string(),
    handicapValues: z.string(),
    overUnderValues: z.string(),
    startTime: z.number(),
    endTime: z.number(),
    analyTime: z.number(),
    isCompleted: z.boolean()
});

const GetFootballStatsRecordResultSchema = z.object({
    getFootballStatsRecord: z.array(GetFootballStatsRecordSchema)
});

type GetFootballStatsRecordResult = z.infer<typeof GetFootballStatsRecordResultSchema>;

export type GetFootballStatsRecord = z.infer<typeof GetFootballStatsRecordSchema>;
export type GetFootballStatsRecordResponse = GetFootballStatsRecord[];

const OddsHintSchema = z.object({
    startTime: z.number(),
    matchId: z.number(),
    countryCn: z.string(),
    leagueId: z.number(),
    leagueChsShort: z.string(),
    homeId: z.number(),
    homeChs: z.string(),
    homeLogo: z.string(),
    awayId: z.number(),
    awayChs: z.string(),
    awayLogo: z.string(),
    longOddsTeamId: z.number(),
    longOddsType: z.string(),
    longOddsTimes: z.number(),
    leagueLevel: z.number()
});

export type OddsHintsType = 'WIN' | 'LOSE' | 'OVER' | 'UNDER';
export interface OddsHintRequest {
    continuity: OddsHintsType;
}
export type BigDataHint = z.infer<typeof OddsHintSchema>;

const BigDataHintListResultSchema = z.object({
    getBigdataHint: z.object({
        list: z.array(OddsHintSchema)
    })
});
export type BigDataHintListResult = z.infer<typeof BigDataHintListResultSchema>;
export type BigDataHintListResponse = BigDataHint[];

const DailyMatchSchema = z.object({
    date: z.string(),
    matchIds: z.array(z.number())
});

export type DailyMatch = z.infer<typeof DailyMatchSchema>;
export type DailyMatchType = DailyMatch;

const CorrectScoreSchema = z.object({
    score: z.string(),
    matches: z.array(z.number())
});

const GoalsIn15MinsSchema = z.object({
    goalsOver: z.array(z.number()),
    goalsUnder: z.array(z.number())
});

export type MatchDateMatchListType = z.infer<typeof DailyMatchSchema>;
export type GoalsIn15Mins = z.infer<typeof GoalsIn15MinsSchema>;
export type GoalsIn15MinsType = GoalsIn15Mins;

const GetFootballStatsSchema = z.object({
    memberId: z.number(),
    ticketId: z.string(),
    handicapSide: z.string().nullable(),
    handicapValues: z.string().nullable(),
    overUnderValues: z.string().nullable(),
    startTime: z.number(),
    endTime: z.number(),
    // 全場讓球
    fullHandicapUpperDaily: z.array(DailyMatchSchema).nullable(),
    fullHandicapLowerDaily: z.array(DailyMatchSchema).nullable(),
    fullHandicapDrawDaily: z.array(DailyMatchSchema).nullable(),

    // 全場大小
    fullOverUnderOverDaily: z.array(DailyMatchSchema).nullable(),
    fullOverUnderUnderDaily: z.array(DailyMatchSchema).nullable(),
    fullOverUnderDrawDaily: z.array(DailyMatchSchema).nullable(),

    // 全場獨贏
    fullTimeHomeWinDaily: z.array(DailyMatchSchema).nullable(),
    fullTimeDrawDaily: z.array(DailyMatchSchema).nullable(),
    fullTimeAwayWinDaily: z.array(DailyMatchSchema).nullable(),

    goalsIn15Mins: z.array(GoalsIn15MinsSchema).nullable(),
    correctScores: z.array(CorrectScoreSchema).nullable(),
    goalsInterval0To1: z.array(z.number()).nullable(),
    goalsInterval2To3: z.array(z.number()).nullable(),
    goalsInterval4To6: z.array(z.number()).nullable(),
    goalsInterval7Plus: z.array(z.number()).nullable(),
    analyTime: z.number(),
    errorStatus: z.union([
        z.literal('0'),
        z.literal('1'),
        z.literal('2'),
        z.literal('3'),
        z.literal('')
    ])
});

const GetFootballStatsResultSchema = z.object({
    getFootballStats: GetFootballStatsSchema
});

type GetFootballStatsResult = z.infer<typeof GetFootballStatsResultSchema>;
export type GetFootballStatsResponse = z.infer<typeof GetFootballStatsSchema>;

export interface GetFootballStatsRequest {
    mission: string;
    leagues: number[];
    handicapSide?: string;
    handicapValues?: string;
    overUnderValues?: string;
    startTime: number;
    endTime: number;
}

const GetFootballStatsMatchSchema = z.object({
    kind: z.number(),
    leagueId: z.number(),
    leagueEn: z.string(),
    leagueEnShort: z.string(),
    leagueChtShort: z.string(),
    subLeagueId: z.string(),
    subLeagueEn: z.string(),
    subLeagueChs: z.string(),
    subLeagueCht: z.string(),
    homeEn: z.string(),
    homeCht: z.string(),
    awayEn: z.string(),
    awayCht: z.string(),
    homeId: z.number(),
    awayId: z.number(),
    homeRankEn: z.string(),
    homeRankCn: z.string(),
    awayRankEn: z.string(),
    awayRankCn: z.string(),
    isNeutral: z.boolean(),
    season: z.string(),
    groupId: z.number(),
    roundEn: z.string(),
    roundCn: z.string(),
    grouping: z.string(),
    locationEn: z.string(),
    locationCn: z.string(),
    weatherEn: z.string(),
    weatherCn: z.string(),
    temp: z.string(),
    isHidden: z.boolean(),
    updateTime: z.string(),
    status: z.number(),
    leagueLevel: z.number(),
    leagueChsShort: z.string(),
    awayChs: z.string(),
    awayCorner: z.number(),
    awayHalfScore: z.number(),
    awayRed: z.number(),
    awayScore: z.number(),
    awayYellow: z.number(),
    homeChs: z.string(),
    homeCorner: z.number(),
    homeHalfScore: z.number(),
    homeRed: z.number(),
    homeScore: z.number(),
    homeYellow: z.number(),
    hasAnimation: z.boolean(),
    explainEn: z.string(),
    explainCn: z.string(),
    extraExplain: z.string(),
    hasLineup: z.string(),
    injuryTime: z.string(),
    matchId: z.number(),
    matchTime: z.number(),
    startTime: z.number(),
    state: z.number(),
    color: z.string(),
    countryCn: z.string(),
    handicapCurrent: z.number(),
    handicapHomeCurrentOdds: z.number(),
    handicapAwayCurrentOdds: z.number(),
    overUnderCurrent: z.number(),
    overUnderOverCurrentOdds: z.number(),
    overUnderUnderCurrentOdds: z.number(),
    homeLogo: z.string(),
    awayLogo: z.string()
});

export type GetFootballStatsMatch = z.infer<typeof GetFootballStatsMatchSchema>;
export type GetFootballStatsMatchesResponse = GetFootballStatsMatch[];
const GetFootballStatsMatchesResultSchema = z.object({
    getMatchList: z.object({
        matches: z.array(GetFootballStatsMatchSchema)
    })
});

type GetFootballStatsMatchesResult = z.infer<typeof GetFootballStatsMatchesResultSchema>;

export interface GetFootballStatsMatchesRequest {
    matchIds: number[];
}

const GetAiAnalyzeMatch = z.object({
    matchId: z.number(),
    matchTime: z.number(),
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
    predict: z.string(),
    summery: z.string(),
    homeStrategicAnalysis: z.string(),
    awayStrategicAnalysis: z.string(),
    homeTacticalPerspective: z.string(),
    awayTacticalPerspective: z.string(),
    updatedAt: z.number()
});

export type GetAiAnalyzeMatchResponse = z.infer<typeof GetAiAnalyzeMatch>;

/**
 * 分析紀錄列表API
 * - params : {@link GetFootballStatsRecordRequest}
 * - returns : {@link GetFootballStatsRecordResponse}
 * - {@link GetFootballStatsRecord}
 */
export const getFootballStatsRecord = async ({
    memberId
}: GetFootballStatsRecordRequest): Promise<ReturnData<GetFootballStatsRecordResponse>> => {
    try {
        const { data, errors } = await fetcher<
            FetchResultData<GetFootballStatsRecordResult>,
            unknown
        >(
            {
                data: {
                    query: GET_FOOTBALL_STATS_RECORD_QUERY,
                    variables: {
                        input: {
                            memberId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetFootballStatsRecordResultSchema.parse(data);

        return {
            success: true,
            data: data.getFootballStatsRecord
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 盤路提示列表
 * - params : {@link OddsHintRequest}
 * - returns : {@link BigDataHintListResponse}
 * - {@link BigDataHint}
 */
export const getBigdataHint = async ({
    continuity
}: OddsHintRequest): Promise<ReturnData<BigDataHintListResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<BigDataHintListResult>, unknown>(
            {
                data: {
                    query: GET_ODDS_HINT_LIST_QUERY,
                    variables: {
                        input: {
                            continuity
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        BigDataHintListResultSchema.parse(data);

        return {
            success: true,
            data: data.getBigdataHint.list
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得分析結果
 * - params : {@link GetFootballStatsRequest}
 * - returns : {@link GetFootballStatsResponse}
 */
export const getFootballStats = async (
    input: GetFootballStatsRequest
): Promise<ReturnData<GetFootballStatsResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetFootballStatsResult>, unknown>(
            {
                data: {
                    query: GET_FOOTBALL_STATS_QUERY,
                    variables: {
                        input
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        const formattedData = {
            getFootballStats: {
                ...data.getFootballStats,
                fullHandicapUpperDaily: data.getFootballStats.fullHandicapUpperDaily || [],
                fullHandicapLowerDaily: data.getFootballStats.fullHandicapLowerDaily || [],
                fullHandicapDrawDaily: data.getFootballStats.fullHandicapDrawDaily || [],
                // 全場大小
                fullOverUnderOverDaily: data.getFootballStats.fullOverUnderOverDaily || [],
                fullOverUnderUnderDaily: data.getFootballStats.fullOverUnderUnderDaily || [],
                fullOverUnderDrawDaily: data.getFootballStats.fullOverUnderDrawDaily || [],
                // 全場獨贏
                fullTimeHomeWinDaily: data.getFootballStats.fullTimeHomeWinDaily || [],
                fullTimeDrawDaily: data.getFootballStats.fullTimeDrawDaily || [],
                fullTimeAwayWinDaily: data.getFootballStats.fullTimeAwayWinDaily || [],

                goalsIn15Mins: data.getFootballStats.goalsIn15Mins || [],
                correctScores: data.getFootballStats.correctScores || [],
                goalsInterval0To1: data.getFootballStats.goalsInterval0To1 || [],
                goalsInterval2To3: data.getFootballStats.goalsInterval2To3 || [],
                goalsInterval4To6: data.getFootballStats.goalsInterval4To6 || [],
                goalsInterval7Plus: data.getFootballStats.goalsInterval7Plus || []
            }
        };
        GetFootballStatsResultSchema.parse(formattedData);

        return {
            success: true,
            data: data.getFootballStats
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得分析賽事列表
 * - params : {@link GetFootballStatsMatchesRequest}
 * - returns : {@link GetFootballStatsMatchesResponse}
 * - {@link GetFootballStatsMatch}
 */
export const getFootballStatsMatches = async (
    input: GetFootballStatsMatchesRequest
): Promise<ReturnData<GetFootballStatsMatchesResponse>> => {
    try {
        const { data, errors } = await fetcher<
            FetchResultData<GetFootballStatsMatchesResult>,
            unknown
        >(
            {
                data: {
                    query: GET_FOOTBALL_STATS_MATCHES_QUERY,
                    variables: {
                        input
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetFootballStatsMatchesResultSchema.parse(data);

        return {
            success: true,
            data: data.getMatchList.matches
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得联赛列表
 * - params : {@link GetFootballLeagueRequest}
 * - returns : {@link GetFootballLeagueResponse}
 * - {@link GetFootballLeague}
 */
export const getFootballLeague = async (
    input: GetFootballLeagueRequest
): Promise<ReturnData<GetFootballLeagueResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetFootballLeagueResult>, unknown>(
            {
                data: {
                    query: GET_FOOTBALL_LEAGUE_QUERY,
                    variables: {
                        input
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetFootballLeagueResultSchema.parse(data);

        return {
            success: true,
            data: data.getLeague.list
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 检查联赛是否有赛事
 * - params : {@link CheckMatchesCountRequest}
 * - returns : {@link CheckMatchesCountResponse}
 * - {@link CheckMatchesCount}
 */
export const checkMatchesCount = async (
    input: CheckMatchesCountRequest
): Promise<ReturnData<CheckMatchesCountResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<CheckMatchesCountResult>, unknown>(
            {
                data: {
                    query: CHECK_MATCHES_COUNT_QUERY,
                    variables: {
                        input
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        CheckMatchesCountResultSchema.parse(data);

        return {
            success: true,
            data: data.checkMatchesCount.list
        };
    } catch (error) {
        return handleApiError(error);
    }
};
