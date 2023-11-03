import type { HandicapsInfo, TotalGoalsInfo, WinDrawLoseType } from '@/types/detailStatus';

export interface CompanyDetailAnalyzeResponse {
    companyOdds: {
        companyId: number;
        companyName: string;
        fullHandicap: HandicapsInfo[];
        fullTotalGoal: TotalGoalsInfo[];
        fullWinDrawLose: WinDrawLoseType[];
    };
}

export interface BeforeGameResponse {
    label: string;
    init: number;
    initHome: number;
    initAway: number;
    current: number;
    currentHome: number;
    currentAway: number;
}
export interface SingleMatchTeamNameProps {
    homeEn: string;
    homeChs: string;
    homeCht: string;
    awayEn: string;
    awayChs: string;
    awayCht: string;
    homeId: number;
    awayId: number;
}
export interface AnalyzeTablesProps {
    leagueTrendData: LeagueTrendProps;
    winLoseCountData: WinLoseCountProps;
    battleRecordData: HTHMatch[];
    awayLastMatches: HTHMatch[];
    homeLastMatches: HTHMatch[];
}

export interface LeagueTrendProps {
    homeOdds: HomeAwayOdds;
    awayOdds: HomeAwayOdds;
}

export interface WinLoseCountProps {
    homeHT: HTWinCountsStat;
    awayHT: HTWinCountsStat;
}

export interface AnalyzeResponse {
    statistics: AnalysisStatistics;
}

export interface AnalysisStatistics {
    headToHead: HTHMatch[];
    homeLastMatches: HTHMatch[];
    awayLastMatches: HTHMatch[];
    homeSchedule: ScheduleMatch[];
    awaySchedule: ScheduleMatch[];
    homeOdds: HomeAwayOdds;
    awayOdds: HomeAwayOdds;
    homeGoals: GoalsCountsStat;
    awayGoals: GoalsCountsStat;
    homeHT: HTWinCountsStat;
    awayHT: HTWinCountsStat;
    homeShootTime: ShootTimeCountsStat;
    awayShootTime: ShootTimeCountsStat;
}

export interface HTHMatch {
    matchId: number;
    leagueId: number;
    leagueEn: string;
    leagueChs: string;
    leagueCht: string;
    matchTime: string;
    matchLocation: string;
    homeId: number;
    homeEn: string;
    homeChs: string;
    homeCht: string;
    awayId: number;
    awayEn: string;
    awayChs: string;
    awayCht: string;
    homeScore: number;
    awayScore: number;
    homeHalfScore: number;
    awayHalfScore: number;
    homeRed: number;
    awayRed: number;
    homeCorner: number;
    awayCorner: number;
    asiaOdds: HTHAsiaOdds;
    europeOdds: HTHEuropeOdds;
    overUnderOdds: HTHOverUnderOdds;
    winLose: '0' | '1' | '2';
    leagueCup: '0' | '1';
}

interface HTHAsiaOdds {
    homeInitialOdds: number;
    // 主隊初賠
    initialHandicap: number;
    // 初盤口
    awayInitialOdds: number;
    // 客隊初賠
    homeCurrentOdds: number;
    // 主隊臨場賠率
    currentHandicap: number;
    // 臨場盤口
    awayCurrentOdds: number;
    //客隊臨場賠率
}

interface HTHEuropeOdds {
    initialHomeOdds: number;
    // 主勝初賠
    initialDrawOdds: number;
    // 和局初賠
    initialAwayOdds: number;
    // 客勝初賠
    currentHomeOdds: number;
    // 主勝臨場賠率
    currentDrawOdds: number;
    // 和局臨場賠率
    currentAwayOdds: number;
    // 客勝臨場賠率
}

interface HTHOverUnderOdds {
    initialHandicap: number;
    //大球初賠
    initialOverOdds: number;
    //初盤口
    initialUnderOdds: number;
    //小球初賠
    currentHandicap: number;
    //大球臨場賠率
    currentOverOdds: number;
    //臨場盤口
    currentUnderOdds: number;
    //小球臨場賠率
}

interface ScheduleMatch {
    matchId: number;
    //比賽ID
    leagueId: number;
    //聯賽ID
    leagueEn: string;
    //聯賽英文名
    leagueChs: string;
    //聯賽簡體名
    leagueCht: string;
    //聯賽繁體名
    matchTime: string;
    //比賽時間
    matchLocation: string;
    //比賽地點
    homeId: number;
    //主隊ID
    homeEn: string;
    //主隊英文名
    homeChs: string;
    //主隊簡體名
    homeCht: string;
    //主隊繁體名
    awayId: number;
    //客隊ID
    awayEn: string;
    //客隊英文名
    awayChs: string;
    //客隊簡體名
    awayCht: string;
    //客隊繁體名
    daysApart: number;
    //與本場相隔天數
}

