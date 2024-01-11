import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type {
    SingleMatchTeamName,
    FormatLeagueTrendDataResponse,
    FormatWinLoseCountDataResponse,
    GetBeforeGameIndexResponse,
    GetLeaguePointsRankResponse
} from 'data-center';
import type {
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
    winLoseCountData: FormatWinLoseCountDataResponse;
    analysisDataLoading: boolean;
    companyDetailAnalyzeLoading: boolean;
    leaguePointsRankLoading: boolean;
}

let useAnalyzeStore: StoreWithSelectors<InitState>;

const initialState = (set: (data: Partial<InitState>) => void) => ({
    companyDetailAnalyze: [],
    leaguePointsRankData: {} as GetLeaguePointsRankResponse,
    teamInfo: {} as SingleMatchTeamName,
    leagueTrendData: {} as FormatLeagueTrendDataResponse,
    winLoseCountData: {} as FormatWinLoseCountDataResponse,
    list: [],
    contestAmount: DefaultAmount as GameAmountProps,
    contestType: DefaultGameType as GameTypeProps,
    contestCompany: DefaultCompany as GameCompanyProps,
    contestHandicap: DefaultHandicap as GameHandicapProps,
    contestTime: DefaultTime as GameTimeProps,
    gameIsHome: false,
    winLoseResult: {} as WinLoseResultProps,
    oddsDetailResult: {} as OddsDetailResultProps,
    analysisDataLoading: false,
    companyDetailAnalyzeLoading: false,
    leaguePointsRankLoading: false,
    setAnalysisDataLoading: (analysisDataLoading: boolean) => {
        set({ analysisDataLoading });
    },
    setCompanyDetailAnalyzeLoading: (companyDetailAnalyzeLoading: boolean) => {
        set({ companyDetailAnalyzeLoading });
    },
    setLeaguePointsRankLoading: (leaguePointsRankLoading: boolean) => {
        set({ leaguePointsRankLoading });
    },
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
    setWinLoseCountData: (winLoseCountData: FormatWinLoseCountDataResponse) => {
        set({ winLoseCountData });
    }
});

const createAnalyzeStore = (init: InitState) =>
    (useAnalyzeStore = initStore<InitState>(initialState, init));

export { createAnalyzeStore, useAnalyzeStore };
