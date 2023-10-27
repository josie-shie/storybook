import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import { GET_CONTEST_LIST_QUERY } from './graphqlQueries';

const ContestInfoSchema = z.object({
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
    // explain: z.string(),
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
    countryCn: z.string()
});

export type ContestInfo = z.infer<typeof ContestInfoSchema>;

const GetContestListResultSchema = z.object({
    getTodayMatch: z.object({
        match: z.array(ContestInfoSchema)
    })
});

type GetContestListResult = z.infer<typeof GetContestListResultSchema>;

export type ContestListType = number[];

export type ContestInfoType = Record<number, ContestInfo>;

export interface GetContestListResponse {
    contestList: ContestListType;
    contestInfo: ContestInfoType;
}

/**
 * 取得當日賽事
 * - param (dateTime: number) ex: 1692038043
 * - returns : {@link GetContestListResponse}
 * - {@link ContestListType} {@link ContestInfoType}
 */
export const getContestList = async (
    dateTime: number
): Promise<ReturnData<GetContestListResponse>> => {
    try {
        const { data }: { data: GetContestListResult } = await fetcher(
            {
                data: {
                    query: GET_CONTEST_LIST_QUERY,
                    variables: {
                        input: {
                            dateTime,
                            matchType: '3'
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetContestListResultSchema.parse(data);
        const contestList: ContestListType = [];
        const contestInfo: ContestInfoType = {};

        for (const item of data.getTodayMatch.match) {
            contestList.push(item.matchId);
            contestInfo[item.matchId] = item;
        }
        return {
            success: true,
            data: { contestList, contestInfo }
        };
    } catch (error) {
        return handleApiError(error);
    }
};
