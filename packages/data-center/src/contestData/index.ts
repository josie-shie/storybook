import { fetcher, overUnderResult, victoryMinusResult, handicapResult } from 'lib';
import { z } from 'zod';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import {
    GET_RECENT_MATCH_QUERY,
    GET_MATCH_ID_QUERY,
    GET_RECENT_MATCH_SCHEDULE_QUERY,
    GET_HALF_FULL_WIN_COUNTS_QUERY,
    GET_RECENT_BATTLE_MATCH_QUERY,
    GET_RECENT_MATCH_COMPARE_QUERY,
    GET_BATTLE_MATCH_COMPARE_QUERY
} from './graphqlQueries';

const SingleMatchIdSchema = z.object({
    matchId: z.number(),
    homeId: z.number(),
    awayId: z.number()
});

const GetSingleMatchIdResultSchema = z.object({
    getSingleMatch: SingleMatchIdSchema
});

export type GetSingleMatchIdResult = z.infer<typeof GetSingleMatchIdResultSchema>;

export type GetSingleMatchIdResponse = z.infer<typeof SingleMatchIdSchema>;

const RecentMatchDashboardInfoSchema = z.object({
    goalMissRate: z.object({
        goal: z.number(),
        miss: z.number()
    }),
    victoryMinusRate: z.object({
        victory: z.number(),
        minus: z.number(),
        tie: z.number()
    }),
    winLoseRate: z.object({
        win: z.number(),
        lose: z.number(),
        go: z.number()
    }),
    bigSmallRate: z.object({
        big: z.number(),
        small: z.number(),
        go: z.number()
    })
});

export type RecentMatchDashboardInfo = z.infer<typeof RecentMatchDashboardInfoSchema>;

const RecentMatchDashboardSchema = z.object({
    home: RecentMatchDashboardInfoSchema,
    away: RecentMatchDashboardInfoSchema
});

const RecentBattleMatchSchema = z.object({
    matchId: z.number(),
    leagueId: z.number(),
    leagueEn: z.string(),
    leagueChs: z.string(),
    leagueCht: z.string(),
    matchTime: z.number(),
    homeEn: z.string(),
    homeChs: z.string(),
    homeCht: z.string(),
    awayEn: z.string(),
    awayChs: z.string(),
    awayCht: z.string(),
    homeId: z.number(),
    awayId: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    homeHalfScore: z.number(),
    awayHalfScore: z.number(),
    homeRed: z.number(),
    awayRed: z.number(),
    homeCorner: z.number(),
    awayCorner: z.number(),
    handicapCurrent: z.number(),
    handicapHomeCurrentOdds: z.number(),
    handicapAwayCurrentOdds: z.number(),
    overUnderCurrent: z.number(),
    overUnderOverCurrentOdds: z.number(),
    overUnderUnderCurrentOdds: z.number(),
    status: z.number(),
    hasAnimation: z.boolean(),
    leagueLevel: z.number(),
    matchResult: z.string().optional(),
    handicapResult: z.string().optional(),
    overUnderResult: z.string().optional()
});

const GetRecentBattleMatchResultSchema = z.object({
    soccerData: z.object({
        getRecentBattleMatch: z.object({
            list: z.array(RecentBattleMatchSchema).or(z.null())
        })
    })
});

const GetRecentBattleMatchResponseSchema = z.object({
    matchList: z.array(RecentBattleMatchSchema),
    dashboard: RecentMatchDashboardInfoSchema
});

export type GetRecentBattleMatchResult = z.infer<typeof GetRecentBattleMatchResultSchema>;

export type GetRecentBattleMatchResponse = z.infer<typeof GetRecentBattleMatchResponseSchema>;

const RecentMatchSchema = z.object({
    matchId: z.number(),
    leagueId: z.number(),
    leagueEn: z.string(),
    leagueChs: z.string(),
    leagueCht: z.string(),
    matchTime: z.number(),
    homeEn: z.string(),
    homeChs: z.string(),
    homeCht: z.string(),
    awayEn: z.string(),
    awayChs: z.string(),
    awayCht: z.string(),
    homeId: z.number(),
    awayId: z.number(),
    homeScore: z.number(),
    awayScore: z.number(),
    homeHalfScore: z.number(),
    awayHalfScore: z.number(),
    homeRed: z.number(),
    awayRed: z.number(),
    homeCorner: z.number(),
    awayCorner: z.number(),
    handicapCurrent: z.number(),
    handicapHomeCurrentOdds: z.number(),
    handicapAwayCurrentOdds: z.number(),
    overUnderCurrent: z.number(),
    overUnderOverCurrentOdds: z.number(),
    overUnderUnderCurrentOdds: z.number(),
    status: z.number(),
    hasAnimation: z.boolean(),
    leagueLevel: z.number(),
    matchResult: z.string().optional(),
    handicapResult: z.string().optional(),
    overUnderResult: z.string().optional()
});

