import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import {
    GET_TODAY_GUESS_MATCHES_QUERY,
    GET_GUESS_RANK_QUERY,
    GET_GUESS_PROPORTION_QUERY,
    GET_MEMBER_INDIVIDUAL_GUESS_QUERY,
    GET_MEMBER_INDIVIDUAL_GUESS_MATCHES_QUERY,
    GET_RRO_GUESS_QUERY,
    GET_RRO_DISTRIB_QUERY,
    ADD_GUESS_MUTATION,
    PAY_FOR_PRO_DISTRIB_MUTATION,
    PAY_FOR_PRO_GUESS_MUTATION,
    PAY_FOR_POST_MUTATION
} from './graphqlQueries';

export interface GetTodayGuessMatchesRequest {
    memberId: number;
}

const GetTodayGuessMatchSchema = z.object({
    matchId: z.number(),
    leagueId: z.number(),
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
    state: z.number()
});

export type GetTodayGuessMatch = z.infer<typeof GetTodayGuessMatchSchema>;

export type ContestGuessInfo = Record<number, GetTodayGuessMatch>;

type ContestGuessList = number[];
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
 * - params {@link GetTodayGuessMatchesRequest}
 * - returns {@link GetTodayGuessMatchesResponse}
 * {@link ContestGuessList} {@link ContestGuessInfo}{@link GetTodayGuessMatch}
 */
