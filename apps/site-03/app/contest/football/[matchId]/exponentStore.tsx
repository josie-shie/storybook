import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetExponentResponse } from 'data-center';
import type { ExponentType, OptionsType, TotalGoalsRadioType } from '@/types/exponent';

interface InitState {
    exponentData: GetExponentResponse | null;
}

interface ExponentState extends InitState {
    loading: boolean;
    options: OptionsType[];
    selectedOption: ExponentType;
    setSelectedOption: (value: ExponentType) => void;
    totalGoalsRadio: TotalGoalsRadioType;
    setTotalGoalsRadio: (value: TotalGoalsRadioType) => void;
}

let useExponentStore: StoreWithSelectors<ExponentState>;

const initialState = (set: (data: Partial<ExponentState>) => void) => ({
    exponentData: null,
    totalGoalsRadio: 'full' as const,
    loading: false,
    options: [
        {
            label: '讓球',
            value: 'handicapsData'
        },
        {
            label: '勝平負',
            value: 'winLoseData'
        },
        {
            label: '進球數',
            value: 'totalGoalData'
        }
    ],
    selectedOption: 'handicapsData' as const,
    setExponentList: (exponentData: GetExponentResponse) => {
        set({ exponentData });
    },
    setTotalGoalsRadio: (totalGoalsRadio: TotalGoalsRadioType) => {
        set({ totalGoalsRadio });
    },
    setSelectedOption: (selectedOption: ExponentType) => {
        set({ selectedOption });
        set({ totalGoalsRadio: 'full' });
    }
});

const creatExponentStore = (init: InitState) =>
    (useExponentStore = initStore<ExponentState>(initialState, init));

export { creatExponentStore, useExponentStore };
