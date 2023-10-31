import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type {
    BeforeGameResponse,
    LeagueTrendProps,
    FormatWinLoseCountDataResponse
} from '@/types/analyze';

interface InitState {
    companyDetailAnalyze: BeforeGameResponse[];
    leagueTrendData: LeagueTrendProps;
    winLoseCountData: FormatWinLoseCountDataResponse;
}

let useAnalyzeStore: StoreWithSelectors<InitState>;

const initialState = (set: (data: Partial<InitState>) => void) => ({
    companyDetailAnalyze: [],
    leagueTrendData: {} as LeagueTrendProps,
    winLoseCountData: {} as FormatWinLoseCountDataResponse,
    setCompanyDetailAnalyze: ({ companyDetailAnalyze }: InitState) => {
        set({ companyDetailAnalyze });
    },
    setWinLoseCountData: (winLoseCountData: FormatWinLoseCountDataResponse) => {
        set({ winLoseCountData });
    }
});

const createAnalyzeStore = (init: InitState) =>
    (useAnalyzeStore = initStore<InitState>(initialState, init));

export { createAnalyzeStore, useAnalyzeStore };
