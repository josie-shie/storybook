import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import { PredictedPlaySchema, PredictionResultSchema } from '../commonType';
import type { PredictedPlay } from '../commonType';
import {
    GET_TODAY_GUESS_MATCHES_QUERY,
    GET_GUESS_RANK_QUERY,
    GET_GUESS_PROPORTION_QUERY,
    GET_MEMBER_INDIVIDUAL_GUESS_QUERY,
    GET_MEMBER_INDIVIDUAL_GUESS_MATCHES_QUERY,
    GET_MENTOR_INDIVIDUAL_GUESS_MATCHES_QUERY,
    GET_RRO_GUESS_QUERY,
    GET_RRO_DISTRIB_QUERY,
    ADD_GUESS_MUTATION,
    PAY_FOR_PRO_DISTRIB_MUTATION,
    PAY_FOR_PRO_GUESS_MUTATION,
    PAY_FOR_POST_MUTATION
} from './graphqlQueries';

const GetTodayGuessMatchSchema = z.object({
    matchId: z.number(),
    leagueId: z.number(),
    color: z.string(),
    leagueName: z.string(),
    homeId: z.number(),
    homeName: z.string(),
    awayId: z.number(),
    awayName: z.string(),
    matchTime: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    handicap: z.number(),
    handicapHomeOdds: z.number(),
    handicapAwayOdds: z.number(),
    overUnder: z.number(),
    overUnderOverOdds: z.number(),
    overUnderUnderOdds: z.number(),
    totalNum: z.number(),
    guessed: z.boolean(),
    state: z.number(),
    homeLogo: z.string(),
    awayLogo: z.string(),
    hasAiPredict: z.boolean()
});

export type GetTodayGuessMatch = z.infer<typeof GetTodayGuessMatchSchema>;

export type ContestGuessInfo = Record<number, GetTodayGuessMatch>;

export type ContestGuessList = number[];
export interface GetTodayGuessMatchesResponse {
    contestGuessList: ContestGuessList;
    contestGuessInfo: ContestGuessInfo;
}

const GetTodayGuessMatchesResultSchema = z.object({
    getTodayGuessMatches: z.object({
        matches: z.array(GetTodayGuessMatchSchema)
    })
});

type GetTodayGuessMatchesResult = z.infer<typeof GetTodayGuessMatchesResultSchema>;

/**
 * 取得當前競猜賽事列表
 * - returns {@link GetTodayGuessMatchesResponse}
 * {@link ContestGuessList} {@link ContestGuessInfo}{@link GetTodayGuessMatch}
 */
