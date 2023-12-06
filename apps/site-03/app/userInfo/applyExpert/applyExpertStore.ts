import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface ApplyProgress {
    fanCount: number;
    weeklyWinRate: number;
    monthlyWinRate: number;
    seasonWinRate: number;
}

interface ExpertApplyState {
    applicationProgress: ApplyProgress;
}

let useExpertApplyStore: StoreWithSelectors<ExpertApplyState>;

const initialState = (
    set: (updater: (state: ExpertApplyState) => Partial<ExpertApplyState>) => void
) => ({
    applicationProgress: {
        fanCount: 0,
        weeklyWinRate: 0,
        monthlyWinRate: 0,
        seasonWinRate: 0
    },
    setFanCount: (fanCount: number) => {
        set(state => ({
            ...state,
            applicationProgress: { ...state.applicationProgress, fanCount }
        }));
    },
    setWeeklyWinRate: (weeklyWinRate: number) => {
        set(state => ({
            ...state,
            applicationProgress: { ...state.applicationProgress, weeklyWinRate }
        }));
    },
    setMonthlyWinRate: (monthlyWinRate: number) => {
        set(state => ({
            ...state,
            applicationProgress: { ...state.applicationProgress, monthlyWinRate }
        }));
    },
    setSeasonyWinRate: (quarterlyWinRate: number) => {
        set(state => ({
            ...state,
            applicationProgress: { ...state.applicationProgress, quarterlyWinRate }
        }));
    }
});

const createExpertApplyStore = (init: Partial<ExpertApplyState>) => {
    useExpertApplyStore = initStore<ExpertApplyState>(set => {
        return {
            ...initialState(set),
            ...init
        };
    });
};

export { createExpertApplyStore, useExpertApplyStore };
