import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type {
    SingleMatchTeamName,
    FormatLeagueTrendDataResponse,
    FormatRecordDataResponse,
    FormatWinLoseCountDataResponse,
    GetBeforeGameIndexResponse,
    GetLeaguePointsRankResponse
} from 'data-center';
import type {
    BattleRecord,
    WinLoseResultProps,
    OddsDetailResultProps,
    GameAmountProps,
    GameTypeProps,
    GameCompanyProps,
    GameHandicapProps,
    GameTimeProps
} from '@/types/analyze';

const DefaultCompany = 'crown';
const DefaultHandicap = 'current';
const DefaultTime = 'full';
const DefaultAmount = 10;
const DefaultGameType = '2';

interface InitState {
    companyDetailAnalyze: GetBeforeGameIndexResponse;
    leaguePointsRankData: GetLeaguePointsRankResponse;
    teamInfo: SingleMatchTeamName;
    leagueTrendData: FormatLeagueTrendDataResponse;
    battleRecordData: FormatRecordDataResponse;
    lastMatches: {
        home: FormatRecordDataResponse;
        away: FormatRecordDataResponse;
    };
    winLoseCountData: FormatWinLoseCountDataResponse;
}

interface AnalyzeState extends InitState {
    list: BattleRecord[];
    contestAmount: GameAmountProps;
    contestType: GameTypeProps;
    contestCompany: GameCompanyProps;
    contestHandicap: GameHandicapProps;
    contestTime: GameTimeProps;
    gameIsHome: boolean;
    winLoseResult: WinLoseResultProps;
    oddsDetailResult: OddsDetailResultProps;
    setList: (list: BattleRecord[]) => void;
    setContestAmount: (contestAmount: GameAmountProps) => void;
    setContestType: (contestType: GameTypeProps) => void;
    setContestCompany: (contestCompany: GameCompanyProps) => void;
    setContestHandicap: (contestHandicap: GameHandicapProps) => void;
    setContestTime: (contestTime: GameTimeProps) => void;
    setGameIsHome: (gameIsHome: boolean) => void;
    setWinLoseResult: (winLoseResult: WinLoseResultProps) => void;
    setOddsDetailResult: (oddsDetailResult: OddsDetailResultProps) => void;
}

let useAnalyzeStore: StoreWithSelectors<AnalyzeState>;

const initialState = (set: (data: Partial<AnalyzeState>) => void) => ({
    companyDetailAnalyze: [],
    leaguePointsRankData: {} as GetLeaguePointsRankResponse,
    teamInfo: {} as SingleMatchTeamName,
    leagueTrendData: {} as FormatLeagueTrendDataResponse,
    battleRecordData: {} as FormatRecordDataResponse,
    lastMatches: {
        home: {} as FormatRecordDataResponse,
        away: {} as FormatRecordDataResponse
    },
    winLoseCountData: {} as FormatWinLoseCountDataResponse,
    list: [],
    contestAmount: DefaultAmount as GameAmountProps,
    contestType: DefaultGameType as GameTypeProps,
    contestCompany: DefaultCompany as GameCompanyProps,
    contestHandicap: DefaultHandicap as GameHandicapProps,
    contestTime: DefaultTime as GameTimeProps,
    gameIsHome: true,
    winLoseResult: {} as WinLoseResultProps,
    oddsDetailResult: {} as OddsDetailResultProps,
    setCompanyDetailAnalyze: ({ companyDetailAnalyze }: InitState) => {
        set({ companyDetailAnalyze });
    },
    setLeaguePointsRankData: (leaguePointsRankData: GetLeaguePointsRankResponse) => {
        set({ leaguePointsRankData });
    },
    setTeamInfoData: (teamInfo: SingleMatchTeamName) => {
        set({ teamInfo });
    },
    setLeagueTrendData: (leagueTrendData: FormatLeagueTrendDataResponse) => {
        set({ leagueTrendData });
    },
    setBattleRecordData: (battleRecordData: FormatRecordDataResponse) => {
        set({ battleRecordData });
    },
    setLastMatches: (lastMatches: {
        home: FormatRecordDataResponse;
        away: FormatRecordDataResponse;
    }) => {
        set({ lastMatches });
    },
    setWinLoseCountData: (winLoseCountData: FormatWinLoseCountDataResponse) => {
        set({ winLoseCountData });
    },
    setList: (list: BattleRecord[]) => {
        set({ list });
    },
    setContestAmount: (contestAmount: GameAmountProps) => {
        set({ contestAmount });
    },
    setContestType: (contestType: GameTypeProps) => {
        set({ contestType });
    },
    setContestCompany: (contestCompany: GameCompanyProps) => {
        set({ contestCompany });
    },
    setContestHandicap: (contestHandicap: GameHandicapProps) => {
        set({ contestHandicap });
    },
    setContestTime: (contestTime: GameTimeProps) => {
        set({ contestTime });
    },
    setGameIsHome: (gameIsHome: boolean) => {
        set({ gameIsHome });
    },
    setWinLoseResult: (winLoseResult: WinLoseResultProps) => {
        set({ winLoseResult });
    },
    setOddsDetailResult: (oddsDetailResult: OddsDetailResultProps) => {
        set({ oddsDetailResult });
    }
});

const createAnalyzeStore = (init: InitState) =>
    (useAnalyzeStore = initStore<AnalyzeState>(initialState, init));

export { createAnalyzeStore, useAnalyzeStore };
