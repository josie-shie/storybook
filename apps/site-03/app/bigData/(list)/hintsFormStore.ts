import type { BigDataHintListResponse } from 'data-center';
import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface Option {
    label: string;
    value: string;
}

interface InitState {
    handicapTips: BigDataHintListResponse;
}

interface HintsFormState extends InitState {
    playList: Option[];
    setHandicapTips: (handicapTips: BigDataHintListResponse) => void;
    hintsSelected: string;
    setHintsSelected: (hintsSelected: string) => void;
    timeAscending: boolean;
    setTimeAscending: (timeAscending: boolean) => void;
    handicapAscending: boolean;
    setHandicapAscending: (handicapAscending: boolean) => void;
    showHintsDrawer: boolean;
    setShowHintsDrawer: (showHintsDrawer: boolean) => void;
    hintsError: string;
    setHintsError: (hintsError: string) => void;
}

let useHintsFormStore: StoreWithSelectors<HintsFormState>;

const initialState = (
    set: (updater: (state: HintsFormState) => Partial<HintsFormState>) => void
) => ({
    handicapTips: [],
    setHandicapTips: (handicapTips: BigDataHintListResponse) => {
        set(state => {
            return { ...state, handicapTips };
        });
    },
    hintsSelected: '',
    setHintsSelected: (hintsSelected: string) => {
        set(state => {
            return { ...state, hintsSelected };
        });
    },
    timeAscending: false,
    setTimeAscending: (timeAscending: boolean) => {
        set(state => {
            return { ...state, timeAscending };
        });
    },
    handicapAscending: false,
    setHandicapAscending: (handicapAscending: boolean) => {
        set(state => {
            return { ...state, handicapAscending };
        });
    },
    showHintsDrawer: false,
    setShowHintsDrawer: (showHintsDrawer: boolean) => {
        set(state => {
            return { ...state, showHintsDrawer };
        });
    },
    hintsError: '',
    setHintsError: (hintsError: string) => {
        set(state => {
            return { ...state, hintsError };
        });
    },
    playList: [
        {
            label: '全場大小球',
            value: 'OVERUNDER'
        },
        {
            label: '半場大小球',
            value: 'OVERUNDERHALF'
        },
        {
            label: '全場让分',
            value: 'HANDICAP'
        },
        {
            label: '半場让分',
            value: 'HANDICAPHALF'
        }
    ]
});

const creatHintsFormStore = (init: InitState) =>
    (useHintsFormStore = initStore<HintsFormState>(initialState, init));

export { creatHintsFormStore, useHintsFormStore };
