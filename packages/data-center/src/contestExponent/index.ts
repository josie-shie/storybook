import { fetcher, truncateFloatingPoint } from 'lib';
import { z } from 'zod';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import { GET_COMPANY_ODDS_DETAIL_QUERY } from './graphqlQueries';

const HandicapsInfoSchema = z.object({
    handicap: z.number(),
    homeOdds: z.number(),
    awayOdds: z.number(),
    closed: z.boolean()
});

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
    companyName: z.string(),
    initial: HandicapsInfoSchema,
    beforeMatch: HandicapsInfoSchema,
    live: HandicapsInfoSchema
});

const WinDrawLoseListSchema = z.object({
    companyName: z.string(),
    initial: WinDrawLoseInfoSchema,
    beforeMatch: WinDrawLoseInfoSchema,
    live: WinDrawLoseInfoSchema
});

const OverUnderListSchema = z.object({
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
    getCompanyOddsDetail: z.object({
        handicap: z.string(),
        overUnder: z.string(),
        winDrawLose: z.string(),
        corners: z.string()
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
    getCompanyDetail: z.object({
        handicap: z.string(),
        overUnder: z.string(),
        winDrawLose: z.string(),
        corners: z.string()
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
                    query: GET_COMPANY_ODDS_DETAIL_QUERY,
                    variables: {
                        input: {
                            matchId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        const resData = data.getCompanyOddsDetail;

        const companyList: CompanyList = {
            handicap: [],
            overUnder: [],
            winDrawLose: [],
            corners: []
        };

        const companyInfo: CompanyInfo = {
            handicap: JSON.parse(resData.handicap) as HandicapsCompanySchema,
            overUnder: JSON.parse(resData.overUnder) as OverUnderCompanySchema,
            winDrawLose: JSON.parse(resData.winDrawLose) as WinDrawLoseCompanySchema,
            corners: JSON.parse(resData.corners) as OverUnderCompanySchema
        };

        for (const type in companyInfo) {
            if (type === 'winDrawLose') {
                for (const item in companyInfo[type]) {
                    companyList[type].push(Number(item));
                    companyInfo[type][Number(item)] = {
                        companyName: companyInfo[type][item].companyName,
                        initial: {
                            homeWin: truncateFloatingPoint(
                                companyInfo[type][item].initial.homeWin,
                                2
                            ),
                            draw: truncateFloatingPoint(companyInfo[type][item].initial.draw, 2),
                            awayWin: truncateFloatingPoint(
                                companyInfo[type][item].initial.awayWin,
                                2
                            ),
                            closed: companyInfo[type][item].initial.closed
                        },
                        beforeMatch: {
                            homeWin: truncateFloatingPoint(
                                companyInfo[type][item].beforeMatch.homeWin,
                                2
                            ),
                            draw: truncateFloatingPoint(
                                companyInfo[type][item].beforeMatch.draw,
                                2
                            ),
                            awayWin: truncateFloatingPoint(
                                companyInfo[type][item].beforeMatch.awayWin,
                                2
                            ),
                            closed: companyInfo[type][item].beforeMatch.closed
                        },
                        live: {
                            homeWin: truncateFloatingPoint(companyInfo[type][item].live.homeWin, 2),
                            draw: truncateFloatingPoint(companyInfo[type][item].live.draw, 2),
                            awayWin: truncateFloatingPoint(companyInfo[type][item].live.awayWin, 2),
                            closed: companyInfo[type][item].live.closed
                        }
                    };
                }
            } else if (type === 'handicap') {
                for (const item in companyInfo[type]) {
                    companyList[type].push(Number(item));
                    companyInfo[type][item] = {
                        companyName: companyInfo[type][item].companyName,
                        initial: {
                            handicap: truncateFloatingPoint(
                                companyInfo[type][item].initial.handicap,
                                2
                            ),
                            homeOdds: truncateFloatingPoint(
                                companyInfo[type][item].initial.homeOdds,
                                2
                            ),
                            awayOdds: truncateFloatingPoint(
                                companyInfo[type][item].initial.awayOdds,
                                2
                            ),
                            closed: companyInfo[type][item].initial.closed
                        },
                        beforeMatch: {
                            handicap: truncateFloatingPoint(
                                companyInfo[type][item].beforeMatch.handicap,
                                2
                            ),
                            homeOdds: truncateFloatingPoint(
                                companyInfo[type][item].beforeMatch.homeOdds,
                                2
                            ),
                            awayOdds: truncateFloatingPoint(
                                companyInfo[type][item].beforeMatch.awayOdds,
                                2
                            ),
                            closed: companyInfo[type][item].beforeMatch.closed
                        },
                        live: {
                            handicap: truncateFloatingPoint(
                                companyInfo[type][item].live.handicap,
                                2
                            ),
                            homeOdds: truncateFloatingPoint(
                                companyInfo[type][item].live.homeOdds,
                                2
                            ),
                            awayOdds: truncateFloatingPoint(
                                companyInfo[type][item].live.awayOdds,
                                2
                            ),
                            closed: companyInfo[type][item].live.closed
                        }
                    };
                }
            } else if (type === 'overUnder' || type === 'corners') {
                for (const item in companyInfo[type]) {
                    companyList[type].push(Number(item));
                    companyInfo[type][item] = {
                        companyName: companyInfo[type][item].companyName,
                        initial: {
                            line: truncateFloatingPoint(companyInfo[type][item].initial.line, 2),
                            overOdds: truncateFloatingPoint(
                                companyInfo[type][item].initial.overOdds,
                                2
                            ),
                            underOdds: truncateFloatingPoint(
                                companyInfo[type][item].initial.underOdds,
                                2
                            ),
                            closed: companyInfo[type][item].initial.closed
                        },
                        beforeMatch: {
                            line: truncateFloatingPoint(
                                companyInfo[type][item].beforeMatch.line,
                                2
                            ),
                            overOdds: truncateFloatingPoint(
                                companyInfo[type][item].beforeMatch.overOdds,
                                2
                            ),
                            underOdds: truncateFloatingPoint(
                                companyInfo[type][item].beforeMatch.underOdds,
                                2
                            ),
                            closed: companyInfo[type][item].beforeMatch.closed
                        },
                        live: {
                            line: truncateFloatingPoint(companyInfo[type][item].live.line, 2),
                            overOdds: truncateFloatingPoint(
                                companyInfo[type][item].live.overOdds,
                                2
                            ),
                            underOdds: truncateFloatingPoint(
                                companyInfo[type][item].live.underOdds,
                                2
                            ),
                            closed: companyInfo[type][item].live.closed
                        }
                    };
                }
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
                    query: GET_COMPANY_ODDS_DETAIL_QUERY,
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

        throwErrorMessage(errors);
        const resData = data.getCompanyDetail;

        const companyInfo: GetExponentDetailResponse = {
            handicap: JSON.parse(resData.handicap) as ExponentDetailHandicapsInfo[],
            overUnder: JSON.parse(resData.overUnder) as ExponentDetailOverUnderInfo[],
            winDrawLose: JSON.parse(resData.winDrawLose) as ExponentDetailWinDrawLoseInfo[],
            corners: JSON.parse(resData.corners) as ExponentDetailOverUnderInfo[]
        };

        for (const type in companyInfo) {
            if (type === 'winDrawLose') {
                for (let item of companyInfo[type]) {
                    item = {
                        homeScore: item.homeScore,
                        awayScore: item.awayScore,
                        oddsChangeTime: item.awayScore,
                        state: item.state,
                        closed: item.closed,
                        homeWin: truncateFloatingPoint(item.homeWin, 2),
                        draw: truncateFloatingPoint(item.draw, 2),
                        awayWin: truncateFloatingPoint(item.awayWin, 2)
                    };
                }
            } else if (type === 'handicap') {
                for (let item of companyInfo[type]) {
                    item = {
                        homeScore: item.homeScore,
                        awayScore: item.awayScore,
                        oddsChangeTime: item.awayScore,
                        state: item.state,
                        closed: item.closed,
                        homeOdds: truncateFloatingPoint(item.homeOdds, 2),
                        handicap: truncateFloatingPoint(item.handicap, 2),
                        awayOdds: truncateFloatingPoint(item.awayOdds, 2)
                    };
                }
            } else if (type === 'overUnder' || type === 'corners') {
                for (let item of companyInfo[type]) {
                    item = {
                        homeScore: item.homeScore,
                        awayScore: item.awayScore,
                        oddsChangeTime: item.awayScore,
                        state: item.state,
                        closed: item.closed,
                        overOdds: truncateFloatingPoint(item.overOdds, 2),
                        line: truncateFloatingPoint(item.line, 2),
                        underOdds: truncateFloatingPoint(item.underOdds, 2)
                    };
                }
            }
        }

        const res: GetExponentDetailResponse = companyInfo;
        return {
            success: true,
            data: res
        };
    } catch (error) {
        return handleApiError(error);
    }
};
