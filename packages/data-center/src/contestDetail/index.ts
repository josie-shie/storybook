import { fetcher, handicapToString, truncateFloatingPoint } from 'lib';
import { z } from 'zod';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import {
    GET_SINGLE_MATCH_QUERY,
    GET_DETAIL_STATUS_QUERY,
    GET_ODDS_RUNNING_QUERY
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
    awayLogo: z.string()
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
    matchId: z.number(),
    isHome: z.boolean(),
    kind: z.number(),
    time: z.string(),
    nameEn: z.string(),
    nameChs: z.string(),
    nameCht: z.string(),
    playerId: z.string(),
    playerId2: z.string(),
    nameEn2: z.string(),
    nameChs2: z.string(),
    nameCht2: z.string(),
    overtime: z.string()
});

export type EventInfo = z.infer<typeof EventInfoSchema>;

const LineupInfoSchema = z.object({
    nameChs: z.string(),
    nameCht: z.string(),
    nameEn: z.string(),
    number: z.string(),
    playerId: z.number(),
    positionId: z.string()
});

const LineupListSchema = z.object({
    matchId: z.number(),
    homeArray: z.string(),
    awayArray: z.string(),
    homeLineup: z.array(LineupInfoSchema),
    awayLineup: z.array(LineupInfoSchema),
    homeBackup: z.array(LineupInfoSchema),
    awayBackup: z.array(LineupInfoSchema)
});

export type LineupList = z.infer<typeof LineupListSchema>;

const TechnicMapSchema = z.union([
    z.literal('0'),
    z.literal('1'),
    z.literal('2'),
    z.literal('3'),
    z.literal('4'),
    z.literal('5'),
    z.literal('6'),
    z.literal('7'),
    z.literal('8'),
    z.literal('9'),
    z.literal('10'),
    z.literal('11'),
    z.literal('12'),
    z.literal('13'),
    z.literal('14'),
    z.literal('15'),
    z.literal('16'),
    z.literal('17'),
    z.literal('18'),
    z.literal('19'),
    z.literal('20'),
    z.literal('21'),
    z.literal('22'),
    z.literal('23'),
    z.literal('24'),
    z.literal('25'),
    z.literal('26'),
    z.literal('27'),
    z.literal('28'),
    z.literal('29'),
    z.literal('30'),
    z.literal('31'),
    z.literal('32'),
    z.literal('33'),
    z.literal('34'),
    z.literal('35'),
    z.literal('36'),
    z.literal('37'),
    z.literal('38'),
    z.literal('39'),
    z.literal('40'),
    z.literal('41'),
    z.literal('42'),
    z.literal('43'),
    z.literal('44'),
    z.literal('45'),
    z.literal('46'),
    z.literal('47')
]);

const TechnicalInfoSchema = z.object({
    away: z.string(),
    home: z.string(),
    technicType: TechnicMapSchema
});

export type TechnicalInfo = z.infer<typeof TechnicalInfoSchema>;

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
    getInformation: InformationListSchema
});

type GetInformationListResult = z.infer<typeof GetInformationListResultSchema>;

const HandicapsListSchema = z.array(
    z.object({
        company: z.array(
            z.object({
                id: z.number(),
                timePeriods: z.object({
                    inProgress: z.array(HandicapsInfoSchema),
                    notStarted: z.array(HandicapsInfoSchema)
                })
            })
        )
    })
);

const TotalGoalsListSchema = z.array(
    z.object({
        company: z.array(
            z.object({
                id: z.number(),
                timePeriods: z.object({
                    inProgress: z.array(TotalGoalsInfoSchema),
                    notStarted: z.array(TotalGoalsInfoSchema)
                })
            })
        )
    })
);

const LiveTextInfoSchema = z.object({
    id: z.number(),
    content: z.string(),
    time: z.number()
});

const DetailStatusSchema = z.object({
    handicapsFull: HandicapsListSchema,
    handicapsHalf: HandicapsListSchema,
    totalGoalsFull: TotalGoalsListSchema,
    totalGoalsHalf: TotalGoalsListSchema,
    events: z.array(EventInfoSchema),
    lineupInfo: LineupListSchema,
    technicalStatistics: z.array(TechnicalInfoSchema),
    liveText: z.array(LiveTextInfoSchema)
});

const GetDetailStatusResultSchema = z.object({
    getDetailStatus: DetailStatusSchema
});

type GetDetailStatusResult = z.infer<typeof GetDetailStatusResultSchema>;