export type RecentMatch = z.infer<typeof RecentMatchSchema>;

const GetRecentMatchResultSchema = z.object({
    soccerData: z.object({
        getRecentMatch: z.object({
            home: z.array(RecentMatchSchema),
            away: z.array(RecentMatchSchema)
        })
    })
});

type GetRecentMatchResult = z.infer<typeof GetRecentMatchResultSchema>;

export type RecentMatchDashboard = z.infer<typeof RecentMatchDashboardSchema>;

const GetRecentMatchResponseSchema = z.object({
    homeMatch: z.array(RecentMatchSchema),
    awayMatch: z.array(RecentMatchSchema),
    dashboard: RecentMatchDashboardSchema
});

export type GetRecentMatchResponse = z.infer<typeof GetRecentMatchResponseSchema>;

const MatchScheduleInfoSchema = z.object({
    matchId: z.number(),
    leagueId: z.number(),
    leagueEn: z.string(),
    leagueChs: z.string(),
    leagueCht: z.string(),
    matchTime: z.number(),
    status: z.number(),
    homeEn: z.string(),
    homeChs: z.string(),
    homeCht: z.string(),
    awayEn: z.string(),
    awayChs: z.string(),
    awayCht: z.string(),
    homeId: z.number(),
    awayId: z.number(),
    homeScore: z.number(),
    awayScore: z.number()
});

export type MatchScheduleInfo = z.infer<typeof MatchScheduleInfoSchema>;

const MatchScheduleSchema = z.object({
    home: z.array(MatchScheduleInfoSchema),
    away: z.array(MatchScheduleInfoSchema)
});

const GetRecentMatchScheduleResultSchema = z.object({
    soccerData: z.object({
        getRecentMatchSchedule: MatchScheduleSchema
    })
});

export type GetRecentMatchScheduleResult = z.infer<typeof GetRecentMatchScheduleResultSchema>;

export type GetRecentMatchScheduleResponse = z.infer<typeof MatchScheduleSchema>;

type TeamType = 'home' | 'away';
type FieldType = 'homeField' | 'awayField' | 'allField';

const HalfFullWinCountsInfoSchema = z.object({
    victoryVictory: z.number(),
    victoryDraw: z.number(),
    victoryDefeat: z.number(),
    drawVictory: z.number(),
    drawDraw: z.number(),
    drawDefeat: z.number(),
    defeatVictory: z.number(),
    defeatDraw: z.number(),
    defeatDefeat: z.number()
});

const HalfFullWinCountsTeamSchema = z.object({
    homeField: HalfFullWinCountsInfoSchema,
    awayField: HalfFullWinCountsInfoSchema,
    allField: HalfFullWinCountsInfoSchema
});

const HalfFullWinCountsSchema = z.object({
    home: HalfFullWinCountsTeamSchema,
    away: HalfFullWinCountsTeamSchema
});

export type HalfFullWinCounts = z.infer<typeof HalfFullWinCountsSchema>;

const HalfFullWinCountsTotalSchema = z.object({
    home: z.object({
        homeField: z.number(),
        awayField: z.number(),
        allField: z.number()
    }),
    away: z.object({
        homeField: z.number(),
        awayField: z.number(),
        allField: z.number()
    })
});

export type HalfFullWinCountsTotal = z.infer<typeof HalfFullWinCountsTotalSchema>;

const GetHalfFullWinCountsResultSchema = z.object({
    soccerData: z.object({
        getHalfFullWinCounts: z.object({
            home: HalfFullWinCountsTeamSchema,
            away: HalfFullWinCountsTeamSchema
        })
    })
});

export type GetHalfFullWinCountsResult = z.infer<typeof GetHalfFullWinCountsResultSchema>;

const GetHalfFullWinCountsResponseSchema = z.object({
    data: HalfFullWinCountsSchema,
    total: HalfFullWinCountsTotalSchema
});

