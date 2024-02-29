import { fetcher, convertHandicap, truncateFloatingPoint } from 'lib';
import { z } from 'zod';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import { GET_CONTEST_LIST_QUERY } from './graphqlQueries';

const ContestInfoSchema = z.object({
    leagueId: z.number(),
    leagueEn: z.string(),
    leagueEnShort: z.string(),
    leagueChsShort: z.string(),
    leagueChtShort: z.string(),
    leagueLevel: z.number(),
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
    hasAnimation: z.boolean(),
    explainEn: z.string(),
    explainCn: z.string(),
    extraExplain: z.string(),
    hasLineup: z.string(),
    injuryTime: z.string(),
    matchId: z.number(),
    matchTime: z.number(),
    startTime: z.number(),
    halfStartTime: z.number(),
    state: z.number(),
    color: z.string(),
    countryCn: z.string(),
    handicapClosed: z.boolean(),
    handicapCurrent: z.number(),
    handicapHomeCurrentOdds: z.number(),
    handicapAwayCurrentOdds: z.number(),
    overUnderClosed: z.boolean(),
    overUnderCurrent: z.number(),
    overUnderOverCurrentOdds: z.number(),
    overUnderUnderCurrentOdds: z.number(),
    homeLogo: z.string(),
    awayLogo: z.string(),
    status: z.number(),
    mobileLiveUrl: z.string(),
    pcLiveUrl: z.string(),
    hasIntelligence: z.boolean(),
    weather: z.number(),
    temperature: z.string(),
    wind: z.string(),
    pressure: z.string(),
    humidity: z.string(),
    handicapInit: z.number(),
    handicapHomeInitOdds: z.number(),
    handicapAwayInitOdds: z.number(),
    overUnderInit: z.number(),
    overUnderOverInitOdds: z.number(),
    overUnderUnderInitOdds: z.number(),
    isBJSingle: z.boolean(),
    isCompFoot: z.boolean(),
    isTradFoot: z.boolean()
});

export type OriginalContestInfo = z.infer<typeof ContestInfoSchema>;

export type ContestInfo = Omit<
    OriginalContestInfo,
    'handicapCurrent' | 'overUnderCurrent' | 'overUnderInit'
> & {
    handicapCurrent: string;
    overUnderCurrent: string;
    overUnderInit: string;
    hasHandicapOdd: boolean;
    hasOverUnderOdd: boolean;
    hasHandicapInit: boolean;
};

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
        const { data, errors } = await fetcher<FetchResultData<GetContestListResult>, unknown>(
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

        throwErrorMessage(errors);
        GetContestListResultSchema.parse(data);
        const contestList: ContestListType = [];
        const contestInfo: ContestInfoType = {};
        for (const item of data.getTodayMatch.match) {
            contestList.push(item.matchId);
            contestInfo[item.matchId] = {
                ...item,
                startTime: item.startTime || item.matchTime,
                handicapCurrent: convertHandicap(item.handicapCurrent),
                overUnderCurrent: convertHandicap(item.overUnderCurrent),
                overUnderOverCurrentOdds: truncateFloatingPoint(item.overUnderOverCurrentOdds, 2),
                overUnderUnderCurrentOdds: truncateFloatingPoint(item.overUnderUnderCurrentOdds, 2),
                handicapAwayCurrentOdds: truncateFloatingPoint(item.handicapAwayCurrentOdds, 2),
                handicapHomeCurrentOdds: truncateFloatingPoint(item.handicapHomeCurrentOdds, 2),
                handicapHomeInitOdds: truncateFloatingPoint(item.handicapHomeInitOdds, 2),
                handicapAwayInitOdds: truncateFloatingPoint(item.handicapAwayInitOdds, 2),
                overUnderInit: convertHandicap(item.overUnderInit),
                overUnderOverInitOdds: truncateFloatingPoint(item.overUnderOverInitOdds, 2),
                overUnderUnderInitOdds: truncateFloatingPoint(item.overUnderUnderInitOdds, 2),
                hasHandicapOdd:
                    item.handicapCurrent === 0 &&
                    item.handicapHomeCurrentOdds === 0 &&
                    item.handicapAwayCurrentOdds === 0,
                hasOverUnderOdd:
                    item.overUnderCurrent === 0 &&
                    item.overUnderOverCurrentOdds === 0 &&
                    item.overUnderUnderCurrentOdds === 0,
                hasHandicapInit:
                    item.handicapInit === 0 &&
                    item.handicapHomeInitOdds === 0 &&
                    item.handicapAwayInitOdds === 0
            };
        }
        return {
            success: true,
            data: { contestList, contestInfo }
        };
    } catch (error) {
        return handleApiError(error);
    }
};