export interface HandicapsDataType {
    half: Record<
        number,
        {
            inProgress: HandicapsInfo[];
            notStarted: HandicapsInfo[];
        }
    >;
    full: Record<
        number,
        {
            inProgress: HandicapsInfo[];
            notStarted: HandicapsInfo[];
        }
    >;
}

export interface TotalGoalsDataType {
    half: Record<
        number,
        {
            inProgress: TotalGoalsInfo[];
            notStarted: TotalGoalsInfo[];
        }
    >;
    full: Record<
        number,
        {
            inProgress: TotalGoalsInfo[];
            notStarted: TotalGoalsInfo[];
        }
    >;
}

export interface GetDetailStatusResponse {
    handicapsData: HandicapsDataType;
    totalGoalsData: TotalGoalsDataType;
    eventList: EventInfo[];
    technical: TechnicalInfo[];
    lineupInfo: LineupList;
}

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
    getLiveText: z.array(TextLiveSchema)
});

export type GetLiveTextResult = z.infer<typeof GetLiveTextResultSchema>;
export type GetLiveTextResponse = z.infer<typeof TextLiveSchema>[];

const PlayerListSchema = z.object({
    player_id: z.number(),
    name_en: z.string(),
    name_chs: z.string(),
    name_cht: z.string(),
    number: z.number(),
    position: z.number(),
    player_status: z.string(),
    position_y: z.number(),
    position_x: z.number()
});

export type PlayerList = z.infer<typeof PlayerListSchema>;

const TeamsDetailSchema = z.object({
    team_id: z.number(),
    array_format: z.string(),
    team_color: z.string(),
    coach_id: z.number(),
    coach_name_en: z.string(),
    coach_name_zh: z.string(),
    coach_name_zht: z.string(),
    coach_logo: z.string(),
    players: z.array(PlayerListSchema)
});

export type TeamsDetail = z.infer<typeof TeamsDetailSchema>;

const TeamsSchema = z.object({
    HOME: TeamsDetailSchema,
    AWAY: TeamsDetailSchema
});

export type Teams = z.infer<typeof TeamsSchema>;

const LineUpInfoSchema = z.object({
    match_id: z.number(),
    teams: TeamsSchema
});

export type GetLineUpInfoResponse = z.infer<typeof LineUpInfoSchema>;

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
 * 取得詳情賽況
 * - params : (matchId: number)
 * - returns : {@link GetDetailStatusResponse}
 */