export type GetHalfFullWinCountsResponse = z.infer<typeof GetHalfFullWinCountsResponseSchema>;

const RecentMatchCompareInfoSchema = z.object({
    matchCount: z.number(),
    handicapWinRate: z.number(),
    overUnderWinRate: z.number(),
    handicapWin: z.number(),
    handicapLose: z.number(),
    handicapDraw: z.number(),
    overUnderWin: z.number(),
    overUnderLose: z.number(),
    overUnderDraw: z.number(),
    handicapTrend: z.string(),
    overUnderTrend: z.string(),
    matchTrend: z.string(),
    winRate: z.number(),
    goal: z.number(),
    goalAgainst: z.number()
});

const RecentMatchCompareListSchema = z.object({
    home: RecentMatchCompareInfoSchema,
    away: RecentMatchCompareInfoSchema
});

const GetRecentMatchCompareResultSchema = z.object({
    soccerData: z.object({
        getRecentMatchCompare: RecentMatchCompareListSchema
    })
});

export type GetRecentMatchCompareResult = z.infer<typeof GetRecentMatchCompareResultSchema>;

export type GetRecentMatchCompareResponse = z.infer<typeof RecentMatchCompareListSchema>;

const TeamBattleComparedSchema = z.object({
    id: z.number(),
    winRate: z.number(),
    win: z.number(),
    draw: z.number(),
    lose: z.number(),
    goal: z.number(),
    goalAgainst: z.number()
});

const MatchBattleComparedInfoSchema = z.object({
    matchCount: z.number(),
    handicapWinRate: z.number(),
    overUnderWinRate: z.number(),
    handicapWin: z.number(),
    handicapLose: z.number(),
    handicapDraw: z.number(),
    overUnderWin: z.number(),
    overUnderLose: z.number(),
    overUnderDraw: z.number(),
    handicapTrend: z.string(),
    overUnderTrend: z.string(),
    homeCompare: TeamBattleComparedSchema,
    awayCompare: TeamBattleComparedSchema
});

const MatchBattleComparedInfoResponseSchema = z.object({
    matchCount: z.number(),
    handicapWinRate: z.number(),
    overUnderWinRate: z.number(),
    handicapWin: z.number(),
    handicapLose: z.number(),
    handicapDraw: z.number(),
    overUnderWin: z.number(),
    overUnderLose: z.number(),
    overUnderDraw: z.number(),
    handicapTrend: z.array(z.string()),
    overUnderTrend: z.array(z.string()),
    homeCompare: TeamBattleComparedSchema,
    awayCompare: TeamBattleComparedSchema
});

export type MatchBattleComparedInfoSchema = z.infer<typeof MatchBattleComparedInfoSchema>;
export type MatchBattleComparedInfoResponseSchema = z.infer<
    typeof MatchBattleComparedInfoResponseSchema
>;

const GetBattleMatchCompareResultSchema = z.object({
    soccerData: z.object({
        getBattleMatchCompare: MatchBattleComparedInfoSchema
    })
});

export type GetBattleMatchCompareResult = z.infer<typeof GetBattleMatchCompareResultSchema>;

export type GetBattleMatchCompareResponse = z.infer<typeof MatchBattleComparedInfoResponseSchema>;

/**
 * 取得指定賽事 ID
 * - params : (matchId: number)
 * - returns : {@link GetSingleMatchIdResponse}
 */