export const getTodayGuessMatches = async (): Promise<ReturnData<GetTodayGuessMatchesResponse>> => {
    try {
        const { data, errors } = await fetcher<
            FetchResultData<GetTodayGuessMatchesResult>,
            unknown
        >(
            {
                data: {
                    query: GET_TODAY_GUESS_MATCHES_QUERY
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetTodayGuessMatchesResultSchema.parse(data);

        const contestGuessList: ContestGuessList = [];
        const contestGuessInfo: ContestGuessInfo = {};

        for (const item of data.getTodayGuessMatches.matches) {
            contestGuessList.push(item.matchId);
            contestGuessInfo[item.matchId] = { ...item };
        }

        return {
            success: true,
            data: { contestGuessList, contestGuessInfo }
        };
    } catch (error) {
        return handleApiError(error);
    }
};

interface GetGuessRankRequest {
    memberId: number;
    rankType: 0 | 1 | 2 | 3;
    // 排行榜類型 0:週，1:月，2:季，3:連紅
}

const GuessRankSchema = z.object({
    memberId: z.number(),
    memberName: z.string(),
    memberLevel: z.number(),
    memberAvatar: z.string(),
    ranking: z.number(),
    today: z.boolean(),
    totalMatches: z.number(),
    totalWin: z.number(),
    totalLose: z.number(),
    hitRate: z.number(),
    currentMaxWinStreak: z.number(),
    historyMaxWinStreak: z.number()
});

export type GuessRank = z.infer<typeof GuessRankSchema>;

const MemberRankSchema = z.object({
    memberId: z.number(),
    memberName: z.string(),
    memberLevel: z.number(),
    memberAvatar: z.string(),
    ranking: z.number(),
    today: z.boolean(),
    totalMatches: z.number(),
    totalWin: z.number(),
    totalLose: z.number(),
    hitRate: z.number(),
    currentMaxWinStreak: z.number(),
    historyMaxWinStreak: z.number()
});

export type MemberRank = z.infer<typeof MemberRankSchema>;

export interface GetGuessRankResponse {
    guessRank: GuessRank[];
    memberRank: MemberRank;
}

const GetGuessRankResultSchema = z.object({
    getGuessRank: z.object({
        guessRank: z.array(GuessRankSchema),
        memberRank: MemberRankSchema
    })
});

type GetGuessRankResult = z.infer<typeof GetGuessRankResultSchema>;

/**
 * 取得競猜排行榜
 * - params {@link GetGuessRankRequest}
 * - returns {@link GetGuessRankResponse}
 * - {@link GuessRank} {@link MemberRank}
 */
export const getGuessRank = async ({
    memberId,
    rankType
}: GetGuessRankRequest): Promise<ReturnData<GetGuessRankResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetGuessRankResult>, unknown>(
            {
                data: {
                    query: GET_GUESS_RANK_QUERY,
                    variables: {
                        inputs: {
                            memberId,
                            rankType
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetGuessRankResultSchema.parse(data);

        return {
            success: true,
            data: data.getGuessRank
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetGuessProportionRequest {
    matchId: number;
    memberId: number;
}

const GuessItemSchema = z.object({
    peopleNum: z.number(),
    itemType: z.union([z.literal('selected'), z.literal('unselected'), z.literal('')])
});

const GetGuessProportionSchema = z.object({
    handicap: z.number(),
    handicapInChinese: z.string(),
    overUnder: z.number(),
    home: GuessItemSchema,
    away: GuessItemSchema,
    over: GuessItemSchema,
    under: GuessItemSchema,
    guessNum: z.number(),
    remainingGuessTimes: z.number()
});

export type GetGuessProportionResponse = z.infer<typeof GetGuessProportionSchema>;

const GetGuessProportionResultSchema = z.object({
    getGuessProportion: GetGuessProportionSchema
});

type GetGuessProportionResult = z.infer<typeof GetGuessProportionResultSchema>;

/**
 * 取得竟猜人数占比
 * - params {@link GetGuessProportionRequest}
 * - returns {@link GetGuessProportionResponse}
 */
export const getGuessProportion = async ({
    matchId,
    memberId
}: GetGuessProportionRequest): Promise<ReturnData<GetGuessProportionResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetGuessProportionResult>, unknown>(
            {
                data: {
                    query: GET_GUESS_PROPORTION_QUERY,
                    variables: {
                        matchId,
                        memberId
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetGuessProportionResultSchema.parse(data);

        return {
            success: true,
            data: data.getGuessProportion
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetMemberIndividualGuessRequest {
    memberId: number;
}

const MemberIndividualGuessRecordSchema = z.object({
    recordPeriod: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
    // 榜單類型 ( 0: 全部, 1: 週榜, 2: 月榜, 3: 季榜 )
    rank: z.number(),
    totalPlay: z.number(),
    totalPlayWin: z.number(),
    totalPlayDraw: z.number(),
    totalPlayLose: z.number(),
    handicapPlay: z.number(),
    handicapWin: z.number(),
    handicapDraw: z.number(),
    handicapLose: z.number(),
    overUnderPlay: z.number(),
    overUnderWin: z.number(),
    overUnderDraw: z.number(),
    overUnderLose: z.number()
});

export interface IndividualGuessRecordDetail {
    play: number;
    win: number;
    draw: number;
    lose: number;
}

export interface MemberIndividualGuessRecord {
    rank: number;
    summary: IndividualGuessRecordDetail;
    handicap: IndividualGuessRecordDetail;
    size: IndividualGuessRecordDetail;
}
export interface GetMemberIndividualGuessResponse {
    byWeek: MemberIndividualGuessRecord;
    byMonth: MemberIndividualGuessRecord;
    byQuarter: MemberIndividualGuessRecord;
}

const GetMemberIndividualGuessResultSchema = z.object({
    getMemberIndividualGuess: z.object({
        weekRecord: MemberIndividualGuessRecordSchema,
        monthRecord: MemberIndividualGuessRecordSchema,
        quarterRecord: MemberIndividualGuessRecordSchema
    })
});

export type GetMemberIndividualGuessResult = z.infer<typeof GetMemberIndividualGuessResultSchema>;

/**
 * 取得會員個人競猜勝、負、走統計
 * - params {@link GetMemberIndividualGuessRequest}
 * - return {@link GetMemberIndividualGuessResponse}
 * - {@link MemberIndividualGuessRecord}
 */
export const getMemberIndividualGuess = async ({
    memberId
}: GetMemberIndividualGuessRequest): Promise<ReturnData<GetMemberIndividualGuessResponse>> => {
    try {
        const { data, errors } = await fetcher<
            FetchResultData<GetMemberIndividualGuessResult>,
            unknown
        >(
            {
                data: {
                    query: GET_MEMBER_INDIVIDUAL_GUESS_QUERY,
                    variables: {
                        input: {
                            memberId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetMemberIndividualGuessResultSchema.parse(data);
        const { weekRecord, monthRecord, quarterRecord } = data.getMemberIndividualGuess;

        const formattedData = {
            byWeek: {
                rank: weekRecord.rank,
                summary: {
                    play: weekRecord.totalPlay,
                    win: weekRecord.totalPlayWin,
                    draw: weekRecord.totalPlayDraw,
                    lose: weekRecord.totalPlayLose
                },
                handicap: {
                    play: weekRecord.handicapPlay,
                    win: weekRecord.handicapWin,
                    draw: weekRecord.handicapDraw,
                    lose: weekRecord.handicapDraw
                },
                size: {
                    play: weekRecord.overUnderPlay,
                    win: weekRecord.overUnderWin,
                    draw: weekRecord.handicapDraw,
                    lose: weekRecord.handicapLose
                }
            },
            byMonth: {
                rank: monthRecord.rank,
                summary: {
                    play: monthRecord.totalPlay,
                    win: monthRecord.totalPlayWin,
                    draw: monthRecord.totalPlayDraw,
                    lose: monthRecord.totalPlayLose
                },
                handicap: {
                    play: monthRecord.handicapPlay,
                    win: monthRecord.handicapWin,
                    draw: monthRecord.handicapDraw,
                    lose: monthRecord.handicapDraw
                },
                size: {
                    play: monthRecord.overUnderPlay,
                    win: monthRecord.overUnderWin,
                    draw: monthRecord.handicapDraw,
                    lose: monthRecord.handicapLose
                }
            },
            byQuarter: {
                rank: quarterRecord.rank,
                summary: {
                    play: quarterRecord.totalPlay,
                    win: quarterRecord.totalPlayWin,
                    draw: quarterRecord.totalPlayDraw,
                    lose: quarterRecord.totalPlayLose
                },
                handicap: {
                    play: quarterRecord.handicapPlay,
                    win: quarterRecord.handicapWin,
                    draw: quarterRecord.handicapDraw,
                    lose: quarterRecord.handicapDraw
                },
                size: {
                    play: quarterRecord.overUnderPlay,
                    win: quarterRecord.overUnderWin,
                    draw: quarterRecord.handicapDraw,
                    lose: quarterRecord.handicapLose
                }
            }
        };
        return {
            success: true,
            data: formattedData
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetMemberIndividualGuessMatchesRequest {
    memberId: number;
    currentPage: number;
    pageSize: number;
    guessType: -1 | 0 | 1 | 2;
    // 競猜玩法 ( -1: 無資料 0: 全部, 1: 讓球, 2: 大小球 )
}

const MemberIndividualGuessMatchSchema = z.object({
    id: z.number(),
    matchId: z.number(),
    matchTime: z.number(),
    leagueId: z.number(),
    leagueName: z.string(),
    homeTeamName: z.string(),
    awayTeamName: z.string(),
    handicapOdds: z.number(),
    playType: z.string(),
    handicapInChinese: z.string(),
    overUnderOdds: z.number(),
    predictedPlay: PredictedPlaySchema,
    predictionResult: PredictionResultSchema,
    isPaidToRead: z.boolean(),
    unlockPrice: z.number(),
    homeScore: z.number(),
    awayScore: z.number()
});

export type MemberIndividualGuessMatch = z.infer<typeof MemberIndividualGuessMatchSchema>;

const PaginationSchema = z.object({
    pageCount: z.number(),
    totalCount: z.number()
});

export type Pagination = z.infer<typeof PaginationSchema>;

const GetMemberIndividualGuessMatchesSchema = z.object({
    guessType: z.union([z.literal(-1), z.literal(0), z.literal(1), z.literal(2)]),
    // 競猜玩法 ( 0: 全部, 1: 讓球, 2: 大小球 )
    guessMatchList: z.array(MemberIndividualGuessMatchSchema),
    pagination: PaginationSchema
});

const GetMemberIndividualGuessMatchesResultSchema = z.object({
    getMemberIndividualGuessMatches: GetMemberIndividualGuessMatchesSchema
});

type GetMemberIndividualGuessMatchesResult = z.infer<
    typeof GetMemberIndividualGuessMatchesResultSchema
>;

export type GetMemberIndividualGuessMatchesResponse = z.infer<
    typeof GetMemberIndividualGuessMatchesSchema
>;

/**
 * 推薦 - 競猜 & 我的 - 我的競猜 - 我的方案 | 取得用戶個人頁面方案資料，並判斷觀看競猜記錄是否需付費解鎖
 * - params {@link GetMemberIndividualGuessMatchesRequest}
 * - returns {@link GetMemberIndividualGuessMatchesResponse}
 * - {@link MemberIndividualGuessMatch} {@link Pagination}
 */
export const getMemberIndividualGuessMatches = async ({
    memberId,
    currentPage,
    pageSize,
    guessType
}: GetMemberIndividualGuessMatchesRequest): Promise<
    ReturnData<GetMemberIndividualGuessMatchesResponse>
> => {
    try {
        const { data, errors } = await fetcher<
            FetchResultData<GetMemberIndividualGuessMatchesResult>,
            unknown
        >(
            {
                data: {
                    query: GET_MEMBER_INDIVIDUAL_GUESS_MATCHES_QUERY,
                    variables: {
                        input: {
                            memberId,
                            currentPage,
                            pageSize,
                            guessType
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetMemberIndividualGuessMatchesResultSchema.parse(data);

        return {
            success: true,
            data: data.getMemberIndividualGuessMatches
        };
    } catch (error) {
        return handleApiError(error);
    }
};

const GetMentorIndividualGuessMatchesResultSchema = z.object({
    getMentorIndividualGuessMatches: GetMemberIndividualGuessMatchesSchema
});

type GetMentorIndividualGuessMatchesResult = z.infer<
    typeof GetMentorIndividualGuessMatchesResultSchema
>;

/**
 * 專家-取得用戶個人頁面方案資料，並判斷觀看競猜記錄是否需付費解鎖
 * - params {@link GetMemberIndividualGuessMatchesRequest}
 * - returns {@link GetMemberIndividualGuessMatchesResponse}
 * - {@link MemberIndividualGuessMatch} {@link Pagination}
 * 型別與 getMemberIndividualGuessMatches 共用
 */
export const getMentorIndividualGuessMatches = async ({
    memberId,
    currentPage,
    pageSize,
    guessType
}: GetMemberIndividualGuessMatchesRequest): Promise<
    ReturnData<GetMemberIndividualGuessMatchesResponse>
> => {
    try {
        const { data, errors } = await fetcher<
            FetchResultData<GetMentorIndividualGuessMatchesResult>,
            unknown
        >(
            {
                data: {
                    query: GET_MENTOR_INDIVIDUAL_GUESS_MATCHES_QUERY,
                    variables: {
                        input: {
                            memberId,
                            currentPage,
                            pageSize,
                            guessType
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetMentorIndividualGuessMatchesResultSchema.parse(data);

        return {
            success: true,
            data: data.getMentorIndividualGuessMatches
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetProGuessRequest {
    matchId: number;
    memberId: number;
}

const HighlightsSchema = z.object({
    id: z.number(),
    type: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
    //戰績標籤類別 0:週 1:月 2:季 3:連紅
    value: z.number()
});

const ProGuessSchema = z.object({
    guessId: z.number(),
    memberId: z.number(),
    memberName: z.string(),
    avatarPath: z.string(),
    handicapOdds: z.number(),
    handicapInChinese: z.string(),
    overUnderOdds: z.number(),
    highlights: z.array(HighlightsSchema),
    records: z.array(PredictionResultSchema),
    predictedType: z.union([z.literal('HANDICAP'), z.literal('OVERUNDER')]),
    predictedPlay: PredictedPlaySchema,
    predictionResult: PredictionResultSchema
});

const GetProGuessResultSchema = z.object({
    getProGuess: z
        .object({
            proGuess: z.array(ProGuessSchema),
            unlockPrice: z.number(),
            freeUnlockChance: z.number()
        })
        .nullable()
});

type GetProGuessResult = z.infer<typeof GetProGuessResultSchema>;

export type ProGuess = z.infer<typeof ProGuessSchema>;
export interface GetProGuessResponse {
    proGuess: ProGuess[];
    unlockPrice: number;
    freeUnlockChance: number;
}

/**
 * 取得高手方案
 * - params {@link GetProGuessRequest}
 * - returns {@link GetProGuessResponse}
 * - {@link ProGuess}
 */
export const getProGuess = async ({
    matchId,
    memberId
}: GetProGuessRequest): Promise<ReturnData<GetProGuessResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetProGuessResult>, unknown>(
            {
                data: {
                    query: GET_RRO_GUESS_QUERY,
                    variables: {
                        matchId,
                        memberId
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetProGuessResultSchema.parse(data);

        if (!data.getProGuess) {
            throw new Error('No master plan');
        }

        return {
            success: true,
            data: data.getProGuess
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetProDistribRequest {
    matchId: number;
    memberId: number;
}

const GetProDistribSchema = z.object({
    home: z.number(),
    away: z.number(),
    over: z.number(),
    under: z.number(),
    enoughProData: z.boolean(),
    memberPermission: z.boolean(),
    unlockPrice: z.number(),
    proMemberNum: z.number()
});

export type GetProDistribResponse = z.infer<typeof GetProDistribSchema>;

const GetProDistribResultSchema = z.object({
    getProDistrib: GetProDistribSchema
});

type GetProDistribResult = z.infer<typeof GetProDistribResultSchema>;

/**
 * 取得高手分佈
 * - params {@link GetProDistribRequest}
 * - returns {@link GetProDistribResponse}
 */
export const getProDistrib = async ({
    matchId,
    memberId
}: GetProDistribRequest): Promise<ReturnData<GetProDistribResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetProDistribResult>, unknown>(
            {
                data: {
                    query: GET_RRO_DISTRIB_QUERY,
                    variables: {
                        matchId,
                        memberId
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetProDistribResultSchema.parse(data);

        return {
            success: true,
            data: data.getProDistrib
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface AddGuessRequest {
    matchId: number;
    predictedPlay: PredictedPlay;
    needProDistrib?: boolean;
}

const AddGuessSchema = z.object({
    remainingGuessTimes: z.number(),
    guessNum: z.number(),
    home: z.number().optional(),
    away: z.number().optional(),
    over: z.number().optional(),
    under: z.number().optional(),
    enoughProData: z.boolean().optional(),
    proMemberNum: z.number().optional()
});

export type AddGuessResponse = z.infer<typeof AddGuessSchema>;

const AddGuessResultSchema = z.object({
    addGuess: AddGuessSchema
});

type AddGuessResult = z.infer<typeof AddGuessResultSchema>;

/**
 * 新增競猜資料
 * - params {@link AddGuessRequest}
 * - returns {@link AddGuessResponse}
 */
export const addGuess = async ({
    matchId,
    predictedPlay,
    needProDistrib
}: AddGuessRequest): Promise<ReturnData<AddGuessResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<AddGuessResult>, unknown>(
            {
                data: {
                    query: ADD_GUESS_MUTATION,
                    variables: {
                        input: {
                            matchId,
                            predictedPlay,
                            needProDistrib
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        AddGuessResultSchema.parse(data);

        return { success: true, data: data.addGuess };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface PayForProDistribRequest {
    matchId: number;
}

const PayForProDistribSchema = z.object({
    currentBalance: z.number(),
    home: z.number(),
    away: z.number(),
    over: z.number(),
    under: z.number()
});

const PayForProDistribResultSchema = z.object({
    payForProDistrib: PayForProDistribSchema
});

type PayForProDistribResult = z.infer<typeof PayForProDistribResultSchema>;
type PayForProDistribResponse = z.infer<typeof PayForProDistribSchema>;

/**
 * 高手分佈付費
 * - params : {@link PayForProDistribRequest}
 * - returns : {@link PayForProDistribResponse}
 */
export const payForProDistrib = async ({
    matchId
}: PayForProDistribRequest): Promise<ReturnData<PayForProDistribResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<PayForProDistribResult>, unknown>(
            {
                data: {
                    query: PAY_FOR_PRO_DISTRIB_MUTATION,
                    variables: { matchId }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        return { success: true, data: data.payForProDistrib };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface PayForProGuessRequest {
    guessId: number;
}

const PayForProGuessSchema = z.object({
    guessId: z.number(),
    currentBalance: z.number(),
    predictedPlay: PredictedPlaySchema
});

export type PayForProGuessResponse = z.infer<typeof PayForProGuessSchema>;

const PayForProGuessResultSchema = z.object({
    payForProGuess: PayForProGuessSchema
});

type PayForProGuessResult = z.infer<typeof PayForProGuessResultSchema>;

/**
 * 高手方案付費
 * - params {@link PayForProGuessRequest}
 * - returns {@link PayForProGuessResponse}
 */
export const payForProGuess = async ({
    guessId
}: PayForProGuessRequest): Promise<ReturnData<PayForProGuessResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<PayForProGuessResult>, unknown>(
            {
                data: {
                    query: PAY_FOR_PRO_GUESS_MUTATION,
                    variables: { guessId }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        return { success: true, data: data.payForProGuess };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface PayForPostRequest {
    postId: number;
}

const PayForPostSchema = z.object({
    code: z.union([z.literal('SUCCESS'), z.literal('FAIL')]),
    message: z.string()
});

const PayForPostResultSchema = z.object({
    payForPost: PayForPostSchema
});

type PayForPostResult = z.infer<typeof PayForPostResultSchema>;

export type PayForPostResponse = z.infer<typeof PayForPostSchema>;

/**
 * 買料
 * - params {@link PayForPostRequest}
 * - returns {@link PayForPostResponse}
 */
export const payForPost = async ({
    postId
}: PayForPostRequest): Promise<ReturnData<PayForPostResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<PayForPostResult>, unknown>(
            {
                data: {
                    query: PAY_FOR_POST_MUTATION,
                    variables: {
                        input: {
                            postId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        PayForPostResultSchema.parse(data);

        return { success: true, data: data.payForPost };
    } catch (error) {
        return handleApiError(error);
    }
};
