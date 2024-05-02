import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import {
    GET_MAIL_MEMBER_LIST_QUERY,
    DELETE_MAIL_MEMBER_MUTATION,
    UPDATE_MAIL_READ_AT_MUTATION,
    GET_MEMBER_MESSAGE_CENTER_UNREAD_COUNT
} from './graphqlQueries';

const Tag = z.object({
    tagId: z.number(),
    tagName: z.string(),
    tagColor: z.string()
});
const Message = z.object({
    title: z.string(),
    content: z.string(),
    coverImage: z.string(),
    contentImage: z.string(),
    senderName: z.string(),
    senderAvatar: z.string(),
    sentAt: z.number()
});
const Cta = z.object({
    label: z.string(),
    url: z.string()
});

const GetMailMemberSchema = z.object({
    notifyId: z.string(),
    memberId: z.number(),
    eventTypeId: z.number(),
    mrlId: z.number(),
    tag: Tag,
    message: Message,
    cta: Cta,
    readAt: z.number(),
    notifyAt: z.number()
});

const GetMailMemberListSchema = z.object({
    list: z.array(GetMailMemberSchema),
    pagination: z.object({
        pageCount: z.number(),
        totalCount: z.number()
    })
});
export type GetMailMemberResponse = z.infer<typeof GetMailMemberSchema>;

const GetMailMemberListResultSchema = z.object({
    messageCenterQuery: z.object({
        GetMemberNotifyMessageList: z.object({
            list: z.array(GetMailMemberSchema),
            pagination: z.object({
                pageCount: z.number(),
                totalCount: z.number()
            })
        })
    })
});

export type GetMailMemberListResult = z.infer<typeof GetMailMemberListResultSchema>;

export type GetMailMemberListResponse = z.infer<typeof GetMailMemberListSchema>;
export interface GetMailMemberListRequest {
    eventTypeId: number[];
    tagName: string[];
    pagination: {
        currentPage: number;
        perPage: number;
    };
}

export interface DeleteMailMemberRequest {
    notifyIds: string[];
}

export interface DeleteMailMemberResponse {
    messageCenterMutation: {
        delNotifyMessages: {
            responseCode: number;
        };
    };
}
export interface DeleteMailMemberResult {
    responseCode: number;
}

/**
 * 取得站內信列表
 * - returns : {@link GetMailMemberListResponse}
 * - {@link GetMailMemberResponse}
 */
export const getMailMemberList = async (
    input: GetMailMemberListRequest
): Promise<ReturnData<GetMailMemberListResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetMailMemberListResult>, unknown>(
            {
                data: {
                    query: GET_MAIL_MEMBER_LIST_QUERY,
                    variables: {
                        input
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetMailMemberListResultSchema.parse(data);

        return {
            success: true,
            data: {
                list: data.messageCenterQuery.GetMemberNotifyMessageList.list,
                pagination: data.messageCenterQuery.GetMemberNotifyMessageList.pagination
            }
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
    notifyIds
}: DeleteMailMemberRequest): Promise<ReturnData<DeleteMailMemberResult>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<DeleteMailMemberResponse>, unknown>(
            {
                data: {
                    query: DELETE_MAIL_MEMBER_MUTATION,
                    variables: {
                        input: {
                            notifyIds
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        return { success: true, data: data.messageCenterMutation.delNotifyMessages };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface UpdateMailReadAtRequest {
    id: number[];
}

export interface UpdateMailReadAtResponse {
    responseCode: number;
}

const UpdateMailReadAtSchema = z.object({
    messageCenterMutation: z.object({
        updateMessageReadAt: z.object({
            responseCode: z.number()
        })
    })
});

type UpdateMailReadAtResult = z.infer<typeof UpdateMailReadAtSchema>;
/**
 * 更新站內信閱讀狀態
 * - params : {@link UpdateMailReadAtRequest}
 * - returns : {@link UpdateMailReadAtResult}
 */
export const updateMailReadAt = async ({
    id
}: UpdateMailReadAtRequest): Promise<ReturnData<UpdateMailReadAtResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<UpdateMailReadAtResult>, unknown>(
            {
                data: {
                    query: UPDATE_MAIL_READ_AT_MUTATION,
                    variables: {
                        input: {
                            id
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        return { success: true, data: data.messageCenterMutation.updateMessageReadAt };
    } catch (error) {
        return handleApiError(error);
    }
};

const GetMemberMessageCenterUnreadCountSchema = z.object({
    messageCenterMutation: z.object({
        GetMemberMessageCenterUnreadCount: z.object({
            notifyMessageCount: z.number(),
            chatRoomCount: z.number()
        })
    })
});

const GetMemberMessageCenterUnreadCountResultSchema = z.object({
    notifyMessageCount: z.number(),
    chatRoomCount: z.number()
});

type GetMemberMessageCenterUnreadCountResponse = z.infer<
    typeof GetMemberMessageCenterUnreadCountSchema
>;
type GetMemberMessageCenterUnreadCountResult = z.infer<
    typeof GetMemberMessageCenterUnreadCountResultSchema
>;

/**
 * 獲取站內信未讀數量
 * - returns : {@link GetMemberMessageCenterUnreadCountResult}
 */
export const getMemberMessageCenterUnreadCount = async (): Promise<
    ReturnData<GetMemberMessageCenterUnreadCountResult>
> => {
    try {
        const { data, errors } = await fetcher<
            FetchResultData<GetMemberMessageCenterUnreadCountResponse>,
            unknown
        >(
            {
                data: {
                    query: GET_MEMBER_MESSAGE_CENTER_UNREAD_COUNT
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        return {
            success: true,
            data: data.messageCenterMutation.GetMemberMessageCenterUnreadCount
        };
    } catch (error) {
        return handleApiError(error);
    }
};
