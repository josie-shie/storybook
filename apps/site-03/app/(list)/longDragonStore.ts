import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ReactNode } from 'react';
import type { BigDataHintListResponse } from 'data-center';

interface InitState {
    hintsSelectType: string;
    hintsSelectProgres: string;
    handicapTips: BigDataHintListResponse;
}

interface LongDragonState extends InitState {
    showLongDragon: boolean;
    dialogContent: ReactNode;
    openErrorDialog: boolean;
    setHandicapTips: (handicapTips: BigDataHintListResponse) => void;
    setOpenErrorDialog: (openErrorDialog: boolean) => void;
    setDialogContent: (dialogContent: ReactNode) => void;
    setHintsSelectType: (hintsSelectType: string) => void;
    setHintsSelectProgres: (hintsSelectProgres: string) => void;
    setShowLongDragon: (showLongDragon: boolean) => void;
}

let isInit = true;
let useLongDragonStore: StoreWithSelectors<LongDragonState>;

const initialState = (
    set: (updater: (state: LongDragonState) => Partial<LongDragonState>) => void
) => ({
    showLongDragon: false,
    openErrorDialog: false,
    dialogContent: null,
    handicapTips: [],
    setHandicapTips: (handicapTips: BigDataHintListResponse) => {
        set(state => {
            return { ...state, handicapTips };
        });
    },
    setOpenErrorDialog: (openErrorDialog: boolean) => {
        set(state => {
            return { ...state, openErrorDialog };
        });
    },
    setShowLongDragon: (showLongDragon: boolean) => {
        set(state => {
            return { ...state, showLongDragon };
        });
    },
    setDialogContent: (dialogContent: ReactNode) => {
        set(state => {
            return { ...state, dialogContent };
        });
    },
    hintsSelectType: '',
    setHintsSelectType: (hintsSelectType: string) => {
        set(state => {
            return { ...state, hintsSelectType };
        });
    },
    hintsSelectProgres: '',
    setHintsSelectProgres: (hintsSelectProgres: string) => {
        set(state => {
            return { ...state, hintsSelectProgres };
        });
    }
});

const creatLongDragonStore = (init: InitState) => {
    if (isInit) {
        useLongDragonStore = initStore<LongDragonState>(initialState, init);
        isInit = false;
    }
};

export { creatLongDragonStore, useLongDragonStore };
