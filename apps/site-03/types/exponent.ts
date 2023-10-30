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

export interface OptionsType {
    label: string;
    value: string;
}

export type ExponentType = 'handicaps' | 'contestResult' | 'goalTotal';

export type TotalGoalsRadioType = 'half' | 'full';

export interface Exponent {
    half: ExponentDataType;
    full: ExponentDataType;
}