export interface HomeAwayOdds {
    totalFullTime: AnalysisOdds;
    homeFullTime: AnalysisOdds;
    awayFullTime: AnalysisOdds;
    lastSixResultFullTime: AnalysisLastSixResult;
    totalHalfTime: AnalysisOdds;
    homeHalfTime: AnalysisOdds;
    awayHalfTime: AnalysisOdds;
    lastSixResultHalfTime: AnalysisLastSixResult;
}

interface AnalysisOdds {
    name: string;
    //盤路標識
    played: number;
    //比賽場次
    handicapWin: number;
    //讓球盤-贏盤場次
    handicapDraw: number;
    //讓球盤-走水場次
    handicapLose: number;
    //讓球盤-輸盤場次
    HandicapWinRate: number;
    //讓球盤-贏盤率
    overUnderOver: number;
    //大小球-大球場次
    overUnderOverRate: number;
    //大小球-大球率
    overUnderUnder: number;
    //大小球-小球場次
    overUnderUnderRate: number;
    //大小球-小球率
}

interface AnalysisLastSixResult {
    name: string;
    //盤路標識
    played: number;
    //比賽場次
    handicapResult: string;
    //讓球盤結果
    handicapWinRate: number;
    //讓球盤-贏盤率
    overUnderResult: string;
    //大小球結果
}

interface GoalsCountsStat {
    total: GoalsCounts;
    // 總場次
    home: GoalsCounts;
    // 主場場次
    away: GoalsCounts;
    // 客場場次
}

interface GoalsCounts {
    score0: string;
    //入球數0場次
    score1: string;
    //入球數1場次
    score2: string;
    //入球數2場次
    score3: string;
    //入球數3場次
    score4plus: string;
    //入球數4+場次
    firstHalf: string;
    //上半場入球場次
    secondHalf: string;
    //下半場入球場次
}

interface HTWinCountsStat {
    total: HTWinCounts;
    // 總場次
    home: HTWinCounts;
    // 主場場次
    away: HTWinCounts;
    // 客場場次
}

interface HTWinCounts {
    victoryVictory: string;
    // 半場勝全場勝場次
    victoryDraw: string;
    // 半場勝全場和場次
    victoryDefeat: string;
    // 半場勝全場負場次
    drawVictory: string;
    // 半場和全場勝場次
    drawDraw: string;
    // 半場和全場和場次
    drawDefeat: string;
    // 半場和全場負場次
    defeatVictory: string;
    // 半場負全場勝場次
    defeatDraw: string;
    // 半場負全場和場次
    defeatDefeat: string;
    // 半場負全場負場次
}
interface ShootTimeCountsStat {
    total: ShootTimeCounts;
    //總場次
    home: ShootTimeCounts;
    //主場場次
    away: ShootTimeCounts;
    //客場場次
    firstTotal: ShootTimeCounts;
    //第一個進球時間統計-總場次
    firstHome: ShootTimeCounts;
    //第一個進球時間統計-主場場次
    firstAway: ShootTimeCounts;
    // 第一個進球時間統計-客場場次
}

interface ShootTimeCounts {
    period1_10: string;
    //1-10分鐘進球場次
    period11_20: string;
    //11-20分鐘進球場次
    period21_30: string;
    //21-30分鐘進球場次
    period31_40: string;
    //31-40分鐘進球場次
    period41_45: string;
    //41-45分鐘進球場次
    period46_50: string;
    //46-50分鐘進球場次
    period51_60: string;
    //51-60分鐘進球場次
    period61_70: string;
    //61-70分鐘進球場次
    period71_80: string;
    //71-80分鐘進球場次
    period81_90plus: string;
    //81-90+分鐘進球場次
}
export interface MatchesOddsDetailResponse {
    match: AsiaMatch;
    handicap: MatchesHandicap;
    europeOdds: MatchesEuropeOdds;
    overUnder: MatchesOverUnder;
    handicapHalf: MatchesHandicapHalf;
    europeOddsHalf: MatchesEuropeOdds;
    overUnderHalf: MatchesOverUnderHalf;
}

export interface AsiaMatch {
    matchId: number;
    matchTime: string;
    startTime: string;
    leagueId: number;
    leagueEn: string;
    leagueChs: string;
    leagueCht: string;
    homeEn: string;
    homeChs: string;
    homeCht: string;
    awayEn: string;
    awayChs: string;
    awayCht: string;
    homeId: number;
    awayId: number;
    homeRank: string;
    awayRank: string;
    isNeutral: boolean;
    state: number;
    homeScore: number;
    awayScore: number;
    homeRed: number;
    awayRed: number;
}

export interface MatchesHandicap {
    matchId: number;
    companyId: number;
    initialHandicap: number;
    homeInitialOdds: number;
    awayInitialOdds: number;
    currentHandicap: number;
    homeCurrentOdds: number;
    awayCurrentOdds: number;
    isMaintained: boolean;
    isInProgress: boolean;
    oddsChangeTime: string;
    isClosed: boolean;
    oddsType: number;
}

export interface MatchesEuropeOdds {
    matchId: number;
    companyId: number;
    initialHomeOdds: number;
    initialDrawOdds: number;
    initialAwayOdds: number;
    currentHomeOdds: number;
    currentDrawOdds: number;
    currentAwayOdds: number;
    oddsChangeTime: string;
    isClosed: boolean;
    oddsType: 0 | 1 | 2 | 3;
}

