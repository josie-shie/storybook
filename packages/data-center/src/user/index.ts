import { fetcher } from 'lib';
import Cookies from 'js-cookie';
import { z } from 'zod';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import {
    REGISTER_MUTATION,
    SEND_VERIFICATION_CODE_MUTATION,
    SEND_VERIFICATION_CODE_IN_LOGGED_MUTATION,
    LOGIN_MUTATION,
    GET_MEMBER_INFO_QUERY,
    FORGET_PASSWORD_RESET_MUTATION,
    UPDATE_PASSWORD_MUTATION,
    UPDATE_MEMBER_INFO_MUTATION,
    GET_INVITATION_CODE_QUERY
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
    sendVerificationCode: z.object({
        captcha: z.string()
    })
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
    login: z.object({
        jwtToken: z.string()
    })
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
    uid: z.string(),
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

const GetInvitationCodeResultSchema = z.object({
    getInvitationCode: z.object({
        invitation_code: z.string()
    })
});

export type GetInvitationCodeResult = z.infer<typeof GetInvitationCodeResultSchema>;

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
}: RegisterRequest): ReturnData<string> => {
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
}: SendVerificationCodeRequest): ReturnData<string> => {
    try {
        const { data }: { data: SendVerificationCodeResult } = await fetcher({
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
        const captcha = data.sendVerificationCode.captcha;

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
}: SendVerificationCodeLoggedInRequest): ReturnData<string> => {
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
}: LoginRequest): ReturnData<string> => {
    try {
        const { data }: { data: LoginResult } = await fetcher({
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
        const access = data.login.jwtToken;

        if (!access) {
            throw new Error('Expected jwtToken but got nothing.');
        }

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
export const getMemberInfo = async (): ReturnData<GetMemberInfoResponse> => {
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
}: ForgetPasswordRequest): ReturnData<null> => {
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
}: UpdatePasswordRequest): ReturnData<null> => {
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
}: UpdateMemberInfoRequest): ReturnData<MemberInfoResponse> => {
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

/**
 * 取得會員邀請碼
 * - returns string
 */
export const getInvitationCode = async (): ReturnData<string> => {
    try {
        const { data }: { data: GetInvitationCodeResult } = await fetcher({
            data: {
                query: GET_INVITATION_CODE_QUERY
            }
        });

        GetInvitationCodeResultSchema.parse(data);
        const invitationCode = data.getInvitationCode.invitation_code;

        if (!invitationCode) {
            throw new Error('Expected invitation_code but got nothing.');
        }

        return {
            success: true,
            data: invitationCode
        };
    } catch (error) {
        return handleApiError(error);
    }
};
