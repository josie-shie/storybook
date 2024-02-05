import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import { GET_ODDS_LOG_BY_MATCH_QUERY, GET_ODDS_LOG_BY_COMPANY_QUERY } from './graphqlQueries';

const HandicapsInfoSchema = z.object({
    handicap: z.number(),
    homeOdds: z.number(),
    awayOdds: z.number(),
    closed: z.boolean()
});

export type ExponentTabListType = 'handicap' | 'overUnder' | 'winDrawLose' | 'corners';

export type ExponentHandicapsInfo = z.infer<typeof HandicapsInfoSchema>;

const WinDrawLoseInfoSchema = z.object({
    homeWin: z.number(),
    draw: z.number(),
    awayWin: z.number(),
    closed: z.boolean()
});

export type ExponentWinDrawLoseInfo = z.infer<typeof WinDrawLoseInfoSchema>;

const OverUnderInfoSchema = z.object({
    overOdds: z.number(),
    line: z.number(),
    underOdds: z.number(),
    closed: z.boolean()
});

export type ExponentOverUnderInfo = z.infer<typeof OverUnderInfoSchema>;

const HandicapsListSchema = z.object({
    companyId: z.number(),
    companyName: z.string(),
    initial: HandicapsInfoSchema,
    beforeMatch: HandicapsInfoSchema,
    live: HandicapsInfoSchema
});

const WinDrawLoseListSchema = z.object({
    companyId: z.number(),
    companyName: z.string(),
    initial: WinDrawLoseInfoSchema,
    beforeMatch: WinDrawLoseInfoSchema,
    live: WinDrawLoseInfoSchema
});

const OverUnderListSchema = z.object({
    companyId: z.number(),
    companyName: z.string(),
    initial: OverUnderInfoSchema,
    beforeMatch: OverUnderInfoSchema,
    live: OverUnderInfoSchema
});

export interface CompanyList {
    handicap: number[];
    overUnder: number[];
    winDrawLose: number[];
    corners: number[];
}

export type HandicapsCompanySchema = Record<number, z.infer<typeof HandicapsListSchema>>;

export type WinDrawLoseCompanySchema = Record<number, z.infer<typeof WinDrawLoseListSchema>>;

export type OverUnderCompanySchema = Record<number, z.infer<typeof OverUnderListSchema>>;

const CompanyDetailResultSchema = z.object({
    soccerOddsLog: z.object({
        getOddsLogByMatch: z.object({
            handicap: z.array(HandicapsListSchema),
            overUnder: z.array(OverUnderListSchema),
            winDrawLose: z.array(WinDrawLoseListSchema),
            corners: z.array(OverUnderListSchema)
        })
    })
});

type CompanyDetailResult = z.infer<typeof CompanyDetailResultSchema>;

export interface CompanyInfo {
    handicap: HandicapsCompanySchema;
    overUnder: OverUnderCompanySchema;
    winDrawLose: WinDrawLoseCompanySchema;
    corners: OverUnderCompanySchema;
}

export interface GetExponentResponse {
    companyInfo: CompanyInfo;
    companyList: CompanyList;
}

const HandicapsDetailInfoSchema = z.object({
    awayScore: z.number(),
    homeScore: z.number(),
    handicap: z.number(),
    homeOdds: z.number(),
    awayOdds: z.number(),
    closed: z.boolean(),
    state: z.number(),
    oddsChangeTime: z.number()
});

export type ExponentDetailHandicapsInfo = z.infer<typeof HandicapsDetailInfoSchema>;

const WinDrawLoseDetailInfoSchema = z.object({
    awayScore: z.number(),
    homeScore: z.number(),
    homeWin: z.number(),
    draw: z.number(),
    awayWin: z.number(),
    closed: z.boolean(),
    state: z.number(),
    oddsChangeTime: z.number()
});

export type ExponentDetailWinDrawLoseInfo = z.infer<typeof WinDrawLoseDetailInfoSchema>;

const OverUnderDetailInfoSchema = z.object({
    awayScore: z.number(),
    homeScore: z.number(),
    overOdds: z.number(),
    line: z.number(),
    underOdds: z.number(),
    closed: z.boolean(),
    state: z.number(),
    oddsChangeTime: z.number()
});

export type ExponentDetailOverUnderInfo = z.infer<typeof OverUnderDetailInfoSchema>;

const GetExponentDetailResultSchema = z.object({
    soccerOddsLog: z.object({
        getOddsLogByCompany: z.object({
            handicap: z.array(HandicapsDetailInfoSchema),
            overUnder: z.array(OverUnderDetailInfoSchema),
            winDrawLose: z.array(WinDrawLoseDetailInfoSchema),
            corners: z.array(OverUnderDetailInfoSchema)
        })
    })
});

export type GetExponentDetailResult = z.infer<typeof GetExponentDetailResultSchema>;

const GetExponentDetailResponseSchema = z.object({
    handicap: z.array(HandicapsDetailInfoSchema),
    overUnder: z.array(OverUnderDetailInfoSchema),
    winDrawLose: z.array(WinDrawLoseDetailInfoSchema),
    corners: z.array(OverUnderDetailInfoSchema)
});

export type GetExponentDetailResponse = z.infer<typeof GetExponentDetailResponseSchema>;

/**
 * 取得賽事指數
 * - params : (matchId: number)
 * - returns : {@link GetExponentResponse}
 */
export const getExponent = async (matchId: number): Promise<ReturnData<GetExponentResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<CompanyDetailResult>, unknown>(
            {
                data: {
                    query: GET_ODDS_LOG_BY_MATCH_QUERY,
                    variables: {
                        matchId
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        const resData = data.soccerOddsLog.getOddsLogByMatch;

        const companyList: CompanyList = {
            handicap: [],
            overUnder: [],
            winDrawLose: [],
            corners: []
        };

        const companyInfo: CompanyInfo = {
            handicap: {},
            overUnder: {},
            winDrawLose: {},
            corners: {}
        };

        for (const type in resData) {
            for (const item of resData[type as ExponentTabListType]) {
                companyList[type as ExponentTabListType].push(item.companyId);
                companyInfo[type as ExponentTabListType][item.companyId] = item;
            }
        }

        const res: GetExponentResponse = { companyInfo, companyList };
        return {
            success: true,
            data: res
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得賽事指數詳情
 * - params : (matchId: number, companyId: number)
 * - returns : {@link GetExponentDetailResponse}
 */
export const getExponentDetail = async (
    matchId: number,
    companyId: number
): Promise<ReturnData<GetExponentDetailResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetExponentDetailResult>, unknown>(
            {
                data: {
                    query: GET_ODDS_LOG_BY_COMPANY_QUERY,
                    variables: {
                        matchId,
                        companyId
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        return {
            success: true,
            data: data.soccerOddsLog.getOddsLogByCompany
        };
    } catch (error) {
        return handleApiError(error);
    }
};
