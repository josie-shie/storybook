import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ReactNode } from 'react';

interface InitState {
    hintsSelectPlay: string;
    hintsSelectType: string;
    hintsSelectProgres: string;
}

interface LongDragonState extends InitState {
    dialogContent: ReactNode;
    openErrorDialog: boolean;
    setOpenErrorDialog: (openErrorDialog: boolean) => void;
    setDialogContent: (dialogContent: ReactNode) => void;
    setHintsSelectPlay: (hintsSelectPlay: string) => void;
    setHintsSelectType: (hintsSelectType: string) => void;
    setHintsSelectProgres: (hintsSelectProgres: string) => void;
}

let isInit = true;
let useLongDragonStore: StoreWithSelectors<LongDragonState>;

const initialState = (
    set: (updater: (state: LongDragonState) => Partial<LongDragonState>) => void
) => ({
    openErrorDialog: false,
    dialogContent: null,
    setOpenErrorDialog: (openErrorDialog: boolean) => {
        set(state => {
            return { ...state, openErrorDialog };
        });
    },
    setDialogContent: (dialogContent: ReactNode) => {
        set(state => {
            return { ...state, dialogContent };
        });
    },
    hintsSelectPlay: '',
    setHintsSelectPlay: (hintsSelectPlay: string) => {
        set(state => {
            return { ...state, hintsSelectPlay };
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
