import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import {
    GET_MAIL_MEMBER_LIST_QUERY,
    GET_MAIL_MEMBER_QUERY,
    DELETE_MAIL_MEMBER_MUTATION
} from './graphqlQueries';

const GetMailMemberSchema = z.object({
    mailMemberId: z.number(),
    title: z.string(),
    content: z.string(),
    isRead: z.boolean(),
    createdAt: z.number()
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
        const { data }: { data: GetMailMemberListResult } = await fetcher(
            {
                data: {
                    query: GET_MAIL_MEMBER_LIST_QUERY
                }
            },
            { cache: 'no-store' }
        );

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
        const { data }: { data: GetMailMemberResult } = await fetcher(
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
        const res: { data: null; errors?: { message: string }[] } = await fetcher(
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
        if (res.errors?.[0].message) {
            throw new Error(res.errors[0].message);
        }
        return { success: true, data: res.data };
    } catch (error) {
        return handleApiError(error);
    }
};
