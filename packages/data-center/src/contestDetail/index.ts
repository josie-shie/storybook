import { fetcher } from 'lib'; // handicapToString, truncateFatingPoint
import { z } from 'zod';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import {
    GET_SINGLE_MATCH_QUERY,
    GET_ODDS_RUNNING_QUERY,
    GET_TEXT_LIVE_QUERY,
    GET_LINE_UP_QUERY,
    GET_EVENT_DATA_QUERY,
    GET_INTELLIGENCE_QUERY
} from './graphqlQueries';

const SingleMatchSchema = z.object({
    matchId: z.number(),
    color: z.string(),
    kind: z.number(),
    leagueId: z.number(),
    leagueEn: z.string(),
    leagueEnShort: z.string(),
    leagueChsShort: z.string(),
    leagueChtShort: z.string(),
    subLeagueId: z.string(),
    subLeagueEn: z.string(),
    subLeagueChs: z.string(),
    subLeagueCht: z.string(),
    matchTime: z.number(),
    startTime: z.number(),
    halfStartTime: z.number(),
    homeEn: z.string(),
    homeChs: z.string(),
    homeCht: z.string(),
    awayEn: z.string(),
    awayChs: z.string(),
    awayCht: z.string(),
    homeId: z.number(),
    awayId: z.number(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    homeHalfScore: z.number(),
    awayHalfScore: z.number(),
    homeRed: z.number(),
    awayRed: z.number(),
    homeYellow: z.number(),
    awayYellow: z.number(),
    homeCorner: z.number(),
    awayCorner: z.number(),
    homeRankEn: z.string(),
    homeRankCn: z.string(),
    awayRankEn: z.string(),
    awayRankCn: z.string(),
    isNeutral: z.boolean(),
    hasLineup: z.string(),
    season: z.string(),
    groupId: z.number(),
    roundEn: z.string(),
    roundCn: z.string(),
    grouping: z.string(),
    locationEn: z.string(),
    locationCn: z.string(),
    weatherEn: z.string(),
    weatherCn: z.string(),
    temp: z.string(),
    explainEn: z.string(),
    explainCn: z.string(),
    extraExplain: z.string(),
    isHidden: z.boolean(),
    injuryTime: z.string(),
    homeLogo: z.string(),
    awayLogo: z.string(),
    countryCn: z.string(),
    handicapClosed: z.boolean(),
    handicapCurrent: z.number(),
    handicapHomeCurrentOdds: z.number(),
    handicapAwayCurrentOdds: z.number(),
    overUnderClosed: z.boolean(),
    overUnderCurrent: z.number(),
    overUnderOverCurrentOdds: z.number(),
    overUnderUnderCurrentOdds: z.number(),
    status: z.number(),
    hasAnimation: z.boolean(),
    leagueLevel: z.number(),
    mobileLiveUrl: z.string(),
    pcLiveUrl: z.string()
});

const GetSingleMatchResultSchema = z.object({
    getSingleMatch: SingleMatchSchema
});

type GetSingleMatchResult = z.infer<typeof GetSingleMatchResultSchema>;

export type GetSingleMatchResponse = z.infer<typeof SingleMatchSchema>;

const HandicapsInfoSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialHandicap: z.number(),
    homeInitialOdds: z.number(),
    awayInitialOdds: z.number(),
    currentHandicap: z.number(),
    homeCurrentOdds: z.number(),
    awayCurrentOdds: z.number(),
    oddsChangeTime: z.number(),
    oddsType: z.number(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    isClosed: z.boolean()
});

type OriginHandicapsInfo = z.infer<typeof HandicapsInfoSchema>;
export type HandicapsInfo = Omit<
    OriginHandicapsInfo,
    | 'initialHandicap'
    | 'currentHandicap'
    | 'homeInitialOdds'
    | 'awayInitialOdds'
    | 'homeCurrentOdds'
    | 'awayCurrentOdds'
> & {
    homeInitialOdds: number;
    awayInitialOdds: number;
    homeCurrentOdds: number;
    awayCurrentOdds: number;
    initialHandicap: string;
    currentHandicap: string;
};

const TotalGoalsInfoSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialHandicap: z.number(),
    overInitialOdds: z.number(),
    underInitialOdds: z.number(),
    currentHandicap: z.number(),
    overCurrentOdds: z.number(),
    underCurrentOdds: z.number(),
    oddsChangeTime: z.number(),
    oddsType: z.number(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    isClosed: z.boolean()
});

