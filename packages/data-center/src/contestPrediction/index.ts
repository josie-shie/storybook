import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError } from '../common';
import { GET_MATCH_POSTS_QUERY } from './graphqlQueries';

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
 * 取得指定賽事預測(推薦)文章列表
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
