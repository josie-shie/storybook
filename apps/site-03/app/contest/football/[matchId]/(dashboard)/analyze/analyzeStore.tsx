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
    loading: boolean;
}

let useAnalyzeStore: StoreWithSelectors<AnalyzeState>;

const initialState = (set: (data: Partial<AnalyzeState>) => void) => ({
    loading: false,
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
    }
});

const createAnalyzeStore = (init: InitState) =>
    (useAnalyzeStore = initStore<AnalyzeState>(initialState, init));

export { createAnalyzeStore, useAnalyzeStore };
