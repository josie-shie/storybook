import { fetcher, overUnderResult, victoryMinusResult, handicapResult } from 'lib';
import { z } from 'zod';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import { GET_RECENT_MATCH_QUERY, GET_MATCH_ID_QUERY } from './graphqlQueries';

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

export type RecentMatchDashboard = z.infer<typeof RecentMatchDashboardSchema>;

const GetRecentMatchResponseSchema = z.object({
    homeMatch: z.array(RecentMatchSchema),
    awayMatch: z.array(RecentMatchSchema),
    dashboard: RecentMatchDashboardSchema
});

export type GetRecentMatchResponse = z.infer<typeof GetRecentMatchResponseSchema>;

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
