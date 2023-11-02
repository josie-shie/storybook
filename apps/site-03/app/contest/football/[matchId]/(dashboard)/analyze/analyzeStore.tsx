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

let useAnalyzeStore: StoreWithSelectors<InitState>;

const initialState = (set: (data: Partial<InitState>) => void) => ({
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
    setCompanyDetailAnalyze: (companyDetailAnalyze: GetBeforeGameIndexResponse) => {
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
    (useAnalyzeStore = initStore<InitState>(initialState, init));

export { createAnalyzeStore, useAnalyzeStore };
