import { fetcher } from 'lib';
import Cookies from 'js-cookie';
import { z } from 'zod';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import { PredictionResultSchema, TagSchema, PredictedPlaySchema } from '../commonType';
import {
    REGISTER_MUTATION,
    SEND_VERIFICATION_CODE_MUTATION,
    SEND_VERIFICATION_CODE_IN_LOGGED_MUTATION,
    LOGIN_MUTATION,
    GET_MEMBER_INFO_QUERY,
    FORGET_PASSWORD_RESET_MUTATION,
    UPDATE_PASSWORD_MUTATION,
    UPDATE_MEMBER_INFO_MUTATION,
    GET_INVITATION_CODE_QUERY,
    GET_SUBSCRIPTION_QUERY,
    GET_UNLOCKED_QUERY,
    SUBSCRIBE_PLAN_MUTATION,
    GET_INVITATION_ACTIVITY_REWARD_INFO_QUERY,
    GET_MEMBER_GUESS_VIEWING_RECORDS_QUERY,
    GET_MEMBER_SUBSCRIPTION_STATUS_QUERY
} from './graphqlQueries';

const RegisterResultSchema = z.object({
    register: z.object({
        jwtToken: z.string()
    })
});

type RegisterResult = z.infer<typeof RegisterResultSchema>;

export interface RegisterRequest {
    countryCode: string;
    mobileNumber: string;
    username: string;
    password: string;
    parentId?: string;
    verificationCode: string;
}

const SendVerificationCodeResultSchema = z.object({
    sendVerificationCode: z
        .object({
            captcha: z.string()
        })
        .nullable()
});

type SendVerificationCodeResult = z.infer<typeof SendVerificationCodeResultSchema>;

export interface SendVerificationCodeRequest {
    countryCode: string;
    mobileNumber: string;
    /**
     * verificationType
     * - 0 : SMS
     * - 1 : 圖形 Captcha
     */
    verificationType: 0 | 1;
    checkExistingAccount: boolean;
}

const SendVerificationCodeLoggedInResultSchema = z.object({
    SendVerificationCodeLoggedIn: z.object({
        captcha: z.string()
    })
});

type SendVerificationCodeLoggedInResult = z.infer<typeof SendVerificationCodeLoggedInResultSchema>;

export interface SendVerificationCodeLoggedInRequest {
    verificationType: 0 | 1;
    checkExistingAccount: boolean;
}

const LoginResultSchema = z.object({
    login: z
        .object({
            jwtToken: z.string()
        })
        .nullable()
});

export type LoginResult = z.infer<typeof LoginResultSchema>;

export interface LoginRequest {
    countryCode: string;
    mobileNumber: string;
    password: string;
    verificationCode: string;
}

export interface ForgetPasswordRequest {
    countryCode: string;
    mobileNumber: string;
    verificationCode: string;
    newPassword: string;
}

export interface UpdatePasswordRequest {
    verificationCode: string;
    password: string;
    newPassword: string;
}

const MemberInfoSchema = z.object({
    uid: z.number(),
    username: z.string(),
    birthday: z.number(),
    countryCode: z.string(),
    mobileNumber: z.string(),
    wechat: z.string(),
    qqNumber: z.string(),
    avatarPath: z.string(),
    balance: z.number(),
    createdAt: z.number()
});

export type MemberInfoResponse = z.infer<typeof MemberInfoSchema>;

const UpdateMemberInfoResponseSchema = z.object({
    updateMemberInfo: MemberInfoSchema
});

const GetMemberInfoResponseSchema = z.object({
    getMemberInfo: MemberInfoSchema
});

type UpdateMemberInfoResult = z.infer<typeof UpdateMemberInfoResponseSchema>;
type GetMemberInfoResult = z.infer<typeof GetMemberInfoResponseSchema>;
export type UpdateMemberInfoResponse = z.infer<typeof MemberInfoSchema>;
export type GetMemberInfoResponse = z.infer<typeof MemberInfoSchema>;

export interface UpdateMemberInfoRequest {
    birthday: number;
    wechat: string;
    qqNumber: string;
    avatarPath: string;
}

/**
 * 註冊會員
 * - params : {@link RegisterRequest}
 * - returns : string
 */
