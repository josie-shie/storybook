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
    companyNameMap: Record<number, string>;
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
    companyNameMap: {
        1: '澳*',
        3: 'Crow*',
        4: '立*',
        8: '36*',
        9: '威廉*',
        12: '易胜*',
        14: '韦*',
        17: '明*',
        19: 'Interwet*',
        22: '10*',
        23: '金宝*',
        24: '12*',
        31: '利*',
        35: '盈*',
        42: '18*',
        47: '平*',
        48: '香港马*',
        49: 'Bwi*'
    },
    selectedOption: 'handicapsData' as const,
    setExponentList: (exponentData: GetExponentResponse) => {
        set({ exponentData });
    },
    setTotalGoalsRadio: (totalGoalsRadio: TotalGoalsRadioType) => {
        set({ totalGoalsRadio });
    },
    setSelectedOption: (selectedOption: ExponentType) => {
        set({ selectedOption });
        set({ totalGoalsRadio: 'half' });
    }
});

const creatExponentStore = (init: InitState) =>
    (useExponentStore = initStore<ExponentState>(initialState, init));

export { creatExponentStore, useExponentStore };
