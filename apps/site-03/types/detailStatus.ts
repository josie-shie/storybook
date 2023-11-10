export interface MatchInfo {
    matchId: number;
    color: string;
    kind: number;
    leagueId: number;
    leagueEn: string;
    leagueEnShort: string;
    leagueChsShort: string;
    leagueChtShort: string;
    subLeagueId: string;
    subLeagueEn: string;
    subLeagueChs: string;
    subLeagueCht: string;
    matchTime: number;
    startTime: number;
    homeEn: string;
    homeChs: string;
    homeCht: string;
    awayEn: string;
    awayChs: string;
    awayCht: string;
    homeId: number;
    awayId: number;
    state: number;
    homeScore: number;
    awayScore: number;
    homeHalfScore: number;
    awayHalfScore: number;
    homeRed: number;
    awayRed: number;
    homeYellow: number;
    awayYellow: number;
    homeCorner: number;
    awayCorner: number;
    homeRankEn: string;
    homeRankCn: string;
    awayRankEn: string;
    awayRankCn: string;
    isNeutral: boolean;
    hasLineup: string;
    season: string;
    groupId: number;
    roundEn: string;
    roundCn: string;
    grouping: string;
    locationEn: string;
    locationCn: string;
    weatherEn: string;
    weatherCn: string;
    temp: string;
    explainEn: string;
    explainCn: string;
    extraExplain: string;
    isHidden: boolean;
    injuryTime: string;
    updateTime: string;
    homeLogo: string;
    awayLogo: string;
}

export interface HandicapsInfo {
    matchId: number;
    companyId: number;
    initialHandicap: number;
    homeInitialOdds: number;
    awayInitialOdds: number;
    currentHandicap: number;
    homeCurrentOdds: number;
    awayCurrentOdds: number;
    oddsChangeTime: number;
    oddsType: number;
    state: number;
    homeScore: number;
    awayScore: number;
    isClosed: boolean;
}

export type HandicapsList = {
    company: {
        id: number;
        timePeriods: {
            inProgress: HandicapsInfo[];
            notStarted: HandicapsInfo[];
        };
    }[];
}[];

export interface TotalGoalsInfo {
    matchId: number;
    companyId: number;
    initialTotalGoals: number;
    overInitialOdds: number;
    underInitialOdds: number;
    currentTotalGoals: number;
    overCurrentOdds: number;
    underCurrentOdds: number;
    oddsChangeTime: number;
    oddsType: number;
    state: number;
    homeScore: number;
    awayScore: number;
    isClosed: boolean;
}

export type TotalGoalsList = {
    company: {
        id: number;
        timePeriods: {
            inProgress: TotalGoalsInfo[];
            notStarted: TotalGoalsInfo[];
        };
    }[];
}[];

export interface EventInfo {
    id: number;
    isHome: boolean;
    kind: number;
    time: string;
    nameEn: string;
    nameChs: string;
    nameCht: string;
    playerId: string;
    playerId2: string;
    overtime: string;
}

export interface TechnicalInfo {
    away: string;
    home: string;
    technicType: string;
}

export interface LineupInfo {
    nameChs: string;
    nameCht: string;
    nameEn: string;
    number: string;
    playerId: number;
    positionId: string;
}

export interface LineupList {
    matchId: number;
    homeArray: string;
    awayArray: string;
    homeLineup: LineupInfo[];
    awayLineup: LineupInfo[];
    homeBackup: LineupInfo[];
    awayBackup: LineupInfo[];
}

export interface LiveTextInfo {
    id: number;
    content: string;
    time: string;
}

export interface DetailStatusResponse {
    handicapsFull: HandicapsList;
    handicapsHalf: HandicapsList;
    totalGoalsFull: TotalGoalsList;
    totalGoalsHalf: TotalGoalsList;
    events: EventInfo[];
    lineupInfo: LineupList;
    technicalStatistics: TechnicalInfo[];
    liveText: LiveTextInfo[];
}

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

export interface EventInfoType {
    isHome: Record<string, EventInfo>;
    isAway: Record<string, EventInfo>;
}

