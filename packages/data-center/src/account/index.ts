import { z } from 'zod';
import { fetcher } from 'lib';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import {
    GET_FOLLOWERS_QUERY,
    UPDATE_FOLLOW_MUTATION,
    DELETE_FOLLOW_MUTATION
} from './graphqlQueries';

const FollowersSchema = z.object({
    memberId: z.number(),
    username: z.string(),
    avatarPath: z.string(),
    profile: z.string(),
    fans: z.number(),
    unlocked: z.number()
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
    deleteMailMember: z.object({
        responseCode: z.number()
    })
});

type UnFollowResult = z.infer<typeof UnFollowResultSchema>;

/**
 * - params : {@link GetFollowersRequest}
 * - returns : {@link GetFollowersResponse}
 * - {@link GetFollower}
 */
export const getFollowers = async ({
    memberId,
    isFans
}: GetFollowersRequest): Promise<ReturnData<GetFollowersResponse>> => {
    try {
        const { data }: { data: FollowersResult } = await fetcher(
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
        const { data }: { data: UpdateFollowResult } = await fetcher(
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
        const { data }: { data: UnFollowResult } = await fetcher(
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

        UnFollowResultSchema.parse(data);

        return { success: true, data: data.deleteMailMember };
    } catch (error) {
        return handleApiError(error);
    }
};
