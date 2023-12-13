import { z } from 'zod';
import { fetcher } from 'lib';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import {
    GET_ODDS_HINT_LIST_QUERY,
    GET_FOOTBALL_STATS_RECORD_QUERY
    // GET_AI_ANALYSIS_REPORT_QUERY,
    // GET_AI_ANALYSIS_CONTEST_LIST_QUERY,
} from './graphqlQueries';
import { AiAnalysisReport, AiAnalysisContestList } from './fakeData';

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
    awayId: z.number(),
    awayChs: z.string(),
    longOddsTeamId: z.number(),
    longOddsType: z.string(),
    longOddsTimes: z.number(),
    isFamous: z.boolean(),
    leagueLevel: z.number()
});

export type OddsHintsType = 'HANDICAP' | 'OVERUNDER' | 'HANDICAPHALF' | 'OVERUNDERHALF';
export interface OddsHintRequest {
    type: OddsHintsType;
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

const CorrectScoreSchema = z.object({
    score: z.string(),
    matches: z.array(z.number())
});

const GoalsIn15MinsSchema = z.object({
    goalsOver: z.array(z.number()),
    goalsUnder: z.array(z.number())
});

const GetAiAnalysisReportSchema = z.object({
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

const GetAiAnalysisReportResultSchema = z.object({
    getAiAnalysisReport: GetAiAnalysisReportSchema
});
// eslint-disable-next-line -- TODO: fetch api
type GetAiAnalysisReportResult = z.infer<typeof GetAiAnalysisReportResultSchema>;
export type GetAiAnalysisReportResponse = z.infer<typeof GetAiAnalysisReportSchema>;

export interface GetAiAnalysisReportRequest {
    recordId: number;
}

const GetAiAnalysisContestSchema = z.object({
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

export type GetAiAnalysisContest = z.infer<typeof GetAiAnalysisContestSchema>;
export type GetAiAnalysisContestListResponse = GetAiAnalysisContest[];
const GetAiAnalysisContestListResultSchema = z.object({
    getAiAnalysisContestList: z.object({
        list: z.array(GetAiAnalysisContestSchema)
    })
});
// eslint-disable-next-line -- TODO: fetch api
type GetAiAnalysisContestListResult = z.infer<typeof GetAiAnalysisContestListResultSchema>;

export interface GetAiAnalysisContestListRequest {
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
    type
}: OddsHintRequest): Promise<ReturnData<BigDataHintListResponse>> => {
    try {
        const { data }: { data: BigDataHintListResult } = await fetcher(
            {
                data: {
                    query: GET_ODDS_HINT_LIST_QUERY,
                    variables: {
                        input: {
                            type
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
 * - params : {@link GetAiAnalysisReportRequest}
 * - returns : {@link GetAiAnalysisReportResponse}
 */
export const getAiAnalysisReport = async ({
    // eslint-disable-next-line -- TODO: fetch api
    recordId // eslint-disable-next-line -- TODO: fetch api
}: GetAiAnalysisReportRequest): Promise<ReturnData<GetAiAnalysisReportResponse>> => {
    try {
        // const { data }: { data: GetAiAnalysisReportResult } = await fetcher(
        //     {
        //         data: {
        //             query: GET_AI_ANALYSIS_REPORT_QUERY,
        //             variables: {
        //                 input: {
        //                     recordId
        //                 }
        //             }
        //         }
        //     },
        //     { cache: 'no-store' }
        // );

        // GetAiAnalysisReportSchema.parse(data);

        return {
            success: true,
            data: AiAnalysisReport
            // data: data.getAiAnalysisReport
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得分析賽事列表
 * - params : {@link GetAiAnalysisContestListRequest}
 * - returns : {@link GetAiAnalysisContestListResponse}
 * - {@link GetAiAnalysisContest}
 */
export const getAiAnalysisContestList = async ({
    // eslint-disable-next-line -- TODO: fetch api
    matchIds // eslint-disable-next-line -- TODO: fetch api
}: GetAiAnalysisContestListRequest): Promise<ReturnData<GetAiAnalysisContestListResponse>> => {
    try {
        // const { data }: { data: GetAiAnalysisContestListResult } = await fetcher(
        //     {
        //         data: {
        //             query: GET_AI_ANALYSIS_CONTEST_LIST_QUERY,
        //             variables: {
        //                 input: {
        //                     matchIds
        //                 }
        //             }
        //         }
        //     },
        //     { cache: 'no-store' }
        // );

        // GetAiAnalysisContestListResultSchema.parse(data);

        return {
            success: true,
            data: AiAnalysisContestList
            // data: data.getAiAnalysisContestList.list
        };
    } catch (error) {
        return handleApiError(error);
    }
};
