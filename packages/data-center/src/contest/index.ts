import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError } from '../common';
import { GET_CONTEST_LIST_QUERY, GET_MATCH_POSTS_QUERY } from './graphqlQueries';

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

export interface GetMatchPostsRequest {
    currentPage: number;
    pageSize: number;
    matchId: number;
}

const PredictedPlaySchema = z.union([
    z.literal('HOME'),
    z.literal('AWAY'),
    z.literal('OVER'),
    z.literal('UNDER')
]);

const PredictionResultSchema = z.union([
    z.literal('NONE'),
    z.literal('WIN'),
    z.literal('LOSE'),
    z.literal('DRAW')
]);

export type PredictedPlay = 'HOME' | 'AWAY' | 'OVER' | 'UNDER';
export type PredictionResult = 'NONE' | 'WIN' | 'LOSE' | 'DRAW';

const PostsInfoPostResultSchema = z.object({
    id: z.number(),
    matchId: z.number(),
    leagueId: z.number(),
    leagueName: z.string(),
    homeTeamId: z.number(),
    homeTeamName: z.string(),
    awayTeamId: z.number(),
    awayTeamName: z.string(),
    homeTeamScore: z.number(),
    awayTeamScore: z.number(),
    handicap: z.number(),
    homeTeamOdds: z.number(),
    awayTeamOdds: z.number(),
    overUnder: z.number(),
    overOdds: z.number(),
    underOdds: z.number(),
    mentorId: z.number(),
    mentorName: z.string(),
    predictedPlay: PredictedPlaySchema,
    analysisTitle: z.string(),
    price: z.number(),
    predictionResult: PredictionResultSchema,
    matchTime: z.number(),
    createdBy: z.number(),
    createdAt: z.number(),
    updatedBy: z.number(),
    updatedAt: z.number(),
    avatarPath: z.string(),
    mentorLevel: z.number(),
    lastTenAnalysisResult: z.array(PredictionResultSchema),
    weekHitRate: z.string(),
    shortAnalysisContent: z.string()
});

type PostsInfoPost = z.infer<typeof PostsInfoPostResultSchema>;

export interface MatchPostsInfo {
    posts: PostsInfoPost[];
    total_page_count: number;
}

export type GetMatchPost = z.infer<typeof PostsInfoPostResultSchema>;
export type GetMatchPostsResponse = GetMatchPost[];

const MatchPostsInfoSchema = z.object({
    posts: z.array(PostsInfoPostResultSchema),
    total_page_count: z.number()
});

const GetMatchPostsResultSchema = z.object({
    getMatchPosts: MatchPostsInfoSchema
});

type GetMatchPostsResult = z.infer<typeof GetMatchPostsResultSchema>;

/**
 * 取得賽事列表
 * - param (dateTime: string)
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

/**
 * 取得賽事文章
 * - param : {@link GetMatchPostsRequest}
 * - returns : {@link GetMatchPostsResponse}
 * - {@link GetMatchPost}
 */
export const getMatchPosts = async (input: GetMatchPostsRequest) => {
    try {
        const { data }: { data: GetMatchPostsResult } = await fetcher(
            {
                data: {
                    query: GET_MATCH_POSTS_QUERY,
                    variables: {
                        input: {
                            current_page: input.currentPage,
                            page_size: input.pageSize,
                            match_id: input.matchId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        return {
            success: true,
            data: data.getMatchPosts.posts
        };
    } catch (error) {
        handleApiError(error);
    }
};
