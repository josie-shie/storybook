import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import {
    GET_MAIL_MEMBER_LIST_QUERY,
    GET_MAIL_MEMBER_QUERY,
    DELETE_MAIL_MEMBER_MUTATION
} from './graphqlQueries';

const Tag = z.object({
    id: z.number(),
    tagName: z.string(),
    colorCode: z.string()
})

const GetMailMemberSchema = z.object({
    mailMemberId: z.number(),
    title: z.string(),
    content: z.string(),
    coverImage: z.string(),
    contentImage: z.string(),
    ctaButtonName: z.string(),
    ctaLink: z.string(),
    isRead: z.boolean(),
    createdAt: z.number(),
    tag: Tag
});

const GetMailMemberListSchema = z.array(GetMailMemberSchema);
export type GetMailMemberResponse = z.infer<typeof GetMailMemberSchema>;

const GetMailMemberListResultSchema = z.object({
    getMailMemberList: z.object({
        mailMemberList: z.array(GetMailMemberSchema)
    })
});

type GetMailMemberListResult = z.infer<typeof GetMailMemberListResultSchema>;

export type GetMailMemberListResponse = z.infer<typeof GetMailMemberListSchema>;

export interface GetMailMemberRequest {
    mailMemberId: number;
}

const GetMailMemberResultSchema = z.object({
    getMailMember: GetMailMemberSchema
});

type GetMailMemberResult = z.infer<typeof GetMailMemberResultSchema>;

export interface DeleteMailMemberRequest {
    mailMemberIds: number[];
}

/**
 * 取得站內信列表
 * - returns : {@link GetMailMemberListResponse}
 * - {@link GetMailMemberResponse}
 */
export const getMailMemberList = async (): Promise<ReturnData<GetMailMemberListResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetMailMemberListResult>, unknown>(
            {
                data: {
                    query: GET_MAIL_MEMBER_LIST_QUERY
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetMailMemberListResultSchema.parse(data);

        return {
            success: true,
            data: data.getMailMemberList.mailMemberList
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得站內信
 * - params : {@link GetMailMemberRequest}
 * - returns : {@link GetMailMemberResponse}
 */
export const getMailMember = async ({
    mailMemberId
}: GetMailMemberRequest): Promise<ReturnData<GetMailMemberResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetMailMemberResult>, unknown>(
            {
                data: {
                    query: GET_MAIL_MEMBER_QUERY,
                    variables: {
                        input: {
                            mailMemberId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetMailMemberResultSchema.parse(data);

        return {
            success: true,
            data: data.getMailMember
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 刪除站內信
 * - params : {@link DeleteMailMemberRequest}
 */
export const deleteMailMember = async ({
    mailMemberIds
}: DeleteMailMemberRequest): Promise<ReturnData<null>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<null>, unknown>(
            {
                data: {
                    query: DELETE_MAIL_MEMBER_MUTATION,
                    variables: {
                        input: {
                            mailMemberIds
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        return { success: true, data };
    } catch (error) {
        return handleApiError(error);
    }
};
