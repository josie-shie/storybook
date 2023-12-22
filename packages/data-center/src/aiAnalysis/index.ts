import { z } from 'zod';
import { fetcher } from 'lib';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import {
    GET_ODDS_HINT_LIST_QUERY,
    GET_FOOTBALL_STATS_RECORD_QUERY,
    GET_FOOTBALL_STATS_RESULT_QUERY,
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

const GetFootballStatsReportSchema = z.object({
    memberId: z.number(),
    ticketId: z.string(),
    handicapSide: z.string(),
    handicapValues: z.string(),
    overUnderValues: z.string(),
    startTime: z.number(),
    endTime: z.number(),
    // 全場讓球
    fullHandicapUpper: z.array(z.number()),
    fullHandicapLower: z.array(z.number()),
    fullHandicapDraw: z.array(z.number()),
    fullHandicapUpperDaily: z.array(DailyMatchSchema),
    fullHandicapLowerDaily: z.array(DailyMatchSchema),
    fullHandicapDrawDaily: z.array(DailyMatchSchema),
    // 半場讓球
    halfHandicapUpper: z.array(z.number()),
    halfHandicapLower: z.array(z.number()),
    halfHandicapDraw: z.array(z.number()),
    halfHandicapUpperDaily: z.array(DailyMatchSchema),
    halfHandicapLowerDaily: z.array(DailyMatchSchema),
    halfHandicapDrawDaily: z.array(DailyMatchSchema),
    // 全場大小
    fullOverUnderOver: z.array(z.number()),
    fullOverUnderUnder: z.array(z.number()),
    fullOverUnderDraw: z.array(z.number()),
    fullOverUnderOverDaily: z.array(DailyMatchSchema),
    fullOverUnderUnderDaily: z.array(DailyMatchSchema),
    fullOverUnderDrawDaily: z.array(DailyMatchSchema),
    // 半場大小
    halfOverUnderOver: z.array(z.number()),
    halfOverUnderUnder: z.array(z.number()),
    halfOverUnderDraw: z.array(z.number()),
    halfOverUnderOverDaily: z.array(DailyMatchSchema),
    halfOverUnderUnderDaily: z.array(DailyMatchSchema),
    halfOverUnderDrawDaily: z.array(DailyMatchSchema),
    // 全場獨贏
    fullTimeHomeWin: z.array(z.number()),
    fullTimeDraw: z.array(z.number()),
    fullTimeAwayWin: z.array(z.number()),
    fullTimeHomeWinDaily: z.array(DailyMatchSchema),
    fullTimeDrawDaily: z.array(DailyMatchSchema),
    fullTimeAwayWinDaily: z.array(DailyMatchSchema),
    // 半場獨贏
    halfTimeHomeWin: z.array(z.number()),
    halfTimeDraw: z.array(z.number()),
    halfTimeAwayWin: z.array(z.number()),
    halfTimeHomeWinDaily: z.array(DailyMatchSchema),
    halfTimeDrawDaily: z.array(DailyMatchSchema),
    halfTimeAwayWinDaily: z.array(DailyMatchSchema),

    goalsIn15Mins: z.array(GoalsIn15MinsSchema),
    correctScores: z.array(CorrectScoreSchema),
    goalsInterval0To1: z.array(z.number()),
    goalsInterval2To3: z.array(z.number()),
    goalsInterval4To6: z.array(z.number()),
    goalsInterval7Plus: z.array(z.number()),
    analyTime: z.number()
});

const GetFootballStatsReportResultSchema = z.object({
    getFootballStatsResult: GetFootballStatsReportSchema
});

type GetFootballStatsReportResult = z.infer<typeof GetFootballStatsReportResultSchema>;
export type GetFootballStatsReportResponse = z.infer<typeof GetFootballStatsReportSchema>;

export interface GetFootballStatsReportRequest {
    memberId: number;
    ticketId: string;
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
        const { data }: { data: GetFootballStatsRecordResult } = await fetcher(
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
        const { data }: { data: BigDataHintListResult } = await fetcher(
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
 * - params : {@link GetFootballStatsReportRequest}
 * - returns : {@link GetFootballStatsReportResponse}
 */
export const getFootballStatsResult = async (
    input: GetFootballStatsReportRequest
): Promise<ReturnData<GetFootballStatsReportResponse>> => {
    try {
        const { data }: { data: GetFootballStatsReportResult } = await fetcher(
            {
                data: {
                    query: GET_FOOTBALL_STATS_RESULT_QUERY,
                    variables: {
                        input
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetFootballStatsReportResultSchema.parse(data);

        return {
            success: true,
            data: data.getFootballStatsResult
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
        const { data }: { data: GetFootballStatsMatchesResult } = await fetcher(
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

        GetFootballStatsMatchesResultSchema.parse(data);

        return {
            success: true,
            data: data.getFootballStatsMatches.matches
        };
    } catch (error) {
        return handleApiError(error);
    }
};
