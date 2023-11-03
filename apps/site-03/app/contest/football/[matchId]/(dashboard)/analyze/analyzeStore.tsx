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
    lastMatches: {
        home: FormatRecordDataResponse;
        away: FormatRecordDataResponse;
    };
    winLoseCountData: FormatWinLoseCountDataResponse;
}

let useAnalyzeStore: StoreWithSelectors<InitState>;

const initialState = (set: (data: Partial<InitState>) => void) => ({
    companyDetailAnalyze: [],
    leaguePointsRankData: {} as GetLeaguePointsRankResponse,
    teamInfo: {} as SingleMatchTeamName,
    leagueTrendData: {} as FormatLeagueTrendDataResponse,
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
    gameIsHome: false,
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
    setLastMatches: (lastMatches: {
        home: FormatRecordDataResponse;
        away: FormatRecordDataResponse;
    }) => {
        set({ lastMatches });
    },
    setWinLoseCountData: (winLoseCountData: FormatWinLoseCountDataResponse) => {
        set({ winLoseCountData });
    }
});

const createAnalyzeStore = (init: InitState) =>
    (useAnalyzeStore = initStore<InitState>(initialState, init));

export { createAnalyzeStore, useAnalyzeStore };