export interface DetailStatusData {
    handicapsData: HandicapsDataType;
    totalGoalsData: TotalGoalsDataType;
    eventInfo: EventInfoType;
    eventList: string[];
    lineupInfo: LineupList;
    technical: TechnicalInfo[];
}

export interface LiveTextListType {
    awayName: string;
    content: string;
    dateTime: string;
    homeName: string;
    id: number;
    score: string;
    time: string;
}

export interface WinDrawLoseType {
    matchId: number;
    companyId: number;
    initialHomeOdds: number;
    initialDrawOdds: number;
    initialAwayOdds: number;
    currentHomeOdds: number;
    currentDrawOdds: number;
    currentAwayOdds: number;
    oddsChangeTime: number;
    isClosed: boolean;
    oddsType: number;
    state: number;
    homeScore: number;
    awayScore: number;
}

export interface CompanyDetailResponse {
    matchId: number;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    startTime: number;
    companyOdds: {
        companyId: number;
        companyName: string;
        fullHandicap: HandicapsInfo[];
        halfHandicap: HandicapsInfo[];
        fullTotalGoal: TotalGoalsInfo[];
        halfTotalGoal: TotalGoalsInfo[];
        fullWinDrawLose: WinDrawLoseType[];
        halfWinDrawLose: WinDrawLoseType[];
    };
}

export interface CompanyLiveDetailResponse {
    matchId: number;
    companyOdds: {
        companyId: number;
        companyName: string;
        fullHandicap: HandicapsInfo[];
        halfHandicap: HandicapsInfo[];
        fullTotalGoal: TotalGoalsInfo[];
        halfTotalGoal: TotalGoalsInfo[];
        fullWinDrawLose: WinDrawLoseType[];
        halfWinDrawLose: WinDrawLoseType[];
    };
}

export interface CompanyHandicapsDataType {
    half: {
        list: number[];
        info: Record<number, HandicapsInfo>;
    };
    full: {
        list: number[];
        info: Record<number, HandicapsInfo>;
    };
}

export interface CompanyTotalGoalDataType {
    half: {
        list: number[];
        info: Record<number, TotalGoalsInfo>;
    };
    full: {
        list: number[];
        info: Record<number, TotalGoalsInfo>;
    };
}

export interface WinLoseInfo {
    matchId: number;
    companyId: number;
    initialHomeOdds: number;
    initialDrawOdds: number;
    initialAwayOdds: number;
    currentHomeOdds: number;
    currentDrawOdds: number;
    currentAwayOdds: number;
    oddsChangeTime: number;
    isClosed: boolean;
    oddsType: number;
    state: number;
    homeScore: number;
    awayScore: number;
}

export interface CompanyWinLoseDataDataType {
    half: {
        list: number[];
        info: Record<number, WinLoseInfo>;
    };
    full: {
        list: number[];
        info: Record<number, WinLoseInfo>;
    };
}

export interface ExponentDataTpye {
    handicapsData: CompanyHandicapsDataType;
    totalGoalData: CompanyTotalGoalDataType;
    winLoseData: CompanyWinLoseDataDataType;
}

export type PredictionResult = 'NONE' | 'WIN' | 'LOSE' | 'DRAW';
export type PredictedPlay = 'HOME' | 'AWAY' | 'OVER' | 'UNDER';

export interface PredictListType {
    id: number;
    matchId: number;
    leagueId: number;
    leagueName: string;
    homeTeamId: number;
    homeTeamName: string;
    awayTeamId: number;
    awayTeamName: string;
    homeTeamScore: number;
    awayTeamScore: number;
    handicap: number;
    homeTeamOdds: number;
    awayTeamOdds: number;
    overUnder: number;
    overOdds: number;
    underOdds: number;
    mentorId: number;
    mentorName: string;
    predictedPlay: PredictionResult;
    analysisTitle: string;
    analysisContent: string;
    price: string;
    predictionResult: PredictionResult;
    matchTime: string;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;
}
