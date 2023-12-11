import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import { PredictionResultSchema, PredictedPlaySchema } from '../commonType';
import {
    GET_INDEX_POSTS_QUERY,
    GET_MENTOR_POSTS_QUERY,
    GET_MATCH_POST_QUERY,
    GET_POST_DETAIL_QUERY,
    GET_MENTOR_LIST_QUERY
} from './graphqlQueries';

export interface GetIndexPostsRequest {
    currentPage: number;
    pageSize: number;
}

const RecommendPostSchema = z.object({
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
    lastTenAnalysisResult: z.array(z.string()),
    weekHitRate: z.string(),
    shortAnalysisContent: z.string(),
    lastTenAnalysisWinCount: z.number(),
    lastTenAnalysisWinCountStr: z.string()
});

const GetIndexPostsResultSchema = z.object({
    getIndexPosts: z.object({
        posts: z.array(RecommendPostSchema),
        total_page_count: z.number()
    })
});

export type RecommendPost = z.infer<typeof RecommendPostSchema>;

type GetIndexPostsResult = z.infer<typeof GetIndexPostsResultSchema>;

export interface GetIndexPostsResponse {
    list: RecommendPost[];
    total: number;
}

/**
 * 取得前台首頁預設推薦文章
 * - params : {@link GetIndexPostsRequest}
 * - returns : {@link GetIndexPostsResponse}
 * - {@link GetIndexPostsResponse} {@link RecommendPost}
 */
