import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError } from '../common';
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
    oddsChangeTime: z.string(),
    oddsType: z.number(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    isClosed: z.boolean()
});

type HandicapsInfo = z.infer<typeof HandicapsInfoSchema>;

const TotalGoalsInfoSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialTotalGoals: z.number(),
    overInitialOdds: z.number(),
    underInitialOdds: z.number(),
    currentTotalGoals: z.number(),
    overCurrentOdds: z.number(),
    underCurrentOdds: z.number(),
    oddsChangeTime: z.string(),
    oddsType: z.number(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    isClosed: z.boolean()
});

type TotalGoalsInfo = z.infer<typeof TotalGoalsInfoSchema>;

const WinDrawLoseTypeSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialHomeOdds: z.number(),
    initialDrawOdds: z.number(),
    initialAwayOdds: z.number(),
    currentHomeOdds: z.number(),
    currentDrawOdds: z.number(),
    currentAwayOdds: z.number(),
    oddsChangeTime: z.string(),
    oddsType: z.number(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    isClosed: z.boolean()
});

const GetCompanyOddsDetailSchema = z.object({
    matchId: z.number(),
    homeTeam: z.string(),
    awayTeam: z.string(),
    homeScore: z.number(),
    awayScore: z.number(),
    startTime: z.string(),
    companyOdds: z.object({
        companyId: z.number(),
        companyName: z.string(),
        fullHandicap: z.array(HandicapsInfoSchema),
        halfHandicap: z.array(HandicapsInfoSchema),
        fullTotalGoal: z.array(TotalGoalsInfoSchema),
        halfTotalGoal: z.array(TotalGoalsInfoSchema),
        fullWinDrawLose: z.array(WinDrawLoseTypeSchema),
        halfWinDrawLose: z.array(WinDrawLoseTypeSchema)
    })
});

const CompanyDetailSchema = z.object({
    getCompanyOddsDetail: GetCompanyOddsDetailSchema
});

type CompanyDetailResult = z.infer<typeof CompanyDetailSchema>;

interface WinLoseInfo {
    matchId: number;
    companyId: number;
    initialHomeOdds: number;
    initialDrawOdds: number;
    initialAwayOdds: number;
    currentHomeOdds: number;
    currentDrawOdds: number;
    currentAwayOdds: number;
    oddsChangeTime: string;
    isClosed: boolean;
    oddsType: number;
    state: number;
    homeScore: number;
    awayScore: number;
}

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
 * 取得指數
 * - params : (matchId: number, companyId: number)
 * - returns : {@link GetExponentResponse}
 */
export const getExponent = async (matchId: number, companyId: number) => {
    try {
        const { data }: { data: CompanyDetailResult } = await fetcher(
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

                handicapsData.half.info[item.companyId] = item;
            }
        }
        if (resData.fullHandicap.length > 0) {
            for (const item of resData.fullHandicap) {
                if (!handicapsData.full.list.includes(item.companyId)) {
                    handicapsData.full.list.push(item.companyId);
                }

                handicapsData.full.info[item.companyId] = item;
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

                totalGoalData.half.info[item.companyId] = item;
            }
        }
        if (resData.fullTotalGoal.length > 0) {
            for (const item of resData.fullTotalGoal) {
                if (!totalGoalData.full.list.includes(item.companyId)) {
                    totalGoalData.full.list.push(item.companyId);
                }

                totalGoalData.full.info[item.companyId] = item;
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

                winLoseData.half.info[item.companyId] = item;
            }
        }
        if (resData.fullWinDrawLose.length > 0) {
            for (const item of resData.fullWinDrawLose) {
                if (!winLoseData.full.list.includes(item.companyId)) {
                    winLoseData.full.list.push(item.companyId);
                }

                winLoseData.full.info[item.companyId] = item;
            }
        }

        return {
            success: true,
            data: { handicapsData, totalGoalData, winLoseData }
        };
    } catch (error) {
        handleApiError(error);
    }
};