export const register = async ({
    countryCode,
    mobileNumber,
    username,
    password,
    parentId = '123', // TODO: 需改為選填，123 沒意義
    verificationCode
}: RegisterRequest): Promise<ReturnData<string>> => {
    try {
        const { data }: { data: RegisterResult } = await fetcher({
            data: {
                query: REGISTER_MUTATION,
                variables: {
                    input: {
                        countryCode,
                        mobileNumber,
                        username,
                        password: btoa(password),
                        parentId,
                        verificationCode
                    }
                }
            }
        });

        RegisterResultSchema.parse(data);
        const access = data.register.jwtToken;

        if (!access) {
            throw new Error('Expected jwtToken but got nothing.');
        }

        Cookies.set('access', access);

        return {
            success: true,
            data: access
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 發送驗證碼
 * - params : {@link SendVerificationCodeRequest}
 * - returns : string
 */
export const sendVerificationCode = async ({
    countryCode,
    mobileNumber,
    verificationType,
    checkExistingAccount
}: SendVerificationCodeRequest): Promise<ReturnData<string>> => {
    try {
        const {
            data,
            errors
        }: { data: SendVerificationCodeResult; errors?: { message: string; path: string[] }[] } =
            await fetcher({
                data: {
                    query: SEND_VERIFICATION_CODE_MUTATION,
                    variables: {
                        input: {
                            countryCode,
                            mobileNumber,
                            verificationType,
                            checkExistingAccount
                        }
                    }
                }
            });

        SendVerificationCodeResultSchema.parse(data);
        const captcha = data.sendVerificationCode?.captcha;

        if (errors && !captcha) {
            throw new Error(errors[0].message);
        }

        if (!captcha) {
            throw new Error('Expected captcha but got nothing.');
        }

        return {
            success: true,
            data: captcha
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 發送驗證碼(已登入狀態)
 * - params : {@link SendVerificationCodeLoggedInRequest}
 * - returns : string
 */
export const sendVerificationCodeInLogged = async ({
    verificationType,
    checkExistingAccount
}: SendVerificationCodeLoggedInRequest): Promise<ReturnData<string>> => {
    try {
        const { data }: { data: SendVerificationCodeLoggedInResult } = await fetcher({
            data: {
                query: SEND_VERIFICATION_CODE_IN_LOGGED_MUTATION,
                variables: {
                    input: {
                        verificationType,
                        checkExistingAccount
                    }
                }
            }
        });
        SendVerificationCodeLoggedInResultSchema.parse(data);
        const captcha = data.SendVerificationCodeLoggedIn.captcha;

        if (!captcha) {
            throw new Error('Expected captcha but got nothing.');
        }

        return {
            success: true,
            data: captcha
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 登入會員
 * - params : {@link LoginRequest}
 * - returns string
 */
export const login = async ({
    countryCode,
    mobileNumber,
    password,
    verificationCode
}: LoginRequest): Promise<ReturnData<string>> => {
    try {
        const {
            data,
            errors
        }: { data: LoginResult; errors?: { message: string; path: string[] }[] } = await fetcher({
            data: {
                query: LOGIN_MUTATION,
                variables: {
                    input: {
                        countryCode,
                        mobileNumber,
                        password: btoa(password),
                        verificationCode
                    }
                }
            }
        });
        LoginResultSchema.parse(data);
        const access = data.login?.jwtToken;

        if (errors && !access) {
            throw new Error(errors[0].message);
        }

        if (!access) {
            throw new Error('Expected jwtToken but got nothing.');
        }

        Cookies.set('access', access);

        return {
            success: true,
            data: access
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 獲取會員資料
 * - returns : {@link GetMemberInfoResponse}
 */
export const getMemberInfo = async (): Promise<ReturnData<GetMemberInfoResponse>> => {
    try {
        const { data }: { data: GetMemberInfoResult } = await fetcher({
            data: {
                query: GET_MEMBER_INFO_QUERY
            }
        });
        GetMemberInfoResponseSchema.parse(data);

        return {
            success: true,
            data: data.getMemberInfo
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 忘記密碼、重置密碼
 * - params : {@link ForgetPasswordRequest}
 */
export const forgetPasswordReset = async ({
    countryCode,
    mobileNumber,
    verificationCode,
    newPassword
}: ForgetPasswordRequest): Promise<ReturnData<null>> => {
    try {
        const res: { data: null } = await fetcher({
            data: {
                query: FORGET_PASSWORD_RESET_MUTATION,
                variables: {
                    input: {
                        countryCode,
                        mobileNumber,
                        verificationCode,
                        new_password: btoa(newPassword)
                    }
                }
            }
        });
        return { success: true, data: res.data };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 更新密碼
 * - params : {@link UpdatePasswordRequest}
 */
export const updatePassword = async ({
    verificationCode,
    password,
    newPassword
}: UpdatePasswordRequest): Promise<ReturnData<null>> => {
    try {
        const res: { data: null } = await fetcher({
            data: {
                query: UPDATE_PASSWORD_MUTATION,
                variables: {
                    input: {
                        verificationCode,
                        password: btoa(password),
                        new_password: btoa(newPassword)
                    }
                }
            }
        });
        return { success: true, data: res.data };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 更新用戶資料
 * - params : {@link UpdateMemberInfoRequest}
 * - returns : {@link MemberInfoResponse}
 */
export const updateMemberInfo = async ({
    avatarPath,
    birthday,
    wechat,
    qqNumber
}: UpdateMemberInfoRequest): Promise<ReturnData<MemberInfoResponse>> => {
    try {
        const { data }: { data: UpdateMemberInfoResult } = await fetcher({
            data: {
                query: UPDATE_MEMBER_INFO_MUTATION,
                variables: {
                    input: {
                        avatar_path: avatarPath,
                        birthday,
                        wechat,
                        qq_number: qqNumber
                    }
                }
            }
        });
        UpdateMemberInfoResponseSchema.parse(data);
        return { success: true, data: data.updateMemberInfo };
    } catch (error) {
        return handleApiError(error);
    }
};

const GetInvitationCodeSchema = z.object({
    invitation_code: z.string()
});

const GetInvitationCodeResultSchema = z.object({
    getInvitationCode: GetInvitationCodeSchema
});

type GetInvitationCodeResult = z.infer<typeof GetInvitationCodeResultSchema>;
export type GetInvitationCodeResponse = z.infer<typeof GetInvitationCodeSchema>;

/**
 * 取得會員邀請碼
 * - returns {@link GetInvitationCodeResponse}
 */
export const getInvitationCode = async (): Promise<ReturnData<GetInvitationCodeResponse>> => {
    try {
        const { data }: { data: GetInvitationCodeResult } = await fetcher(
            {
                data: { query: GET_INVITATION_CODE_QUERY }
            },
            { cache: 'no-store' }
        );

        GetInvitationCodeResultSchema.parse(data);

        return { success: true, data: data.getInvitationCode };
    } catch (error) {
        return handleApiError(error);
    }
};

const ServicePlanSchema = z.object({
    planType: z.union([z.literal('DAY'), z.literal('UNLIMITED')]),
    times: z.number()
});

export type ServicePlan = z.infer<typeof ServicePlanSchema>;

const GetSubscriptionPlanSchema = z.object({
    id: z.string(),
    name: z.string(),
    times: z.number(),
    cost: z.number(),
    masterDistribution: ServicePlanSchema,
    masterPlan: ServicePlanSchema,
    expertAnalysis: ServicePlanSchema,
    gamePathAnalysis: ServicePlanSchema
});

const GetSubscriptionPlanListResultSchema = z.object({
    getSubscriptionPlanList: z.object({
        subscriptionPlans: z.array(GetSubscriptionPlanSchema)
    })
});

type GetSubscriptionPlanListResult = z.infer<typeof GetSubscriptionPlanListResultSchema>;
export type GetSubscriptionPlan = z.infer<typeof GetSubscriptionPlanSchema>;
export type GetSubscriptionPlanListResponse = GetSubscriptionPlan[];

/**
 * 取得訂閱方案列表
 * - returns {@link GetSubscriptionPlanListResponse}
 * {@link GetSubscriptionPlan} {@link ServicePlan}
 */
export const getSubscriptionPlanList = async (): Promise<
    ReturnData<GetSubscriptionPlanListResponse>
> => {
    try {
        const { data }: { data: GetSubscriptionPlanListResult } = await fetcher(
            {
                data: { query: GET_SUBSCRIPTION_QUERY }
            },
            { cache: 'no-store' }
        );

        GetSubscriptionPlanListResultSchema.parse(data);

        return { success: true, data: data.getSubscriptionPlanList.subscriptionPlans };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface SubscribePlanRequest {
    memberId: number;
    planId: string;
}

const SubscribePlanSchema = z.object({
    planStartAt: z.number(),
    planEndAt: z.number()
});

const SubscribePlanSchemaResultSchema = z.object({
    subscribePlan: SubscribePlanSchema
});

type SubscribePlanSchemaResult = z.infer<typeof SubscribePlanSchemaResultSchema>;
export type SubscribePlanResponse = z.infer<typeof SubscribePlanSchema>;

/**
 * 訂閱方案
 * - params {@link SubscribePlanRequest}
 * - returns {@link SubscribePlanResponse}
 */
export const subscribePlan = async ({
    memberId,
    planId
}: SubscribePlanRequest): Promise<ReturnData<SubscribePlanResponse>> => {
    try {
        const { data }: { data: SubscribePlanSchemaResult } = await fetcher(
            {
                data: {
                    query: SUBSCRIBE_PLAN_MUTATION,
                    variables: {
                        input: {
                            memberId,
                            planId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        SubscribePlanSchemaResultSchema.parse(data);

        return { success: true, data: data.subscribePlan };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetUnlockedPostRequest {
    memberId: number;
}

const MemberTagsSchema = z.object({
    memberId: z.number(),
    type: z.number(),
    ranking: z.number()
});

const GetUnlockedPostSchema = z.object({
    postId: z.number(),
    analysisTitle: z.string(),
    analysisContent: z.string(),
    predictionResult: PredictionResultSchema,
    mentorId: z.number(),
    mentorName: z.string(),
    avatarPath: z.string(),
    matchId: z.number(),
    leagueId: z.number(),
    leagueName: z.string(),
    homeTeamId: z.number(),
    homeTeamName: z.string(),
    awayTeamId: z.number(),
    awayTeamName: z.string(),
    matchTime: z.number(),
    createdAt: z.number(),
    predictStat: z.number(),
    memberTags: TagSchema
});

export type MemberTag = z.infer<typeof MemberTagsSchema>;

export type GetUnlockedPost = z.infer<typeof GetUnlockedPostSchema>;

const GetUnlockedPostResultSchema = z.object({
    getUnlockedPost: z.object({
        list: z.array(GetUnlockedPostSchema)
    })
});

type GetUnlockedPostResult = z.infer<typeof GetUnlockedPostResultSchema>;
export type GetUnlockedPostResponse = GetUnlockedPost[];

/**
 * 取得已解鎖的文章列表
 * - params {@link GetUnlockedPostRequest}
 * - returns {@link GetUnlockedPostResponse}
 * {@link GetUnlockedPost} {@link MemberTag}
 */
export const getUnlockedPost = async ({
    memberId
}: GetUnlockedPostRequest): Promise<ReturnData<GetUnlockedPostResponse>> => {
    try {
        const { data }: { data: GetUnlockedPostResult } = await fetcher(
            {
                data: {
                    query: GET_UNLOCKED_QUERY,
                    variables: {
                        input: {
                            memberId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetUnlockedPostResultSchema.parse(data);

        return { success: true, data: data.getUnlockedPost.list };
    } catch (error) {
        return handleApiError(error);
    }
};

const GetInvitationActivityRewardInfoSchema = z.object({
    inviterCount: z.number(),
    inviterReward: z.number()
});

const GetInvitationActivityRewardInfoResultSchema = z.object({
    getInvitationActivityRewardInfo: GetInvitationActivityRewardInfoSchema
});

type GetInvitationActivityRewardInfoResult = z.infer<
    typeof GetInvitationActivityRewardInfoResultSchema
>;

export type GetInvitationActivityRewardInfoResponse = z.infer<
    typeof GetInvitationActivityRewardInfoSchema
>;

/**
 * 取得邀請獎勵
 * - returns {@link GetInvitationActivityRewardInfoResponse}
 */
export const getInvitationActivityRewardInfo = async (): Promise<
    ReturnData<GetInvitationActivityRewardInfoResponse>
> => {
    try {
        const { data }: { data: GetInvitationActivityRewardInfoResult } = await fetcher(
            {
                data: {
                    query: GET_INVITATION_ACTIVITY_REWARD_INFO_QUERY
                }
            },
            { cache: 'no-store' }
        );

        GetInvitationActivityRewardInfoResultSchema.parse(data);

        return { success: true, data: data.getInvitationActivityRewardInfo };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetMemberGuessViewingRecordsRequest {
    currentPage: number;
    pageSize: number;
}

const MemberGuessViewingRecordSchema = z.object({
    recordMemberId: z.number(),
    memberName: z.string(),
    avatarPath: z.string(),
    matchId: z.number(),
    matchTime: z.number(),
    leagueId: z.number(),
    leagueName: z.string(),
    homeTeamName: z.string(),
    awayTeamName: z.string(),
    handicapOdds: z.number(),
    overUnderOdds: z.number(),
    predictedPlay: PredictedPlaySchema,
    predictionResult: PredictionResultSchema,
    viewingTime: z.number()
});

export type MemberGuessViewingRecord = z.infer<typeof MemberGuessViewingRecordSchema>;

const GetMemberGuessViewingRecordsResponseSchema = z.object({
    memberGuessViewingRecordList: z.array(MemberGuessViewingRecordSchema),
    pagination: z.object({
        pageCount: z.number(),
        totalCount: z.number()
    })
});

export type GetMemberGuessViewingRecordsResponse = z.infer<
    typeof GetMemberGuessViewingRecordsResponseSchema
>;

const GetMemberGuessViewingRecordsResultSchema = z.object({
    getMemberGuessViewingRecords: GetMemberGuessViewingRecordsResponseSchema
});

type GetMemberGuessViewingRecordsResult = z.infer<typeof GetMemberGuessViewingRecordsResultSchema>;

/**
 * 我的競猜 - 查看記錄
 * - params {@link GetMemberGuessViewingRecordsRequest}
 * - returns {@link GetMemberGuessViewingRecordsResponse}
 * - {@link MemberGuessViewingRecord}
 */
export const getMemberGuessViewingRecords = async ({
    currentPage,
    pageSize
}: GetMemberGuessViewingRecordsRequest): Promise<
    ReturnData<GetMemberGuessViewingRecordsResponse>
> => {
    try {
        const { data }: { data: GetMemberGuessViewingRecordsResult } = await fetcher(
            {
                data: {
                    query: GET_MEMBER_GUESS_VIEWING_RECORDS_QUERY,
                    variables: {
                        input: {
                            currentPage,
                            pageSize
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetMemberGuessViewingRecordsResultSchema.parse(data);

        return { success: true, data: data.getMemberGuessViewingRecords };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetMemberSubscriptionStatusRequest {
    memberId: number;
}

const GetMemberSubscriptionStatusSchema = z.object({
    planId: z.number(),
    planName: z.string(),
    planStartAt: z.number(),
    planEndAt: z.number()
});

const GetMemberSubscriptionStatusResultSchema = z.object({
    getMemberSubscriptionStatus: GetMemberSubscriptionStatusSchema
});

type GetMemberSubscriptionStatusResult = z.infer<typeof GetMemberSubscriptionStatusResultSchema>;
export type GetMemberSubscriptionStatusResponse = z.infer<typeof GetMemberSubscriptionStatusSchema>;

/**
 * 取得會員訂閱狀態
 * - params {@link GetMemberSubscriptionStatusRequest}
 * - returns {@link GetMemberSubscriptionStatusResponse}
 */
export const getMemberSubscriptionStatus = async (
    input: GetMemberSubscriptionStatusRequest
): Promise<ReturnData<GetMemberSubscriptionStatusResponse>> => {
    try {
        const { data }: { data: GetMemberSubscriptionStatusResult } = await fetcher(
            {
                data: {
                    query: GET_MEMBER_SUBSCRIPTION_STATUS_QUERY,
                    variables: {
                        input
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetMemberSubscriptionStatusResultSchema.parse(data);

        return { success: true, data: data.getMemberSubscriptionStatus };
    } catch (error) {
        return handleApiError(error);
    }
};
