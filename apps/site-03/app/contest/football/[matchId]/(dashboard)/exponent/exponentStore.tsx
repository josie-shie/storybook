import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { Exponent, ExponentType, OptionsType, TotalGoalsRadioType } from '@/types/exponent';

interface InitState {
    exponentData: Exponent | null;
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
    totalGoalsRadio: 'half' as const,
    loading: false,
    options: [
        {
            label: '讓球',
            value: 'handicaps'
        },
        {
            label: '勝平負',
            value: 'contestResult'
        },
        {
            label: '進球數',
            value: 'goalTotal'
        }
    ],
    selectedOption: 'handicapsData' as const,
    setExponentList: (exponentData: Exponent) => {
        set({ exponentData });
    },
    setTotalGoalsRadio: (totalGoalsRadio: TotalGoalsRadioType) => {
        set({ totalGoalsRadio });
    },
    setSelectedOption: (selectedOption: ExponentType) => {
        set({ selectedOption });
    }
});

const creatExponentStore = (init: InitState) =>
    (useExponentStore = initStore<ExponentState>(initialState, init));

export { creatExponentStore, useExponentStore };