export const getIndexPosts = async ({
    currentPage,
    pageSize
}: GetIndexPostsRequest): Promise<ReturnData<GetIndexPostsResponse>> => {
    try {
        const { data }: { data: GetIndexPostsResult } = await fetcher(
            {
                data: {
                    query: GET_INDEX_POSTS_QUERY,
                    variables: {
                        current_page: currentPage,
                        page_size: pageSize
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetIndexPostsResultSchema.parse(data);

        return {
            success: true,
            data: {
                list: data.getIndexPosts.posts,
                total: data.getIndexPosts.total_page_count
            }
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetMentorPostsRequest {
    currentPage: number;
    pageSize: number;
    mentorId: number;
}

const GetMentorPostsResultSchema = z.object({
    getMentorPosts: z.object({
        posts: z.array(RecommendPostSchema),
        total_page_count: z.number()
    })
});

type GetMentorPostsResult = z.infer<typeof GetMentorPostsResultSchema>;

export interface GetMentorPostsResponse {
    list: RecommendPost[];
    total: number;
}

/**
 * 取得指定導師文章
 * - params : {@link GetMentorPostsRequest}
 * - returns : {@link GetMentorPostsResponse}
 * - {@link RecommendPost}
 */
export const getMentorPosts = async ({
    currentPage,
    pageSize,
    mentorId
}: GetMentorPostsRequest): Promise<ReturnData<GetMentorPostsResponse>> => {
    try {
        const { data }: { data: GetMentorPostsResult } = await fetcher(
            {
                data: {
                    query: GET_MENTOR_POSTS_QUERY,
                    variables: {
                        current_page: currentPage,
                        page_size: pageSize,
                        mentor_id: mentorId
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetMentorPostsResultSchema.parse(data);

        return {
            success: true,
            data: {
                list: data.getMentorPosts.posts,
                total: data.getMentorPosts.total_page_count
            }
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetMatchPostsRequest {
    currentPage: number;
    pageSize: number;
    matchId: number;
}

const GetMatchPostsResultSchema = z.object({
    getMatchPosts: z.object({
        posts: z.array(RecommendPostSchema),
        total_page_count: z.number()
    })
});

type GetMatchPostsResult = z.infer<typeof GetMatchPostsResultSchema>;

export interface GetMatchPostsResponse {
    list: RecommendPost[];
    total: number;
}

/**
 * 取得指定賽事文章
 * - params : {@link GetMatchPostsRequest}
 * - returns : {@link GetMatchPostsResponse}
 * - {@link GetMailMemberResponse}
 */
export const getMatchPosts = async ({
    currentPage,
    pageSize,
    matchId
}: GetMatchPostsRequest): Promise<ReturnData<GetMatchPostsResponse>> => {
    try {
        const { data }: { data: GetMatchPostsResult } = await fetcher(
            {
                data: {
                    query: GET_MATCH_POST_QUERY,
                    variables: {
                        current_page: currentPage,
                        page_size: pageSize,
                        match_id: matchId
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetMatchPostsResultSchema.parse(data);

        return {
            success: true,
            data: {
                list: data.getMatchPosts.posts,
                total: data.getMatchPosts.total_page_count
            }
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetPostDetailRequest {
    postId: number;
}

const TagSchema = z.object({
    id: z.number(),
    tagName: z.string(),
    note: z.string(),
    colorCode: z.string(),
    weekHitRecentTen: z.number(),
    weekMaxAccurateStreak: z.number(),
    weekHitMatches: z.number(),
    weekTotalMatches: z.number(),
    weekHitRate: z.number(),
    weekHitRateDisplay: z.string(),
    weekRanking: z.number(),
    weekHistoryMaxWinStreak: z.number(),
    monthHitRecentTen: z.number(),
    monthMaxAccurateStreak: z.number(),
    monthHitMatches: z.number(),
    monthTotalMatches: z.number(),
    monthHitRate: z.number(),
    monthHitRateDisplay: z.string(),
    monthRanking: z.number(),
    monthHistoryMaxWinStreak: z.number(),
    quarterHitRecentTen: z.number(),
    quarterMaxAccurateStreak: z.number(),
    quarterHitMatches: z.number(),
    quarterTotalMatches: z.number(),
    quarterHitRate: z.number(),
    quarterHitRateDisplay: z.string(),
    quarterRanking: z.number(),
    quarterHistoryMaxWinStreak: z.number(),
    winHitRecentTen: z.number(),
    winMaxAccurateStreak: z.number(),
    winHitMatches: z.number(),
    winTotalMatches: z.number(),
    winHitRate: z.number(),
    winHitRateDisplay: z.string(),
    winRanking: z.number(),
    winHistoryMaxWinStreak: z.number()
});

const TeamInfoSchema = z.object({
    id: z.number(),
    name: z.string(),
    score: z.number(),
    logo: z.string()
});

const OddsSchema = z.object({
    handicap: z.number(),
    homeTeamOdds: z.number(),
    awayTeamOdds: z.number(),
    overUnder: z.number(),
    overOdds: z.number(),
    underOdds: z.number()
});

const GetPostDetailSchema = z.object({
    id: z.number(),
    matchId: z.number(),
    leagueId: z.number(),
    state: z.number(),
    leagueName: z.string(),
    homeTeam: TeamInfoSchema,
    awayTeam: TeamInfoSchema,
    odds: OddsSchema,
    mentorId: z.number(),
    mentorName: z.string(),
    mentorImage: z.string(),
    mentorLevel: z.number(),
    playType: z.union([z.literal('HOMEAWAY'), z.literal('OVERUNDER')]),
    predictedPlay: PredictedPlaySchema,
    analysisTitle: z.string(),
    analysisContent: z.string(),
    price: z.number(),
    predictionResult: PredictionResultSchema,
    matchTime: z.number(),
    createdAt: z.number(),
    fansNumber: z.number(),
    unlockNumber: z.number(),
    followed: z.boolean(),
    tag: TagSchema
});

export type GetPostDetailResponse = z.infer<typeof GetPostDetailSchema>;

const GetPostDetailResultSchema = z.object({
    getPostDetail: GetPostDetailSchema
});

type GetPostDetailResult = z.infer<typeof GetPostDetailResultSchema>;

/**
 * 取得推薦文章詳情
 * - params : {@link GetPostDetailRequest}
 * - returns : {@link GetPostDetailResponse}
= */
export const getPostDetail = async ({
    postId
}: GetPostDetailRequest): Promise<ReturnData<GetPostDetailResponse>> => {
    try {
        const { data }: { data: GetPostDetailResult } = await fetcher(
            {
                data: {
                    query: GET_POST_DETAIL_QUERY,
                    variables: {
                        input: {
                            postId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetPostDetailResultSchema.parse(data);

        return {
            success: true,
            data: data.getPostDetail
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetMentorListRequest {
    memberId: number;
}

const GetMentorSchema = z.object({
    memberId: z.number(),
    username: z.string(),
    avatarPath: z.string(),
    profile: z.string(),
    fans: z.number(),
    unlocked: z.number(),
    isFollowed: z.boolean(),
    tag: TagSchema
});

export type GetMentor = z.infer<typeof GetMentorSchema>;
export type GetMentorListResponse = GetMentor[];

const GetMentorResultSchema = z.object({
    getMentorList: z.object({
        list: z.array(GetMentorSchema)
    })
});

type GetMentorResult = z.infer<typeof GetMentorResultSchema>;

/**
 * 取得專家列表
 * - params : {@link GetMentorListRequest}
 * - returns : {@link GetMailMemberListResponse}
 * - {@link GetMailMemberResponse}
 */
export const getMentorList = async ({
    memberId
}: GetMentorListRequest): Promise<ReturnData<GetMentorListResponse>> => {
    try {
        const { data }: { data: GetMentorResult } = await fetcher(
            {
                data: {
                    query: GET_MENTOR_LIST_QUERY,
                    variables: {
                        memberId
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetMentorResultSchema.parse(data);

        return {
            success: true,
            data: data.getMentorList.list
        };
    } catch (error) {
        return handleApiError(error);
    }
};