export const getTodayGuessMatches = async ({
    memberId
}: GetTodayGuessMatchesRequest): Promise<ReturnData<GetTodayGuessMatchesResponse>> => {
    try {
        const { data }: { data: GetTodayGuessMatchesResult } = await fetcher(
            {
                data: {
                    query: GET_TODAY_GUESS_MATCHES_QUERY,
                    variables: {
                        memberId
                    }
                }
            },
            { cache: 'no-store' }
        );

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

const GetGuessRankSchema = z.object({
    matchId: z.number(),
    leagueId: z.number(),
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
    state: z.number()
});

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
        const { data }: { data: GetGuessRankResult } = await fetcher(
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

        GetGuessRankSchema.parse(data);

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
    itemType: z.union([z.literal('SELECTED'), z.literal('UNSELECTED'), z.literal('NONE')])
});

const GetGuessProportionSchema = z.object({
    homeLogo: z.string(),
    awayLogo: z.string(),
    home: GuessItemSchema,
    away: GuessItemSchema,
    over: GuessItemSchema,
    under: GuessItemSchema,
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
        const { data }: { data: GetGuessProportionResult } = await fetcher(
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
    recordPeriod: z.union([z.literal(0), z.literal(1), z.literal(2)]),
    // 榜單類型 ( 0: 週榜, 1: 月榜, 2: 季榜 )
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

export type MemberIndividualGuessRecord = z.infer<typeof MemberIndividualGuessRecordSchema>;
export interface GetMemberIndividualGuessResponse {
    weekRecord: MemberIndividualGuessRecord;
    monthRecord: MemberIndividualGuessRecord;
    quarterRecord: MemberIndividualGuessRecord;
}

const GetMemberIndividualGuessResultSchema = z.object({
    getMemberIndividualGuess: z.object({
        weekRecord: MemberIndividualGuessRecordSchema,
        monthRecord: MemberIndividualGuessRecordSchema,
        quarterRecord: MemberIndividualGuessRecordSchema
    })
});

type GetMemberIndividualGuessResult = z.infer<typeof GetMemberIndividualGuessResultSchema>;

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
        const { data }: { data: GetMemberIndividualGuessResult } = await fetcher(
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

        GetMemberIndividualGuessResultSchema.parse(data);

        return {
            success: true,
            data: data.getMemberIndividualGuess
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetMemberIndividualGuessMatchesRequest {
    memberId: number;
    currentPage: number;
    pageSize: number;
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
    overUnderOdds: z.number(),
    predictedPlay: z.union([
        z.literal('HOME'),
        z.literal('AWAY'),
        z.literal('OVER'),
        z.literal('UNDER'),
        z.literal('LOCK')
    ]),
    predictionResult: z.string(),
    isPaidToRead: z.boolean()
});

export type MemberIndividualGuessMatch = z.infer<typeof MemberIndividualGuessMatchSchema>;

const PaginationSchema = z.object({
    pageCount: z.number(),
    totalCount: z.number()
});

export type Pagination = z.infer<typeof PaginationSchema>;

const MemberIndividualGuessMatchListSchema = z.object({
    guessType: z.union([z.literal(0), z.literal(1), z.literal(2)]),
    // 競猜玩法 ( 0: 全部, 1: 讓球, 2: 大小球 )
    guessMatchList: z.array(MemberIndividualGuessMatchSchema),
    pagination: PaginationSchema
});

const GetMemberIndividualGuessMatchesSchema = z.object({
    all: MemberIndividualGuessMatchListSchema,
    handicap: MemberIndividualGuessMatchListSchema,
    overUnder: MemberIndividualGuessMatchListSchema
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
 * 取得用戶個人頁面方案資料，並判斷觀看競猜記錄是否需付費解鎖
 * - params {@link GetMemberIndividualGuessMatchesRequest}
 * - returns {@link GetMemberIndividualGuessMatchesResponse}
 * - {@link MemberIndividualGuessMatch} {@link Pagination}
 */
export const getMemberIndividualGuessMatches = async ({
    memberId,
    currentPage,
    pageSize
}: GetMemberIndividualGuessMatchesRequest): Promise<
    ReturnData<GetMemberIndividualGuessMatchesResponse>
> => {
    try {
        const { data }: { data: GetMemberIndividualGuessMatchesResult } = await fetcher(
            {
                data: {
                    query: GET_MEMBER_INDIVIDUAL_GUESS_MATCHES_QUERY,
                    variables: {
                        input: {
                            memberId,
                            currentPage,
                            pageSize
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetMemberIndividualGuessMatchesResultSchema.parse(data);

        return {
            success: true,
            data: data.getMemberIndividualGuessMatches
        };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface GetProGuessRequest {
    matchId: number;
    memberId: number;
}

const ProGuessSchema = z.object({
    guessId: z.number(),
    memberId: z.number(),
    memberName: z.string(),
    memberRankType: z.union([
        z.literal('WINNINGSTREAK'),
        z.literal('QUARTERLY'),
        z.literal('MONTHLY'),
        z.literal('WEEKLY')
    ]),
    memberRanking: z.number(),
    records: z.union([z.literal('WIN'), z.literal('LOSE'), z.literal('DRAW'), z.literal('NONE')]),
    predictedType: z.union([z.literal('HANDICAP'), z.literal('OVERUNDER')]),
    predictedPlay: z.union([
        z.literal('HOME'),
        z.literal('AWAY'),
        z.literal('OVER'),
        z.literal('UNDER'),
        z.literal('LOCK')
    ]),
    predictionResult: z.union([
        z.literal('WIN'),
        z.literal('LOSE'),
        z.literal('DRAW'),
        z.literal('NONE')
    ])
});

const GetProGuessResultSchema = z.object({
    getProGuess: z.array(ProGuessSchema)
});

type GetProGuessResult = z.infer<typeof GetProGuessResultSchema>;

export type ProGuess = z.infer<typeof ProGuessSchema>;
export type ProGuessResponse = ProGuess[];

/**
 * 取得高手方案
 * - params {@link GetProGuessRequest}
 * - returns {@link ProGuessResponse}
 * - {@link ProGuess}
 */
export const getProGuess = async ({
    matchId,
    memberId
}: GetProGuessRequest): Promise<ReturnData<ProGuessResponse>> => {
    try {
        const { data }: { data: GetProGuessResult } = await fetcher(
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

        GetProGuessResultSchema.parse(data);

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
    memberPermission: z.boolean()
});

export type GetProDistribResponse = z.infer<typeof GetProDistribSchema>;

const GetProDistribResultSchema = z.object({
    getProDistrib: GetProDistribSchema
});

type GetProDistribResult = z.infer<typeof GetProDistribResultSchema>;

/**
 * 取得高手分佈
 */
export const getProDistrib = async ({
    matchId,
    memberId
}: GetProDistribRequest): Promise<ReturnData<GetProDistribResponse>> => {
    try {
        const { data }: { data: GetProDistribResult } = await fetcher(
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
    predictedPlay: 'HOME' | 'AWAY' | 'OVER' | 'UNDER' | 'LOCK';
}

/**
 * 新增競猜資料
 * - params {@link AddGuessRequest}
 */
export const addGuess = async ({
    matchId,
    predictedPlay
}: AddGuessRequest): Promise<ReturnData<null>> => {
    try {
        const res: { data: null } = await fetcher(
            {
                data: {
                    query: ADD_GUESS_MUTATION,
                    variables: {
                        input: {
                            matchId,
                            predictedPlay
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        return { success: true, data: res.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface PayForProDistribRequest {
    matchId: number;
}

/**
 * 高手分佈付費
 */
export const payForProDistrib = async ({
    matchId
}: PayForProDistribRequest): Promise<ReturnData<null>> => {
    try {
        const res: { data: null } = await fetcher(
            {
                data: {
                    query: PAY_FOR_PRO_DISTRIB_MUTATION,
                    variables: { matchId }
                }
            },
            { cache: 'no-store' }
        );

        return { success: true, data: res.data };
    } catch (error) {
        return handleApiError(error);
    }
};

export interface PayForProGuessRequest {
    guessId: number;
}

/**
 * 高手方案付費
 */
export const payForProGuess = async ({
    guessId
}: PayForProGuessRequest): Promise<ReturnData<null>> => {
    try {
        const res: { data: null } = await fetcher(
            {
                data: {
                    query: PAY_FOR_PRO_GUESS_MUTATION,
                    variables: { guessId }
                }
            },
            { cache: 'no-store' }
        );

        return { success: true, data: res.data };
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
        const { data }: { data: PayForPostResult } = await fetcher(
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

        PayForPostResultSchema.parse(data);

        return { success: true, data: data.payForPost };
    } catch (error) {
        return handleApiError(error);
    }
};
