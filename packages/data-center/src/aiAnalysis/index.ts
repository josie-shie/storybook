import { z } from 'zod';
// import { fetcher } from 'lib';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
// import {
//     GET_ODDS_HINT_LIST_QUERY,
//     GET_AI_ANALYSIS_REPORT_QUERY,
//     GET_AI_ANALYSIS_CONTEST_LIST_QUERY,
//     GET_BIG_DATA_RECORD_LIST_QUERY
// } from './graphqlQueries';
import {
    OddsHintList,
    BigDataRecordList,
    AiAnalysisReport,
    AiAnalysisContestList
} from './fakeData';

const BigDataRecordSchema = z.object({
    recordId: z.number(),
    recordTime: z.number(),
    handicap: z.union([z.literal('home'), z.literal('away')]),
    odds: z.string(),
    overUnder: z.string(),
    startDate: z.number(),
    endDate: z.number(),
    state: z.union([z.literal(0), z.literal(1)])
    // 分析狀態： 0: 分析中 1：分析完成
});

const BigDataRecordListResultSchema = z.object({
    getBigDataRecordList: z.object({
        list: z.array(BigDataRecordSchema)
    })
});
// eslint-disable-next-line -- TODO: fetch api
type BigDataRecordListResult = z.infer<typeof BigDataRecordListResultSchema>;

export type BigDataRecord = z.infer<typeof BigDataRecordSchema>;
export type BigDataRecordListResponse = BigDataRecord[];

const OddsHintSchema = z.object({
    matchTime: z.number(),
    matchId: z.number(),
    countryName: z.string(),
    leagueId: z.number(),
    leagueName: z.string(),
    homeId: z.number(),
    homeName: z.string(),
    awayId: z.number(),
    awayName: z.string(),
    longOddsTeamId: z.number(),
    longOddsType: z.string(),
    longOddsTimes: z.number(),
    isFamous: z.boolean(),
    leagueLevel: z.number()
});

export interface OddsHintRequest {
    type: 'HANDICAP' | 'OVERUNDER' | 'HANDICAPHALF' | 'OVERUNDERHALF';
}
export type BigDataHint = z.infer<typeof OddsHintSchema>;

const BigDataHintListResultSchema = z.object({
    getBigdataHint: z.object({
        list: z.array(OddsHintSchema)
    })
});
export type BigDataHintListResult = z.infer<typeof BigDataHintListResultSchema>;
export type BigDataHintListResponse = BigDataHint[];

const minutesGoalSchema = z.object({
    goalUpper: z.array(z.number()),
    goalLower: z.array(z.number())
});

const goalRangeSchema = z.object({
    goalRange0To1: z.array(z.number()),
    goalRange2To3: z.array(z.number()),
    goalRange4To6: z.array(z.number()),
    goalRange7Upper: z.array(z.number())
});

const exactGoalSchema = z.object({
    goalRange0To1: z.array(z.number()),
    goalRange1To0: z.array(z.number()),
    goalRange0To0: z.array(z.number()),
    goalRange2To0: z.array(z.number()),
    goalRange0To2: z.array(z.number()),
    goalRange1To1: z.array(z.number()),
    goalRange2To1: z.array(z.number()),
    goalRange1To2: z.array(z.number()),
    goalRange2To2: z.array(z.number()),
    goalRange3To0: z.array(z.number()),
    goalRange0To3: z.array(z.number()),
    goalRange3To3: z.array(z.number()),
    goalRange3To1: z.array(z.number()),
    goalRange1To3: z.array(z.number()),
    goalRange4To4: z.array(z.number()),
    goalRange3To2: z.array(z.number()),
    goalRange2To3: z.array(z.number()),
    goalRange4To0: z.array(z.number()),
    goalRange0To4: z.array(z.number()),
    goalRange4To1: z.array(z.number()),
    goalRange1To4: z.array(z.number()),
    goalRange4To2: z.array(z.number()),
    goalRange2To4: z.array(z.number()),
    goalRange4To3: z.array(z.number()),
    goalRange3To4: z.array(z.number()),
    others: z.array(z.number())
});

