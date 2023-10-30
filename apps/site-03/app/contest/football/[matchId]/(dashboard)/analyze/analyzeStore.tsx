import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { BeforeGameResponse, LeagueTrendProps } from '@/types/analyze';

interface InitState {
    companyDetailAnalyze: BeforeGameResponse[];
    leagueTrendData: LeagueTrendProps;
}

let useAnalyzeStore: StoreWithSelectors<InitState>;

const initialState = (set: (data: Partial<InitState>) => void) => ({
    companyDetailAnalyze: [],
    leagueTrendData: {} as LeagueTrendProps,
    setCompanyDetailAnalyze: ({ companyDetailAnalyze }: InitState) => {
        set({ companyDetailAnalyze });
    }
});

const createAnalyzeStore = (init: InitState) =>
    (useAnalyzeStore = initStore<InitState>(initialState, init));

export { createAnalyzeStore, useAnalyzeStore };