type OriginTotalGoalsInfo = z.infer<typeof TotalGoalsInfoSchema>;
export type TotalGoalsInfo = Omit<
    OriginTotalGoalsInfo,
    | 'overInitialOdds'
    | 'underInitialOdds'
    | 'overCurrentOdds'
    | 'underCurrentOdds'
    | 'initialHandicap'
    | 'currentHandicap'
> & {
    overInitialOdds: number;
    underInitialOdds: number;
    overCurrentOdds: number;
    underCurrentOdds: number;
    initialHandicap: string;
    currentHandicap: string;
};

const WinDrawLoseTypeSchema = z.object({
    matchId: z.number(),
    companyId: z.number(),
    initialHomeOdds: z.number(),
    initialDrawOdds: z.number(),
    initialAwayOdds: z.number(),
    currentHomeOdds: z.number(),
    currentDrawOdds: z.number(),
    currentAwayOdds: z.number(),
    oddsChangeTime: z.number(),
    oddsType: z.number(),
    state: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    isClosed: z.boolean()
});

export type WinDrawLoseType = z.infer<typeof WinDrawLoseTypeSchema>;

const EventInfoSchema = z.object({
    id: z.number().optional(),
    matchId: z.number(),
    isHome: z.boolean(),
    kind: z.number(),
    kindName: z.string().optional(),
    time: z.string(),
    nameEn: z.string().optional(),
    nameChs: z.string(),
    nameCht: z.string().optional(),
    playerId: z.string(),
    playerId2: z.string(),
    nameEn2: z.string().optional(),
    nameChs2: z.string(),
    nameCht2: z.string().optional(),
    overtime: z.string()
});

export type EventInfo = z.infer<typeof EventInfoSchema>;

const GetEventDataResultSchema = z.object({
    soccerLive: z.object({
        getEventData: z.object({
            eventData: z.array(EventInfoSchema)
        })
    })
});

type GetEventDataResult = z.infer<typeof GetEventDataResultSchema>;

export type GetEventDataResponse = z.infer<typeof EventInfoSchema>[];

const InformationInfoSchema = z.object({
    content: z.string(),
    importance: z.number()
});

const InformationListSchema = z.object({
    good: z.object({
        home: z.array(InformationInfoSchema),
        away: z.array(InformationInfoSchema)
    }),
    bad: z.object({
        home: z.array(InformationInfoSchema),
        away: z.array(InformationInfoSchema)
    }),
    neutral: z.array(InformationInfoSchema)
});

export type GetInformationResponse = z.infer<typeof InformationListSchema>;

const GetInformationListResultSchema = z.object({
    news: z.object({
        getIntelligence: InformationListSchema
    })
});

type GetInformationListResult = z.infer<typeof GetInformationListResultSchema>;

const OddsRunningSchema = z.object({
    matchId: z.number(),
    runningTime: z.string(),
    homeScore: z.number(),
    awayScore: z.number(),
    playType: z.union([z.literal('HANDICAP'), z.literal('OVERUNDER'), z.literal('EUROPE')]),
    companyId: z.number(),
    isClosed: z.boolean(),
    handicap: z.number(),
    homeOrOverOdds: z.number(),
    awayOrUnderOdds: z.number(),
    evenOdds: z.number(),
    oddsChangeTime: z.number()
});

export type OddsRunningType = z.infer<typeof OddsRunningSchema>;

const OddsRunningResultSchema = z.object({
    getOddsRunning: z.object({
        companyId: z.number(),
        oddsRunning: z.array(OddsRunningSchema),
        oddsPrematch: z.array(OddsRunningSchema)
    })
});

export type OddsRunningResult = z.infer<typeof OddsRunningResultSchema>;
export type OddsRunningResponse = z.infer<typeof OddsRunningSchema>[];
export type RequestPlayType =
    | 'HANDICAP'
    | 'OVERUNDER'
    | 'EUROPE'
    | 'HANDICAPHALF'
    | 'OVERUNDERHALF'
    | 'EUROPEHALF';

const TextLiveSchema = z.object({
    main: z.number().optional(),
    type: z.number().optional(),
    position: z.number(),
    time: z.string(),
    data: z.string()
});

const GetLiveTextResultSchema = z.object({
    soccerLive: z.object({
        getTextLive: z.object({
            textLive: z.string()
        })
    })
});

export type GetLiveTextResult = z.infer<typeof GetLiveTextResultSchema>;

export type GetLiveTextResponse = z.infer<typeof TextLiveSchema>[];

const PlayerListSchema = z.object({
    playerId: z.number(),
    nameEn: z.string(),
    nameChs: z.string(),
    nameCht: z.string(),
    number: z.number(),
    position: z.number(),
    playerStatus: z.string(),
    positionY: z.number(),
    positionX: z.number(),
    playerLogo: z.string(),
    isCaptain: z.number()
});