const GetAiAnalysisReportSchema = z.object({
    // 全場讓球
    fullHandicapUpper: z.array(z.number()),
    fullHandicapLower: z.array(z.number()),
    fullHandicapDraw: z.array(z.number()),
    fullHandicapUpperDaily: z.array(z.number()),
    fullHandicapLowerDaily: z.array(z.number()),
    fullHandicapDrawDaily: z.array(z.number()),
    // 半場讓球
    halfHandicapUpper: z.array(z.number()),
    halfHandicapLower: z.array(z.number()),
    halfHandicapDraw: z.array(z.number()),
    halfHandicapUpperDaily: z.array(z.number()),
    halfHandicapLowerDaily: z.array(z.number()),
    halfHandicapDrawDaily: z.array(z.number()),
    // 全場大小
    fullOverUnderUpper: z.array(z.number()),
    fullOverUnderLower: z.array(z.number()),
    fullOverUnderDraw: z.array(z.number()),
    fullOverUnderUpperDaily: z.array(z.number()),
    fullOverUnderLowerDaily: z.array(z.number()),
    fullOverUnderDrawDaily: z.array(z.number()),
    // 半場大小
    halfOverUnderUpper: z.array(z.number()),
    halfOverUnderLower: z.array(z.number()),
    halfOverUnderDraw: z.array(z.number()),
    halfOverUnderUpperDaily: z.array(z.number()),
    halfOverUnderLowerDaily: z.array(z.number()),
    halfOverUnderDrawDaily: z.array(z.number()),
    // 全場獨贏
    fullMoneyLineUpper: z.array(z.number()),
    fullMoneyLineLower: z.array(z.number()),
    fullMoneyLineDraw: z.array(z.number()),
    fullMoneyLineUpperDaily: z.array(z.number()),
    fullMoneyLineLowerDaily: z.array(z.number()),
    fullMoneyLineDrawDaily: z.array(z.number()),
    // 半場獨贏
    halfMoneyLineUpper: z.array(z.number()),
    halfMoneyLineLower: z.array(z.number()),
    halfMoneyLineDraw: z.array(z.number()),
    halfMoneyLineUpperDaily: z.array(z.number()),
    halfMoneyLineLowerDaily: z.array(z.number()),
    halfMoneyLineDrawDaily: z.array(z.number()),
    minutesGoal: z.array(minutesGoalSchema),
    goalRange: goalRangeSchema,
    exactGoal: exactGoalSchema
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
 * - returns : {@link BigDataRecordListResponse}
 * - {@link BigDataRecord}
 */
// eslint-disable-next-line -- TODO: fetch api
export const getBigDataRecordList = async (): Promise<ReturnData<BigDataRecordListResponse>> => {
    try {
        // const { data }: { data: BigDataRecordListResult } = await fetcher(
        //     {
        //         data: {
        //             query: GET_BIG_DATA_RECORD_LIST_QUERY
        //         }
        //     },
        //     { cache: 'no-store' }
        // );

        // BigDataRecordListResultSchema.parse(data);

        return {
            success: true,
            // data: data.getBigDataRecordList.list
            data: BigDataRecordList
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
    // eslint-disable-next-line -- TODO: fetch api
    type // eslint-disable-next-line -- TODO: fetch api
}: OddsHintRequest): Promise<ReturnData<BigDataHintListResponse>> => {
    try {
        // const { data }: { data: BigDataHintListResult } = await fetcher(
        //     {
        //         data: {
        //             query: GET_ODDS_HINT_LIST_QUERY,
        //             variables: {
        //                 input: {
        //                     type
        //                 }
        //             }
        //         }
        //     },
        //     { cache: 'no-store' }
        // );

        // BigDataHintListResultSchema.parse(data);

        return {
            success: true,
            data: OddsHintList
            // data: data.getBigdataHint.list
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
