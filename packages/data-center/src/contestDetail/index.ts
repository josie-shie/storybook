import { fetcher, handicapToString, truncateFloatingPoint, timestampToString } from 'lib';
import { z } from 'zod';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import {
    GET_SINGLE_MATCH_QUERY,
    GET_DETAIL_STATUS_QUERY,
    GET_LIVE_TEXT_QUERY,
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
    id: z.number(),
    isHome: z.boolean(),
    kind: z.number(),
    time: z.string(),
    nameEn: z.string(),
    nameChs: z.string(),
    nameCht: z.string(),
    playerId: z.string(),
    playerId2: z.string(),
    playerOffOrAssistEn: z.string(),
    playerOffOrAssistChs: z.string(),
    playerOffOrAssistCht: z.string(),
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

type LiveTextInfo = z.infer<typeof LiveTextInfoSchema>;

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

export interface GetLiveText {
    dateTime: string;
    time: string;
    id: number;
    content: string;
    homeName: string;
    score: string;
    awayName: string;
}

const GetLiveTextResultSchema = z.object({
    getDetailStatus: z.object({
        liveText: z.array(LiveTextInfoSchema)
    })
});

export type GetLiveTextResponse = GetLiveText[];
type GetLiveTextResult = z.infer<typeof GetLiveTextResultSchema>;

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

/**
 * 取得指定賽事
 * - params : (matchId: number)
 * - returns : {@link GetSingleMatchResponse}
 */
export const getMatchDetail = async (
    matchId: number
): Promise<ReturnData<GetSingleMatchResponse>> => {
    try {
        const { data }: { data: GetSingleMatchResult } = await fetcher(
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
        const { data }: { data: GetDetailStatusResult } = await fetcher(
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
 * 取得現場賽況
 * - params : number (matchId)
 * - returns : {@link GetLiveTextResponse} {@link GetLiveText}
 */
export const getLiveText = async (matchId: number): Promise<ReturnData<GetLiveTextResponse>> => {
    function formatArray(arr: LiveTextInfo[]) {
        return arr.map(item => {
            const timeMatch = /^(?<time>\d{1,3})'/.exec(item.content);
            const contentMatch = /'(?<content>.+?)\[/.exec(item.content);
            const teamsAndScoreMatch = /\[(?<team1>.+?)(?<score>\d+:\d+)(?<team2>.+?)\]$/.exec(
                item.content
            );

            if (!timeMatch || !contentMatch || !teamsAndScoreMatch) {
                throw new Error(`Pattern does not match for item with id: ${item.id}`);
            }

            return {
                dateTime: timestampToString(item.time),
                time: timeMatch[1],
                id: item.id,
                content: contentMatch[1],
                homeName: teamsAndScoreMatch[1],
                score: teamsAndScoreMatch[2],
                awayName: teamsAndScoreMatch[3]
            };
        });
    }

    try {
        const { data }: { data: GetLiveTextResult } = await fetcher(
            {
                data: {
                    query: GET_LIVE_TEXT_QUERY,
                    variables: {
                        input: {
                            matchId
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        GetLiveTextResultSchema.parse(data);

        const liveTextList = formatArray(data.getDetailStatus.liveText);

        return {
            success: true,
            data: liveTextList
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
        const { data }: { data: OddsRunningResult } = await fetcher(
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