export const getDetailStatus = async (
    matchId: number
): Promise<ReturnData<GetDetailStatusResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetDetailStatusResult>, unknown>(
            {
                data: {
                    query: GET_DETAIL_STATUS_QUERY,
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
        GetDetailStatusResultSchema.parse(data);

        const handicapsData: HandicapsDataType = {
            half: {},
            full: {}
        };

        if (data.getDetailStatus.handicapsHalf.length > 0) {
            for (const item of data.getDetailStatus.handicapsHalf[0].company) {
                handicapsData.half[item.id] = {
                    inProgress: item.timePeriods.inProgress.map(before => {
                        return {
                            ...before,
                            homeInitialOdds: truncateFloatingPoint(before.homeInitialOdds, 2),
                            awayInitialOdds: truncateFloatingPoint(before.awayInitialOdds, 2),
                            homeCurrentOdds: truncateFloatingPoint(before.homeCurrentOdds, 2),
                            awayCurrentOdds: truncateFloatingPoint(before.awayCurrentOdds, 2),
                            initialHandicap: handicapToString(before.initialHandicap),
                            currentHandicap: handicapToString(before.currentHandicap)
                        };
                    }),
                    notStarted: item.timePeriods.notStarted.map(before => {
                        return {
                            ...before,
                            homeInitialOdds: truncateFloatingPoint(before.homeInitialOdds, 2),
                            awayInitialOdds: truncateFloatingPoint(before.awayInitialOdds, 2),
                            homeCurrentOdds: truncateFloatingPoint(before.homeCurrentOdds, 2),
                            awayCurrentOdds: truncateFloatingPoint(before.awayCurrentOdds, 2),
                            initialHandicap: handicapToString(before.initialHandicap),
                            currentHandicap: handicapToString(before.currentHandicap)
                        };
                    })
                };
            }
        }
        if (data.getDetailStatus.handicapsFull.length > 0) {
            for (const item of data.getDetailStatus.handicapsFull[0].company) {
                handicapsData.full[item.id] = {
                    inProgress: item.timePeriods.inProgress.map(before => {
                        return {
                            ...before,
                            homeInitialOdds: truncateFloatingPoint(before.homeInitialOdds, 2),
                            awayInitialOdds: truncateFloatingPoint(before.awayInitialOdds, 2),
                            homeCurrentOdds: truncateFloatingPoint(before.homeCurrentOdds, 2),
                            awayCurrentOdds: truncateFloatingPoint(before.awayCurrentOdds, 2),
                            initialHandicap: handicapToString(before.initialHandicap),
                            currentHandicap: handicapToString(before.currentHandicap)
                        };
                    }),
                    notStarted: item.timePeriods.notStarted.map(before => {
                        return {
                            ...before,
                            homeInitialOdds: truncateFloatingPoint(before.homeInitialOdds, 2),
                            awayInitialOdds: truncateFloatingPoint(before.awayInitialOdds, 2),
                            homeCurrentOdds: truncateFloatingPoint(before.homeCurrentOdds, 2),
                            awayCurrentOdds: truncateFloatingPoint(before.awayCurrentOdds, 2),
                            initialHandicap: handicapToString(before.initialHandicap),
                            currentHandicap: handicapToString(before.currentHandicap)
                        };
                    })
                };
            }
        }

        const totalGoalsData: TotalGoalsDataType = {
            half: {},
            full: {}
        };

        if (data.getDetailStatus.totalGoalsHalf.length > 0) {
            for (const item of data.getDetailStatus.totalGoalsHalf[0].company) {
                totalGoalsData.half[item.id] = {
                    inProgress: item.timePeriods.inProgress.map(before => {
                        return {
                            ...before,
                            initialHandicap: handicapToString(before.initialHandicap),
                            currentHandicap: handicapToString(before.currentHandicap),
                            overInitialOdds: truncateFloatingPoint(before.overInitialOdds, 2),
                            underInitialOdds: truncateFloatingPoint(before.underInitialOdds, 2),
                            overCurrentOdds: truncateFloatingPoint(before.overCurrentOdds, 2),
                            underCurrentOdds: truncateFloatingPoint(before.underCurrentOdds, 2)
                        };
                    }),
                    notStarted: item.timePeriods.notStarted.map(before => {
                        return {
                            ...before,
                            initialHandicap: handicapToString(before.initialHandicap),
                            currentHandicap: handicapToString(before.currentHandicap),
                            overInitialOdds: truncateFloatingPoint(before.overInitialOdds, 2),
                            underInitialOdds: truncateFloatingPoint(before.underInitialOdds, 2),
                            overCurrentOdds: truncateFloatingPoint(before.overCurrentOdds, 2),
                            underCurrentOdds: truncateFloatingPoint(before.underCurrentOdds, 2)
                        };
                    })
                };
            }
        }
        if (data.getDetailStatus.totalGoalsFull.length > 0) {
            for (const item of data.getDetailStatus.totalGoalsFull[0].company) {
                totalGoalsData.full[item.id] = {
                    inProgress: item.timePeriods.inProgress.map(before => {
                        return {
                            ...before,
                            initialHandicap: handicapToString(before.initialHandicap),
                            currentHandicap: handicapToString(before.currentHandicap),
                            overInitialOdds: truncateFloatingPoint(before.overInitialOdds, 2),
                            underInitialOdds: truncateFloatingPoint(before.underInitialOdds, 2),
                            overCurrentOdds: truncateFloatingPoint(before.overCurrentOdds, 2),
                            underCurrentOdds: truncateFloatingPoint(before.underCurrentOdds, 2)
                        };
                    }),
                    notStarted: item.timePeriods.notStarted.map(before => {
                        return {
                            ...before,
                            initialHandicap: handicapToString(before.initialHandicap),
                            currentHandicap: handicapToString(before.currentHandicap),
                            overInitialOdds: truncateFloatingPoint(before.overInitialOdds, 2),
                            underInitialOdds: truncateFloatingPoint(before.underInitialOdds, 2),
                            overCurrentOdds: truncateFloatingPoint(before.overCurrentOdds, 2),
                            underCurrentOdds: truncateFloatingPoint(before.underCurrentOdds, 2)
                        };
                    })
                };
            }
        }

        const technical = data.getDetailStatus.technicalStatistics;
        const lineupInfo = data.getDetailStatus.lineupInfo;
        const eventList = data.getDetailStatus.events;

        return {
            success: true,
            data: {
                handicapsData,
                totalGoalsData,
                eventList,
                technical,
                lineupInfo
            }
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
                    query: GET_ODDS_RUNNING_QUERY,
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

        return {
            success: true,
            data: data.getInformation
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
                    query: GET_ODDS_RUNNING_QUERY,
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

        return {
            success: true,
            data: data.getLiveText
        };
    } catch (error) {
        return handleApiError(error);
    }
};