export const getSingleMatchId = async (
    matchId: number
): Promise<ReturnData<GetSingleMatchIdResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetSingleMatchIdResult>, unknown>(
            {
                data: {
                    query: GET_MATCH_ID_QUERY,
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
            data: data.getSingleMatch
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得詳情歷史交鋒
 * - params : (matchId: number)
 * - returns : {@link GetRecentBattleMatchResponse}
 */
export const getRecentBattleMatch = async ({
    matchId,
    homeId,
    homeAway = 0,
    leagueId = 0,
    dataCount = 10
}: {
    matchId: number;
    homeId: number;
    homeAway?: number;
    leagueId?: number;
    dataCount?: number;
}): Promise<ReturnData<GetRecentBattleMatchResponse>> => {
    try {
        const { data, errors } = await fetcher<
            FetchResultData<GetRecentBattleMatchResult>,
            unknown
        >(
            {
                data: {
                    query: GET_RECENT_BATTLE_MATCH_QUERY,
                    variables: {
                        matchId,
                        homeAway,
                        leagueId,
                        dataCount
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        const matchList = data.soccerData.getRecentBattleMatch.list || [];

        const dashboard = {
            goalMissRate: {
                goal: 0,
                miss: 0
            },
            victoryMinusRate: {
                victory: 0,
                minus: 0,
                tie: 0
            },
            winLoseRate: {
                win: 0,
                lose: 0,
                go: 0
            },
            bigSmallRate: {
                big: 0,
                small: 0,
                go: 0
            }
        };

        const victoryMinusFactory = {
            victory: () => {
                dashboard.victoryMinusRate.victory += 1;
            },
            minus: () => {
                dashboard.victoryMinusRate.minus += 1;
            },
            tie: () => {
                dashboard.victoryMinusRate.tie += 1;
            }
        };
        const bigSmallFactory = {
            big: () => {
                dashboard.bigSmallRate.big += 1;
            },
            small: () => {
                dashboard.bigSmallRate.small += 1;
            },
            go: () => {
                dashboard.bigSmallRate.go += 1;
            }
        };
        const winLoseFactory = {
            win: () => {
                dashboard.winLoseRate.win += 1;
            },
            lose: () => {
                dashboard.winLoseRate.lose += 1;
            },
            go: () => {
                dashboard.winLoseRate.go += 1;
            }
        };

        for (const match of matchList) {
            if (match.homeId === homeId) {
                // 進失球
                dashboard.goalMissRate.goal += match.homeScore;
                dashboard.goalMissRate.miss += match.awayScore;

                // 勝率 - 勝負平
                match.matchResult = victoryMinusResult(match.homeScore, match.awayScore);
                victoryMinusFactory[match.matchResult as 'victory' | 'minus' | 'tie'];

                // 贏率 - 贏輸走
                match.handicapResult = handicapResult(
                    match.homeScore,
                    match.awayScore,
                    match.handicapCurrent
                );
                winLoseFactory[match.handicapResult as 'win' | 'lose' | 'go'];
            } else {
                // 進失球
                dashboard.goalMissRate.goal += match.awayScore;
                dashboard.goalMissRate.miss += match.homeScore;

                // 勝率 - 勝負平
                match.matchResult = victoryMinusResult(match.awayScore, match.homeScore);
                victoryMinusFactory[match.matchResult as 'victory' | 'minus' | 'tie'];

                // 贏率 - 贏輸走
                match.handicapResult = handicapResult(
                    match.awayScore,
                    match.homeScore,
                    match.handicapCurrent
                );
                winLoseFactory[match.handicapResult as 'win' | 'lose' | 'go'];
            }

            // 進球 - 大小走
            match.overUnderResult = overUnderResult(
                match.homeScore,
                match.awayScore,
                match.overUnderCurrent
            );
            bigSmallFactory[match.overUnderResult as 'big' | 'small' | 'go'];
        }

        return {
            success: true,
            data: {
                matchList,
                dashboard
            }
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得單一隊伍近期赛程
 * - params : (matchId: number)
 * - returns : {@link GetEventDataResponse}
 */
export const getRecentMatchData = async ({
    matchId,
    homeId,
    awayId,
    single = '',
    homeAway = 0,
    leagueId = 0,
    dataCount = 10
}: {
    matchId: number;
    homeId: number;
    awayId: number;
    single?: string;
    homeAway?: number;
    leagueId?: number;
    dataCount?: number;
}): Promise<ReturnData<GetRecentMatchResponse>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetRecentMatchResult>, unknown>(
            {
                data: {
                    query: GET_RECENT_MATCH_QUERY,
                    variables: {
                        matchId,
                        homeAway,
                        leagueId,
                        dataCount
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        const matchList = data.soccerData.getRecentMatch;

        const dashboard = {
            home: {
                goalMissRate: {
                    goal: 0,
                    miss: 0
                },
                victoryMinusRate: {
                    victory: 0,
                    minus: 0,
                    tie: 0
                },
                winLoseRate: {
                    win: 0,
                    lose: 0,
                    go: 0
                },
                bigSmallRate: {
                    big: 0,
                    small: 0,
                    go: 0
                }
            },
            away: {
                goalMissRate: {
                    goal: 0,
                    miss: 0
                },
                victoryMinusRate: {
                    victory: 0,
                    minus: 0,
                    tie: 0
                },
                winLoseRate: {
                    win: 0,
                    lose: 0,
                    go: 0
                },
                bigSmallRate: {
                    big: 0,
                    small: 0,
                    go: 0
                }
            }
        };

        const victoryMinusFactory = {
            victory: (team: 'home' | 'away') => {
                dashboard[team].victoryMinusRate.victory += 1;
            },
            minus: (team: 'home' | 'away') => {
                dashboard[team].victoryMinusRate.minus += 1;
            },
            tie: (team: 'home' | 'away') => {
                dashboard[team].victoryMinusRate.tie += 1;
            }
        };
        const bigSmallFactory = {
            big: (team: 'home' | 'away') => {
                dashboard[team].bigSmallRate.big += 1;
            },
            small: (team: 'home' | 'away') => {
                dashboard[team].bigSmallRate.small += 1;
            },
            go: (team: 'home' | 'away') => {
                dashboard[team].bigSmallRate.go += 1;
            }
        };
        const winLoseFactory = {
            win: (team: 'home' | 'away') => {
                dashboard[team].winLoseRate.win += 1;
            },
            lose: (team: 'home' | 'away') => {
                dashboard[team].winLoseRate.lose += 1;
            },
            go: (team: 'home' | 'away') => {
                dashboard[team].winLoseRate.go += 1;
            }
        };

        if (single !== 'home') {
            for (const match of matchList.home) {
                if (match.homeId === homeId) {
                    // 進失球
                    dashboard.home.goalMissRate.goal += match.homeScore;
                    dashboard.home.goalMissRate.miss += match.awayScore;

                    // 勝率 - 勝負平
                    match.matchResult = victoryMinusResult(match.homeScore, match.awayScore);
                    victoryMinusFactory[match.matchResult as 'victory' | 'minus' | 'tie']('home');

                    // 贏率 - 贏輸走
                    match.handicapResult = handicapResult(
                        match.homeScore,
                        match.awayScore,
                        match.handicapCurrent
                    );
                    winLoseFactory[match.handicapResult as 'win' | 'lose' | 'go']('home');
                } else {
                    // 進失球
                    dashboard.home.goalMissRate.goal += match.awayScore;
                    dashboard.home.goalMissRate.miss += match.homeScore;

                    // 勝率 - 勝負平
                    match.matchResult = victoryMinusResult(match.awayScore, match.homeScore);
                    victoryMinusFactory[match.matchResult as 'victory' | 'minus' | 'tie']('home');

                    // 贏率 - 贏輸走
                    match.handicapResult = handicapResult(
                        match.awayScore,
                        match.homeScore,
                        match.handicapCurrent
                    );
                    winLoseFactory[match.handicapResult as 'win' | 'lose' | 'go']('home');
                }

                // 進球 - 大小走
                match.overUnderResult = overUnderResult(
                    match.homeScore,
                    match.awayScore,
                    match.overUnderCurrent
                );
                bigSmallFactory[match.overUnderResult as 'big' | 'small' | 'go']('home');
            }
        }

        if (single !== 'away') {
            for (const match of matchList.away) {
                if (match.awayId === awayId) {
                    // 進失球
                    dashboard.away.goalMissRate.goal += match.awayScore;
                    dashboard.away.goalMissRate.miss += match.homeScore;

                    // 勝率 - 勝負平
                    match.matchResult = victoryMinusResult(match.awayScore, match.homeScore);
                    victoryMinusFactory[match.matchResult as 'victory' | 'minus' | 'tie']('away');

                    // 贏率 - 贏輸走
                    match.handicapResult = handicapResult(
                        match.awayScore,
                        match.homeScore,
                        match.handicapCurrent
                    );
                    winLoseFactory[match.handicapResult as 'win' | 'lose' | 'go']('away');
                } else {
                    // 進失球
                    dashboard.away.goalMissRate.goal += match.homeScore;
                    dashboard.away.goalMissRate.miss += match.awayScore;

                    // 勝率 - 勝負平
                    match.matchResult = victoryMinusResult(match.homeScore, match.awayScore);
                    victoryMinusFactory[match.matchResult as 'victory' | 'minus' | 'tie']('away');

                    // 贏率 - 贏輸走
                    match.handicapResult = handicapResult(
                        match.homeScore,
                        match.awayScore,
                        match.handicapCurrent
                    );
                    winLoseFactory[match.handicapResult as 'win' | 'lose' | 'go']('away');
                }

                // 進球 - 大小走
                match.overUnderResult = overUnderResult(
                    match.homeScore,
                    match.awayScore,
                    match.overUnderCurrent
                );
                bigSmallFactory[match.overUnderResult as 'big' | 'small' | 'go']('away');
            }
        }

        return {
            success: true,
            data: {
                homeMatch: matchList.home,
                awayMatch: matchList.away,
                dashboard
            }
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得兩對近期賽程
 * - params : (matchId: number)
 * - returns : {@link GetRecentMatchScheduleResponse}
 */
export const getRecentMatchSchedule = async (
    matchId: number
): Promise<ReturnData<GetRecentMatchScheduleResponse>> => {
    try {
        const { data, errors } = await fetcher<
            FetchResultData<GetRecentMatchScheduleResult>,
            unknown
        >(
            {
                data: {
                    query: GET_RECENT_MATCH_SCHEDULE_QUERY,
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
            data: data.soccerData.getRecentMatchSchedule
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得半全場勝負
 * - params : (matchId: number)
 * - returns : {@link GetHalfFullWinCountsResponse}
 */
export const getHalfFullWinCounts = async ({
    matchId,
    homeAway = 0,
    leagueId = 0,
    dataCount = 10
}: {
    matchId: number;
    homeAway?: number;
    leagueId?: number;
    dataCount?: number;
}): Promise<ReturnData<GetHalfFullWinCountsResponse>> => {
    try {
        const { data, errors } = await fetcher<
            FetchResultData<GetHalfFullWinCountsResult>,
            unknown
        >(
            {
                data: {
                    query: GET_HALF_FULL_WIN_COUNTS_QUERY,
                    variables: {
                        matchId,
                        homeAway,
                        leagueId,
                        dataCount
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        const resData = data.soccerData.getHalfFullWinCounts;

        const totalCount: Record<TeamType, Record<FieldType, number>> = {
            home: { homeField: 0, awayField: 0, allField: 0 },
            away: { homeField: 0, awayField: 0, allField: 0 }
        };

        Object.keys(resData).forEach(teamKey => {
            const team = teamKey as TeamType;
            Object.keys(resData[team]).forEach(fieldKey => {
                const field = fieldKey as FieldType;
                totalCount[team][field] = Object.values(resData[team][field]).reduce(
                    (acc, curr) => acc + curr,
                    0
                );
            });
        });

        return {
            success: true,
            data: {
                data: data.soccerData.getHalfFullWinCounts,
                total: totalCount
            }
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得對比近期戰績
 * - params : (matchId: number)
 * - returns : {@link GetRecentMatchCompareResponse}
 */
export const getRecentMatchCompare = async ({
    matchId,
    homeAway = 0,
    leagueId = 0,
    dataCount = 10
}: {
    matchId: number;
    homeAway?: number;
    leagueId?: number;
    dataCount?: number;
}): Promise<ReturnData<GetRecentMatchCompareResponse>> => {
    try {
        const { data, errors } = await fetcher<
            FetchResultData<GetRecentMatchCompareResult>,
            unknown
        >(
            {
                data: {
                    query: GET_RECENT_MATCH_COMPARE_QUERY,
                    variables: {
                        matchId,
                        homeAway,
                        leagueId,
                        dataCount
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        return {
            success: true,
            data: data.soccerData.getRecentMatchCompare
        };
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * 取得對比歷史交鋒
 * - params : (matchId: number)
 * - returns : {@link GetBattleMatchCompareResponse}
 */
export const getBattleMatchCompare = async ({
    matchId,
    homeAway = 0,
    leagueId = 0,
    dataCount = 10
}: {
    matchId: number;
    homeAway?: number;
    leagueId?: number;
    dataCount?: number;
}): Promise<ReturnData<GetBattleMatchCompareResponse>> => {
    try {
        const { data, errors } = await fetcher<
            FetchResultData<GetBattleMatchCompareResult>,
            unknown
        >(
            {
                data: {
                    query: GET_BATTLE_MATCH_COMPARE_QUERY,
                    variables: {
                        matchId,
                        homeAway,
                        leagueId,
                        dataCount
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);

        const resDate = data.soccerData.getBattleMatchCompare;

        const newData = {
            ...resDate,
            handicapTrend: resDate.handicapTrend.length > 0 ? resDate.handicapTrend.split(',') : [],
            overUnderTrend:
                resDate.overUnderTrend.length > 0 ? resDate.overUnderTrend.split(',') : []
        };

        return {
            success: true,
            data: newData
        };
    } catch (error) {
        return handleApiError(error);
    }
};