export type PlayerList = z.infer<typeof PlayerListSchema>;

const TeamsDetailSchema = z.object({
    teamId: z.number(),
    arrayFormat: z.string(),
    winRate: z.number(),
    teamColor: z.string(),
    coachId: z.number(),
    coachNameEn: z.string(),
    coachNameZh: z.string(),
    coachNameZht: z.string(),
    coachLogo: z.string(),
    players: z.array(PlayerListSchema)
});

export type TeamsDetail = z.infer<typeof TeamsDetailSchema>;

const TeamsSchema = z.object({
    venueId: z.number(),
    venueEn: z.string(),
    venueZh: z.string(),
    home: TeamsDetailSchema,
    away: TeamsDetailSchema
});

export type Teams = z.infer<typeof TeamsSchema>;

const LineUpInfoSchema = z.object({
    matchId: z.number(),
    teams: TeamsSchema
});

export type GetLineUpInfoResponse = z.infer<typeof LineUpInfoSchema>;

const GetLineUpInfohResultSchema = z.object({
    soccerLineup: z.object({
        getLineup: LineUpInfoSchema
    })
});

type GetLineUpInfoResult = z.infer<typeof GetLineUpInfohResultSchema>;

/**
 * 取得指定賽事
 * - params : (matchId: number)
 * - returns : {@link GetSingleMatchResponse}
 */
export const getMatchDetail = async (
    matchId: number
): Promise<ReturnData<GetSingleMatchResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetSingleMatchResult>, unknown>(
            {
                data: {
                    query: GET_SINGLE_MATCH_QUERY,
                    variables: {
                        input: {
                            matchId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetSingleMatchResultSchema.parse(data);

        const formatDateTime: GetSingleMatchResponse = {
            ...data.getSingleMatch,
            startTime: data.getSingleMatch.startTime || data.getSingleMatch.matchTime
        };

        return {
            success: true,
            data: formatDateTime
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得公司賠率現場數據
 * - params : (matchId: number, companyId: number)
 * - returns : {@link OddsRunningResponse}
 */
export const getOddsRunning = async (
    matchId: number,
    companyId: number,
    playType: RequestPlayType
): Promise<ReturnData<OddsRunningResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<OddsRunningResult>, unknown>(
            {
                data: {
                    query: GET_ODDS_RUNNING_QUERY,
                    variables: {
                        input: {
                            matchId,
                            companyId,
                            playType
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        OddsRunningResultSchema.parse(data);

        const oddsList = [...data.getOddsRunning.oddsRunning, ...data.getOddsRunning.oddsPrematch];

        return {
            success: true,
            data: oddsList
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得指定賽事情報
 * - params : (matchId: number)
 * - returns : {@link GetInformationResponse}
 */
export const getInformation = async (
    matchId: number
): Promise<ReturnData<GetInformationResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetInformationListResult>, unknown>(
            {
                data: {
                    query: GET_INTELLIGENCE_QUERY,
                    variables: {
                        matchId
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        return {
            success: true,
            data: data.news.getIntelligence
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得指定賽事文字直播
 * - params : (matchId: number)
 * - returns : {@link GetLiveTextResponse}
 */
export const getLiveText = async (matchId: number): Promise<ReturnData<GetLiveTextResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetLiveTextResult>, unknown>(
            {
                data: {
                    query: GET_TEXT_LIVE_QUERY,
                    variables: {
                        matchId
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        const res = JSON.parse(data.soccerLive.getTextLive.textLive) as GetLiveTextResponse;
        return {
            success: true,
            data: res
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得指定賽事陣容
 * - params : (matchId: number)
 * - returns : {@link GetLineUpInfoResponse}
 */
export const getLineup = async (matchId: number): Promise<ReturnData<GetLineUpInfoResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetLineUpInfoResult>, unknown>(
            {
                data: {
                    query: GET_LINE_UP_QUERY,
                    variables: {
                        matchId
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        return {
            success: true,
            data: data.soccerLineup.getLineup
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得指定賽事重要事件
 * - params : (matchId: number)
 * - returns : {@link GetEventDataResponse}
 */
export const getEventData = async (matchId: number): Promise<ReturnData<GetEventDataResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetEventDataResult>, unknown>(
            {
                data: {
                    query: GET_EVENT_DATA_QUERY,
                    variables: {
                        matchId
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        const res = data.soccerLive.getEventData.eventData;
        return {
            success: true,
            data: res
        };
    } catch (error) {
        return handleApiError(error);
    }
};
