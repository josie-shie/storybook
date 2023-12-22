import { fetcher, truncateFloatingPoint } from 'lib';
import { z } from 'zod';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import { GET_COMPANY_ODDS_DETAIL_QUERY } from './graphqlQueries';

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

type OriginalHandicapsInfo = z.infer<typeof HandicapsInfoSchema>;
type HandicapsInfo = Omit<OriginalHandicapsInfo, 'initialHandicap' | 'currentHandicap'> & {
    initialHandicap: number;
    currentHandicap: number;
};

const TotalGoalsInfoSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialHandicap: z.number(),
    overInitialOdds: z.number(),
    underInitialOdds: z.number(),
    currentHandicap: z.number(),
    overCurrentOdds: z.number(),
    underCurrentOdds: z.number(),
    oddsChangeTime: z.number(),
    oddsType: z.number(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    isClosed: z.boolean()
});

type OriginalTotalGoalsInfo = z.infer<typeof TotalGoalsInfoSchema>;
type TotalGoalsInfo = Omit<OriginalTotalGoalsInfo, 'initialHandicap' | 'currentHandicap'> & {
    initialHandicap: number;
    currentHandicap: number;
};

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
    oddsType: z.number(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    isClosed: z.boolean()
});

export type WinLoseInfo = z.infer<typeof WinDrawLoseSchema>;

const GetCompanyOddsDetailSchema = z.object({
    matchId: z.number(),
    homeTeam: z.string(),
    awayTeam: z.string(),
    homeScore: z.number(),
    awayScore: z.number(),
    startTime: z.number(),
    companyOdds: z.object({
        companyId: z.number(),
        companyName: z.string(),
        fullHandicap: z.array(HandicapsInfoSchema),
        halfHandicap: z.array(HandicapsInfoSchema),
        fullTotalGoal: z.array(TotalGoalsInfoSchema),
        halfTotalGoal: z.array(TotalGoalsInfoSchema),
        fullWinDrawLose: z.array(WinDrawLoseSchema),
        halfWinDrawLose: z.array(WinDrawLoseSchema)
    })
});

const CompanyDetailSchema = z.object({
    getCompanyOddsDetail: GetCompanyOddsDetailSchema
});

type CompanyDetailResult = z.infer<typeof CompanyDetailSchema>;

interface CompanyHandicapsDataType {
    half: {
        list: number[];
        info: Record<number, HandicapsInfo>;
    };
    full: {
        list: number[];
        info: Record<number, HandicapsInfo>;
    };
}

interface CompanyTotalGoalDataType {
    half: {
        list: number[];
        info: Record<number, TotalGoalsInfo>;
    };
    full: {
        list: number[];
        info: Record<number, TotalGoalsInfo>;
    };
}

interface CompanyWinLoseDataDataType {
    half: {
        list: number[];
        info: Record<number, WinLoseInfo>;
    };
    full: {
        list: number[];
        info: Record<number, WinLoseInfo>;
    };
}

export interface GetExponentResponse {
    handicapsData: CompanyHandicapsDataType;
    totalGoalData: CompanyTotalGoalDataType;
    winLoseData: CompanyWinLoseDataDataType;
}

/**
 * 取得賽事指數
 * - params : (matchId: number, companyId: number)
 * - returns : {@link GetExponentResponse}
 */
