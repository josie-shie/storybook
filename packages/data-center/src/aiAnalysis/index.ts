import { z } from 'zod';
import { fetcher } from 'lib';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import {
    GET_ODDS_HINT_LIST_QUERY,
    GET_FOOTBALL_STATS_RECORD_QUERY,
    GET_FOOTBALL_STATS_QUERY,
    GET_FOOTBALL_STATS_MATCHES_QUERY
} from './graphqlQueries';

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
    isFamous: z.boolean(),
    leagueLevel: z.number()
});

export type OddsHintsType = 'WIN' | 'LOSE' | 'OVER' | 'UNDER';
export type OddsHintsProgress = 'FULL' | 'HALF';
export interface OddsHintRequest {
    continuity: OddsHintsType;
    progress: OddsHintsProgress;
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
    matches: z.number()
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

export type GoalsIn15Mins = z.infer<typeof GoalsIn15MinsSchema>;
export type GoalsIn15MinsType = GoalsIn15Mins;

const GetFootballStatsSchema = z.object({
    memberId: z.number(),
    ticketId: z.string(),
    handicapSide: z.string(),
    handicapValues: z.string(),
    overUnderValues: z.string(),
    startTime: z.number(),
    endTime: z.number(),
    // 全場讓球
    fullHandicapUpper: z.array(z.number()).nullable(),
    fullHandicapLower: z.array(z.number()).nullable(),
    fullHandicapDraw: z.array(z.number()).nullable(),
    fullHandicapUpperDaily: z.array(DailyMatchSchema).nullable(),
    fullHandicapLowerDaily: z.array(DailyMatchSchema).nullable(),
    fullHandicapDrawDaily: z.array(DailyMatchSchema).nullable(),
    // 半場讓球
    halfHandicapUpper: z.array(z.number()).nullable(),
    halfHandicapLower: z.array(z.number()).nullable(),
    halfHandicapDraw: z.array(z.number()).nullable(),
    halfHandicapUpperDaily: z.array(DailyMatchSchema).nullable(),
    halfHandicapLowerDaily: z.array(DailyMatchSchema).nullable(),
    halfHandicapDrawDaily: z.array(DailyMatchSchema).nullable(),
    // 全場大小
    fullOverUnderOver: z.array(z.number()).nullable(),
    fullOverUnderUnder: z.array(z.number()).nullable(),
    fullOverUnderDraw: z.array(z.number()).nullable(),
    fullOverUnderOverDaily: z.array(DailyMatchSchema).nullable(),
    fullOverUnderUnderDaily: z.array(DailyMatchSchema).nullable(),
    fullOverUnderDrawDaily: z.array(DailyMatchSchema).nullable(),
    // 半場大小
    halfOverUnderOver: z.array(z.number()).nullable(),
    halfOverUnderUnder: z.array(z.number()).nullable(),
    halfOverUnderDraw: z.array(z.number()).nullable(),
    halfOverUnderOverDaily: z.array(DailyMatchSchema).nullable(),
    halfOverUnderUnderDaily: z.array(DailyMatchSchema).nullable(),
    halfOverUnderDrawDaily: z.array(DailyMatchSchema).nullable(),
    // 全場獨贏
    fullTimeHomeWin: z.array(z.number()).nullable(),
    fullTimeDraw: z.array(z.number()).nullable(),
    fullTimeAwayWin: z.array(z.number()).nullable(),
    fullTimeHomeWinDaily: z.array(DailyMatchSchema).nullable(),
    fullTimeDrawDaily: z.array(DailyMatchSchema).nullable(),
    fullTimeAwayWinDaily: z.array(DailyMatchSchema).nullable(),
    // 半場獨贏
    halfTimeHomeWin: z.array(z.number()).nullable(),
    halfTimeDraw: z.array(z.number()).nullable(),
    halfTimeAwayWin: z.array(z.number()).nullable(),
    halfTimeHomeWinDaily: z.array(DailyMatchSchema).nullable(),
    halfTimeDrawDaily: z.array(DailyMatchSchema).nullable(),
    halfTimeAwayWinDaily: z.array(DailyMatchSchema).nullable(),

    goalsIn15Mins: z.array(GoalsIn15MinsSchema).nullable(),
    correctScores: z.array(CorrectScoreSchema).nullable(),
    goalsInterval0To1: z.array(z.number()).nullable(),
    goalsInterval2To3: z.array(z.number()).nullable(),
    goalsInterval4To6: z.array(z.number()).nullable(),
    goalsInterval7Plus: z.array(z.number()).nullable(),
    analyTime: z.number(),
    errorStatus: z.union([z.literal('0'), z.literal('1'), z.literal('2'), z.literal('3')])
});

const GetFootballStatsResultSchema = z.object({
    getFootballStats: GetFootballStatsSchema
});

type GetFootballStatsResult = z.infer<typeof GetFootballStatsResultSchema>;
export type GetFootballStatsResponse = z.infer<typeof GetFootballStatsSchema>;

export interface GetFootballStatsRequest {
    mission: string;
    memberId: number;
    handicapSide?: string;
    handicapValues?: string;
    overUnderValues?: string;
    startTime?: number;
    endTime?: number;
}

const GetFootballStatsMatchSchema = z.object({
    startTime: z.number(),
    matchId: z.number(),
    countryCn: z.string(),
    leagueId: z.number(),
    leagueChsShort: z.string(),
    homeChs: z.string(),
    awayChs: z.string(),
    homeScore: z.number(),
    awayScore: z.number(),
    homeHalfScore: z.number(),
    awayHalfScore: z.number(),
    isFamous: z.boolean(),
    leagueLevel: z.number()
});

export type GetFootballStatsMatch = z.infer<typeof GetFootballStatsMatchSchema>;
export type GetFootballStatsMatchesResponse = GetFootballStatsMatch[];
const GetFootballStatsMatchesResultSchema = z.object({
    getFootballStatsMatches: z.object({
        matches: z.array(GetFootballStatsMatchSchema)
    })
});

type GetFootballStatsMatchesResult = z.infer<typeof GetFootballStatsMatchesResultSchema>;

export interface GetFootballStatsMatchesRequest {
    matchIds: number[];
}

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
    continuity,
    progress
}: OddsHintRequest): Promise<ReturnData<BigDataHintListResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<BigDataHintListResult>, unknown>(
            {
                data: {
                    query: GET_ODDS_HINT_LIST_QUERY,
                    variables: {
                        input: {
                            continuity,
                            progress
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
                fullHandicapUpper: data.getFootballStats.fullHandicapUpper || [],
                fullHandicapLower: data.getFootballStats.fullHandicapLower || [],
                fullHandicapDraw: data.getFootballStats.fullHandicapDraw || [],
                fullHandicapUpperDaily: data.getFootballStats.fullHandicapUpperDaily || [],
                fullHandicapLowerDaily: data.getFootballStats.fullHandicapLowerDaily || [],
                fullHandicapDrawDaily: data.getFootballStats.fullHandicapDrawDaily || [],
                // 半場讓球
                halfHandicapUpper: data.getFootballStats.halfHandicapUpper || [],
                halfHandicapLower: data.getFootballStats.halfHandicapLower || [],
                halfHandicapDraw: data.getFootballStats.halfHandicapDraw || [],
                halfHandicapUpperDaily: data.getFootballStats.halfHandicapUpperDaily || [],
                halfHandicapLowerDaily: data.getFootballStats.halfHandicapLowerDaily || [],
                halfHandicapDrawDaily: data.getFootballStats.halfHandicapDrawDaily || [],
                // 全場大小
                fullOverUnderOver: data.getFootballStats.fullOverUnderOver || [],
                fullOverUnderUnder: data.getFootballStats.fullOverUnderUnder || [],
                fullOverUnderDraw: data.getFootballStats.fullOverUnderDraw || [],
                fullOverUnderOverDaily: data.getFootballStats.fullOverUnderOverDaily || [],
                fullOverUnderUnderDaily: data.getFootballStats.fullOverUnderUnderDaily || [],
                fullOverUnderDrawDaily: data.getFootballStats.fullOverUnderDrawDaily || [],
                // 半場大小
                halfOverUnderOver: data.getFootballStats.halfOverUnderOver || [],
                halfOverUnderUnder: data.getFootballStats.halfOverUnderUnder || [],
                halfOverUnderDraw: data.getFootballStats.halfOverUnderDraw || [],
                halfOverUnderOverDaily: data.getFootballStats.halfOverUnderOverDaily || [],
                halfOverUnderUnderDaily: data.getFootballStats.halfOverUnderUnderDaily || [],
                halfOverUnderDrawDaily: data.getFootballStats.halfOverUnderDrawDaily || [],
                // 全場獨贏
                fullTimeHomeWin: data.getFootballStats.fullTimeHomeWin || [],
                fullTimeDraw: data.getFootballStats.fullTimeDraw || [],
                fullTimeAwayWin: data.getFootballStats.fullTimeAwayWin || [],
                fullTimeHomeWinDaily: data.getFootballStats.fullTimeHomeWinDaily || [],
                fullTimeDrawDaily: data.getFootballStats.fullTimeDrawDaily || [],
                fullTimeAwayWinDaily: data.getFootballStats.fullTimeAwayWinDaily || [],
                // 半場獨贏
                halfTimeHomeWin: data.getFootballStats.halfTimeHomeWin || [],
                halfTimeDraw: data.getFootballStats.halfTimeDraw || [],
                halfTimeAwayWin: data.getFootballStats.halfTimeAwayWin || [],
                halfTimeHomeWinDaily: data.getFootballStats.halfTimeHomeWinDaily || [],
                halfTimeDrawDaily: data.getFootballStats.halfTimeDrawDaily || [],
                halfTimeAwayWinDaily: data.getFootballStats.halfTimeAwayWinDaily || [],

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
            data: data.getFootballStatsMatches.matches
        };
    } catch (error) {
        return handleApiError(error);
    }
};
