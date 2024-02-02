interface MatchData {
    matchId: number;
    companyId: number;
    companyName: string;
    initialHandicap: number;
    homeInitialOdds: number;
    awayInitialOdds: number;
    currentHandicap: number;
    homeCurrentOdds: number;
    awayCurrentOdds: number;
}

interface ExponentDataType {
    handicaps: MatchData[];
    contestResult: MatchData[];
    goalTotal: MatchData[];
}

export type ExponentType = 'handicapsData' | 'winLoseData' | 'totalGoalData' | 'handicaps';

export interface Exponent {
    half: ExponentDataType;
    full: ExponentDataType;
}
