import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import {
    GET_HOT_MATCH_QUERY,
    GET_LEISU_NEWS_LIST_QUERY,
    GET_LEISU_NEWS_CONTENT_QUERY,
    GET_HOME_PAGE_BANNER_QUERY
} from './graphqlQueries';

const MatchSchema = z.object({
    matchId: z.number(),
    startTime: z.number(),
    state: z.number(),
    homeChs: z.string(),
    homeLogo: z.string(),
    awayChs: z.string(),
    awayLogo: z.string(),
    homeScore: z.number(),
    awayScore: z.number(),
    roundCn: z.string()
});

export type MatchProps = z.infer<typeof MatchSchema>;
export type MatchListProps = MatchProps[];

const LeagueSchema = z.object({
    leagueChsShort: z.string(),
    list: z.array(MatchSchema)
});

export type LeagueProps = z.infer<typeof LeagueSchema>;

const GetHotMatchResponseSchema = z.record(z.number(), LeagueSchema);

const GetHotMatchSchema = z.object({
    matchId: z.number(),
    leagueId: z.number(),
    leagueChsShort: z.string(),
    startTime: z.number(),
    homeChs: z.string(),
    awayChs: z.string(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    roundCn: z.string(),
    homeLogo: z.string(),
    awayLogo: z.string()
});

export type GetHotMatchListResponse = z.infer<typeof GetHotMatchResponseSchema>;

const GetHotMatchResultSchema = z.object({
    getHotMatch: z.object({
        match: z.array(GetHotMatchSchema)
    })
});

type GetHotMatchResult = z.infer<typeof GetHotMatchResultSchema>;

export interface GetHotMatchListRequest {
    dateTime: number;
}

const GetLeisuNewsSchema = z.object({
    id: z.number(),
    title: z.string(),
    imagePath: z.string(),
    publishedAt: z.number()
});

const GetLeisuNewsListResultSchema = z.object({
    getLeisuNewsList: z.object({
        list: z.array(GetLeisuNewsSchema)
    })
});

type GetLeisuNewsListResult = z.infer<typeof GetLeisuNewsListResultSchema>;

export type GetLeisuNews = z.infer<typeof GetLeisuNewsSchema>;

export type GetLeisuNewsListResponse = GetLeisuNews[];

export interface GetLeisuNewsContentRequest {
    id: number;
}

const GetLeisuNewsContentSchema = z.object({
    id: z.number(),
    sportsType: z.union([z.literal('soccer'), z.literal('basketball')]),
    url: z.string(),
    title: z.string(),
    category: z.string(),
    content: z.string(),
    imagePath: z.string(),
    publishedAt: z.number()
});

export type GetLeisuNewsContentResponse = z.infer<typeof GetLeisuNewsContentSchema>;

const GetLeisuNewsContentResultSchema = z.object({
    getLeisuNewsContent: GetLeisuNewsContentSchema
});

type GetLeisuNewsContentResult = z.infer<typeof GetLeisuNewsContentResultSchema>;

export interface GetHomepageBannerRequest {
    dateTime: number;
}

const GetHomepageBannerMatchSchema = z.object({
    matchId: z.number(),
    leagueId: z.number(),
    leagueChsShort: z.string(),
    startTime: z.number(),
    homeChs: z.string(),
    awayChs: z.string(),
    homeScore: z.number(),
    awayScore: z.number(),
    roundCn: z.string(),
    homeLogo: z.string(),
    awayLogo: z.string()
});

export type GetHomepageBannerMatch = z.infer<typeof GetHomepageBannerMatchSchema>;
export type GetHomepageBannerBanner = z.infer<typeof GetHomepageBannerBannerSchema>;

const GetHomepageBannerBannerSchema = z.object({
    title: z.string(),
    imgPath: z.string(),
    link: z.string()
});

const GetHomepageBannerResultSchema = z.object({
    getHomepageBanner: z.object({
        matchs: z.array(GetHomepageBannerMatchSchema),
        banners: z.array(GetHomepageBannerBannerSchema)
    })
});

export type GetHomepageBannerResult = z.infer<typeof GetHomepageBannerResultSchema>;

export interface GetHomepageBannerResponse {
    matchs: GetHomepageBannerMatch[];
    banners: GetHomepageBannerBanner[];
}

const formatToGetHotMatchResponse = (data: GetHotMatchResult) => {
    const leagueMap: GetHotMatchListResponse = {};

    data.getHotMatch.match.forEach(match => {
        const leagueId = match.leagueId;
        if (!leagueMap[leagueId] as boolean) {
            leagueMap[leagueId] = {
                leagueChsShort: match.leagueChsShort,
                list: []
            };
        }

        leagueMap[leagueId].list.push({
            matchId: match.matchId,
            startTime: match.startTime,
            state: match.state,
            homeChs: match.homeChs,
            homeLogo: match.homeLogo,
            awayChs: match.awayChs,
            awayLogo: match.awayLogo,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            roundCn: match.roundCn
        });
    });

    return leagueMap;
};

/**
 * 取得首頁熱門賽事
 * - params : {@link GetHotMatchListRequest}
 * - returns : {@link GetHotMatchListResponse}
 * - {@link GetHotMatch}
 */

export const getHotMatchList = async ({
    dateTime
}: GetHotMatchListRequest): Promise<ReturnData<GetHotMatchListResponse>> => {
    try {
        const { data }: { data: GetHotMatchResult } = await fetcher(
            {
                data: {
                    query: GET_HOT_MATCH_QUERY,
                    variables: {
                        input: {
                            dateTime
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetHotMatchResultSchema.parse(data);
        const formattedData = formatToGetHotMatchResponse(data);

        return {
            success: true,
            data: formattedData
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得雷速新聞資訊列表
 * - params : {@link GetLeisuNewsContentRequest}
 * - returns : {@link GetLeisuNewsListResponse}
 */
export const getLeisuNewsList = async (): Promise<ReturnData<GetLeisuNewsListResponse>> => {
    try {
        const { data }: { data: GetLeisuNewsListResult } = await fetcher(
            {
                data: {
                    query: GET_LEISU_NEWS_LIST_QUERY
                }
            },
            { cache: 'no-store' }
        );

        GetLeisuNewsListResultSchema.parse(data);

        return {
            success: true,
            data: data.getLeisuNewsList.list
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得雷速新聞資訊內容
 * - params : {@link GetLeisuNewsContentRequest}
 * - returns : {@link GetLeisuNewsContentResponse}
 * - {@link GetHomepageBannerMatch} {@link GetHomepageBannerMatch}
 */
export const getLeisuNewsContent = async ({
    id
}: GetLeisuNewsContentRequest): Promise<ReturnData<GetLeisuNewsContentResponse>> => {
    try {
        const { data }: { data: GetLeisuNewsContentResult } = await fetcher(
            {
                data: {
                    query: GET_LEISU_NEWS_CONTENT_QUERY,
                    variables: {
                        input: {
                            id
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetLeisuNewsContentResultSchema.parse(data);

        return {
            success: true,
            data: data.getLeisuNewsContent
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得首頁橫幅
 * - params : {@link GetHomepageBannerRequest}
 * - returns : {@link GetHomepageBannerResponse}
 * - {@link GetHomepageBannerMatch} {@link  GetHomepageBannerBanner}
 */
export const getHomepageBanner = async ({
    dateTime
}: GetHomepageBannerRequest): Promise<ReturnData<GetHomepageBannerResponse>> => {
    try {
        const { data }: { data: GetHomepageBannerResult } = await fetcher(
            {
                data: {
                    query: GET_HOME_PAGE_BANNER_QUERY,
                    variables: {
                        input: {
                            dateTime
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetHomepageBannerResultSchema.parse(data);

        return {
            success: true,
            data: data.getHomepageBanner
        };
    } catch (error) {
        return handleApiError(error);
    }
};
