import { z } from 'zod';
import { fetcher } from 'lib';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import {
    GET_FOLLOWERS_QUERY,
    UPDATE_FOLLOW_MUTATION,
    DELETE_FOLLOW_MUTATION
} from './graphqlQueries';

const TagsSchema = z.object({
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

export type Tags = z.infer<typeof TagsSchema>;

const FollowersSchema = z.object({
    memberId: z.number(),
    username: z.string(),
    avatarPath: z.string(),
    profile: z.string(),
    fans: z.number(),
    unlocked: z.number(),
    isFollowed: z.boolean(),
    tags: TagsSchema
});

export type GetFollower = z.infer<typeof FollowersSchema>;
export type GetFollowersResponse = GetFollower[];

const FollowersResultSchema = z.object({
    getFollow: z.object({
        list: z.array(FollowersSchema)
    })
});

type FollowersResult = z.infer<typeof FollowersResultSchema>;

export interface GetFollowersRequest {
    memberId: number;
    isFans: boolean;
}

export interface UpdateFollowRequest {
    followerId: number;
    followedId: number;
}

export interface UpdateFollowResponse {
    responseCode: number;
}

const UpdateFollowResultSchema = z.object({
    updateFollow: z.object({
        responseCode: z.number()
    })
});

type UpdateFollowResult = z.infer<typeof UpdateFollowResultSchema>;

const UnFollowResultSchema = z.object({
    deleteFollow: z.object({
        responseCode: z.number()
    })
});

type UnFollowResult = z.infer<typeof UnFollowResultSchema>;

/**
 * 取得追蹤數、粉絲
 * - params : {@link GetFollowersRequest}
 * - returns : {@link GetFollowersResponse}
 * - {@link GetFollower} {@link Tags}
 */
export const getFollowers = async ({
    memberId,
    isFans
}: GetFollowersRequest): Promise<ReturnData<GetFollowersResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<FollowersResult>, unknown>(
            {
                data: {
                    query: GET_FOLLOWERS_QUERY,
                    variables: {
                        input: {
                            memberId,
                            isFans
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        FollowersResultSchema.parse(data);

        return {
            success: true,
            data: data.getFollow.list
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 追蹤
 * - params : {@link UpdateFollowRequest}
 * - returns : {@link UpdateFollowResponse}
 */
export const updateFollow = async ({
    followerId,
    followedId
}: UpdateFollowRequest): Promise<ReturnData<UpdateFollowResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<UpdateFollowResult>, unknown>(
            {
                data: {
                    query: UPDATE_FOLLOW_MUTATION,
                    variables: {
                        input: {
                            followerId,
                            followedId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        UpdateFollowResultSchema.parse(data);

        return { success: true, data: data.updateFollow };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取消追蹤
 * - params : {@link UpdateFollowRequest}
 * - returns : {@link UpdateFollowResponse}
 */
export const unFollow = async ({
    followerId,
    followedId
}: UpdateFollowRequest): Promise<ReturnData<UpdateFollowResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<UnFollowResult>, unknown>(
            {
                data: {
                    query: DELETE_FOLLOW_MUTATION,
                    variables: {
                        input: {
                            followerId,
                            followedId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        UnFollowResultSchema.parse(data);

        return { success: true, data: data.deleteFollow };
    } catch (error) {
        return handleApiError(error);
    }
};