export interface MatchesOverUnder {
    matchId: number;
    companyId: number;
    initialHandicap: number;
    initialOverOdds: number;
    initialUnderOdds: number;
    currentHandicap: number;
    currentOverOdds: number;
    currentUnderOdds: number;
    oddsChangeTime: string;
    isClosed: boolean;
    oddsType: number;
}

export interface MatchesHandicapHalf {
    matchId: number;
    companyId: number;
    initialHandicap: number;
    homeInitialOdds: number;
    awayInitialOdds: number;
    currentHandicap: number;
    homeCurrentOdds: number;
    awayCurrentOdds: number;
    oddsChangeTime: string;
    oddsType: number;
}

export interface MatchesOverUnderHalf {
    matchId: number;
    companyId: number;
    initialHandicap: number;
    initialOverOdds: number;
    initialUnderOdds: number;
    currentHandicap: number;
    currentOverOdds: number;
    currentUnderOdds: number;
    oddsChangeTime: string;
    oddsType: number;
}

export interface BeforeGameDataResponse {
    companyOdds: CompanyOdds;
}

interface CompanyOdds {
    companyId: number;
    //公司ID
    companyName: string;
    //公司名稱
    fullHandicap: Handicap;
    //全場讓球指數列表
    halfHandicap: Handicap;
    //半場讓球指數列表
    fullTotalGoal: TotalGoals;
    //全場總進球指數列表
    halfTotalGoal: TotalGoals;
    //半場總進球指數列表
    fullWinDrawLose: EuropeOdds;
    //全場歐洲賠率列表
    halfWinDrawLose: EuropeOdds;
    //半場歐洲賠率列表
}

interface Handicap {
    matchId: number;
    //比賽ID
    companyId: number;
    //賭商ID
    initialHandicap: number;
    //初始讓球數
    homeInitialOdds: number;
    //主隊初始賠率
    awayInitialOdds: number;
    //客隊初始賠率
    currentHandicap: number;
    //現時讓球數
    homeCurrentOdds: number;
    //主隊現時賠率
    awayCurrentOdds: number;
    //客隊現時賠率
    oddsChangeTime: string;
    //改變時間
    oddsType: number;
    //賠率類型
    state: number;
    //比賽狀態
    homeScore: number;
    //主隊得分
    awayScore: number;
    //客隊得分
    isClosed: boolean;
    //是否封盤
}

interface TotalGoals {
    matchId: number;
    //比賽ID
    companyId: number;
    //賭商ID
    initialTotalGoals: number;
    //初始總進球數
    overInitialOdds: number;
    //初始大球賠率
    underInitialOdds: number;
    //初始小球賠率
    currentTotalGoals: number;
    //現時總進球數
    overCurrentOdds: number;
    //大球現時賠率
    underCurrentOdds: number;
    //小球現時賠率
    oddsChangeTime: string;
    //改變時間
    oddsType: number;
    //賠率類型
    state: number;
    //比賽狀態
    homeScore: number;
    //主隊得分
    awayScore: number;
    //客隊得分
    isClosed: boolean;
    //是否封盤
}

interface EuropeOdds {
    matchId: number;
    //比賽ID
    companyId: number;
    //賭商ID
    initialHomeOdds: number;
    //初始主隊賠率
    initialDrawOdds: number;
    //初始平局賠率
    initialAwayOdds: number;
    //初始客隊賠率
    currentHomeOdds: number;
    //現時主隊賠率
    currentDrawOdds: number;
    //現時平局賠率
    currentAwayOdds: number;
    //現時客隊賠率
    oddsChangeTime: string;
    //改變時間
    isClosed: boolean;
    //是否封盤
    oddsType: number;
    //賠率類型
}

export interface HandicapType {
    handicap: string;
    overUnder: string;
    handicapType: string;
    overType: string;
}

export interface BattleRecord {
    matchId: number;
    matchTime: string;
    leagueName: string;
    homeTeamName: string;
    awayTeamName: string;
    homeScore: number;
    awayScore: number;
    homeHalfScore: number;
    awayHalfScore: number;
    handicap: string;
    overUnder: string;
    handicapType: string;
    overType: string;
    winLose: string;
    isHome: boolean;
}

export interface WinLoseResultProps {
    win: number;
    tie: number;
    lose: number;
    winRate: number;
}

export interface OddsDetailResultProps {
    win: number;
    big: number;
    winRate: number;
    overRate: number;
}

export interface FilterProps {
    company?: GameCompanyProps;
    handicap?: GameHandicapProps;
    time?: GameTimeProps;
    amount?: GameAmountProps;
    type?: GameTypeProps;
}

export type GameAmountProps = 10 | 20;
export type GameTypeProps = '0' | '1' | '2';
export type GameCompanyProps = 'crown' | 'bet365';
export type GameHandicapProps = 'current' | 'initial';
export type GameTimeProps = 'full' | 'half';