export const getExponent = async (
    matchId: number,
    companyId: number
): Promise<ReturnData<GetExponentResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<CompanyDetailResult>, unknown>(
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
        CompanyDetailSchema.parse(data);
        const resData = data.getCompanyOddsDetail.companyOdds;

        const handicapsData: CompanyHandicapsDataType = {
            half: {
                list: [],
                info: {}
            },
            full: {
                list: [],
                info: {}
            }
        };

        if (resData.halfHandicap.length > 0) {
            for (const item of resData.halfHandicap) {
                if (!handicapsData.half.list.includes(item.companyId)) {
                    handicapsData.half.list.push(item.companyId);
                }

                handicapsData.half.info[item.companyId] = {
                    ...item,
                    homeInitialOdds: truncateFloatingPoint(item.homeInitialOdds, 2),
                    awayInitialOdds: truncateFloatingPoint(item.awayInitialOdds, 2),
                    homeCurrentOdds: truncateFloatingPoint(item.homeCurrentOdds, 2),
                    awayCurrentOdds: truncateFloatingPoint(item.awayCurrentOdds, 2),
                    initialHandicap: item.initialHandicap,
                    currentHandicap: item.currentHandicap
                };
            }
        }
        if (resData.fullHandicap.length > 0) {
            for (const item of resData.fullHandicap) {
                if (!handicapsData.full.list.includes(item.companyId)) {
                    handicapsData.full.list.push(item.companyId);
                }

                handicapsData.full.info[item.companyId] = {
                    ...item,
                    homeInitialOdds: truncateFloatingPoint(item.homeInitialOdds, 2),
                    awayInitialOdds: truncateFloatingPoint(item.awayInitialOdds, 2),
                    homeCurrentOdds: truncateFloatingPoint(item.homeCurrentOdds, 2),
                    awayCurrentOdds: truncateFloatingPoint(item.awayCurrentOdds, 2),
                    initialHandicap: item.initialHandicap,
                    currentHandicap: item.currentHandicap
                };
            }
        }

        const totalGoalData: CompanyTotalGoalDataType = {
            half: {
                list: [],
                info: {}
            },
            full: {
                list: [],
                info: {}
            }
        };

        if (resData.halfTotalGoal.length > 0) {
            for (const item of resData.halfTotalGoal) {
                if (!totalGoalData.half.list.includes(item.companyId)) {
                    totalGoalData.half.list.push(item.companyId);
                }

                totalGoalData.half.info[item.companyId] = {
                    ...item,
                    overInitialOdds: truncateFloatingPoint(item.overInitialOdds, 2),
                    underInitialOdds: truncateFloatingPoint(item.underInitialOdds, 2),
                    overCurrentOdds: truncateFloatingPoint(item.overCurrentOdds, 2),
                    underCurrentOdds: truncateFloatingPoint(item.underCurrentOdds, 2),
                    initialHandicap: item.initialHandicap,
                    currentHandicap: item.currentHandicap
                };
            }
        }
        if (resData.fullTotalGoal.length > 0) {
            for (const item of resData.fullTotalGoal) {
                if (!totalGoalData.full.list.includes(item.companyId)) {
                    totalGoalData.full.list.push(item.companyId);
                }

                totalGoalData.full.info[item.companyId] = {
                    ...item,
                    overInitialOdds: truncateFloatingPoint(item.overInitialOdds, 2),
                    underInitialOdds: truncateFloatingPoint(item.underInitialOdds, 2),
                    overCurrentOdds: truncateFloatingPoint(item.overCurrentOdds, 2),
                    underCurrentOdds: truncateFloatingPoint(item.underCurrentOdds, 2),
                    initialHandicap: item.initialHandicap,
                    currentHandicap: item.currentHandicap
                };
            }
        }

        const winLoseData: CompanyWinLoseDataDataType = {
            half: {
                list: [],
                info: {}
            },
            full: {
                list: [],
                info: {}
            }
        };

        if (resData.halfWinDrawLose.length > 0) {
            for (const item of resData.halfWinDrawLose) {
                if (!winLoseData.half.list.includes(item.companyId)) {
                    winLoseData.half.list.push(item.companyId);
                }

                winLoseData.half.info[item.companyId] = {
                    ...item,
                    initialHomeOdds: truncateFloatingPoint(item.initialHomeOdds, 2),
                    initialDrawOdds: truncateFloatingPoint(item.initialDrawOdds, 2),
                    initialAwayOdds: truncateFloatingPoint(item.initialAwayOdds, 2),
                    currentHomeOdds: truncateFloatingPoint(item.currentHomeOdds, 2),
                    currentDrawOdds: truncateFloatingPoint(item.currentDrawOdds, 2),
                    currentAwayOdds: truncateFloatingPoint(item.currentAwayOdds, 2)
                };
            }
        }
        if (resData.fullWinDrawLose.length > 0) {
            for (const item of resData.fullWinDrawLose) {
                if (!winLoseData.full.list.includes(item.companyId)) {
                    winLoseData.full.list.push(item.companyId);
                }

                winLoseData.full.info[item.companyId] = {
                    ...item,
                    initialHomeOdds: truncateFloatingPoint(item.initialHomeOdds, 2),
                    initialDrawOdds: truncateFloatingPoint(item.initialDrawOdds, 2),
                    initialAwayOdds: truncateFloatingPoint(item.initialAwayOdds, 2),
                    currentHomeOdds: truncateFloatingPoint(item.currentHomeOdds, 2),
                    currentDrawOdds: truncateFloatingPoint(item.currentDrawOdds, 2),
                    currentAwayOdds: truncateFloatingPoint(item.currentAwayOdds, 2)
                };
            }
        }

        const res: GetExponentResponse = { handicapsData, totalGoalData, winLoseData };
        return {
            success: true,
            data: res
        };
    } catch (error) {
        return handleApiError(error);
    }
};
