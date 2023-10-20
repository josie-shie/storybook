import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError } from '../common';
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
    explain: z.string(),
    extraExplain: z.string(),
    hasLineup: z.string(),
    injuryTime: z.string(),
    matchId: z.number(),
    matchTime: z.string(),
    startTime: z.string(),
    state: z.number(),
    color: z.string(),
    countryCn: z.string()
});

type ContestInfo = z.infer<typeof ContestInfoSchema>;

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
 * - param (dateTime: string) ex: 2023/8/2 12:00:00
 * - returns : {@link GetContestListResponse}
 * - {@link ContestListType} {@link ContestInfoType}
 */
export const getContestList = async (dateTime: string) => {
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
        handleApiError(error);
    }
};
