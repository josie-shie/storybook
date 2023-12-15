import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ReactNode } from 'react';

interface InitState {
    dialogContentType: string;
    dialogContent: ReactNode;
    openNoramlDialog: boolean;
}

interface DiscSelectState extends InitState {
    setDialogContentType: (dialogContentType: string) => void;
    setOpenNormalDialog: (openNoramlDialog: boolean) => void;
    setDialogContent: (dialogContent: ReactNode) => void;
}

let useDiscSelectStore: StoreWithSelectors<DiscSelectState>;

const initialState = (
    set: (updater: (state: DiscSelectState) => Partial<DiscSelectState>) => void
) => ({
    dialogContentType: 'system',
    openNoramlDialog: false,
    dialogContent: null,
    setOpenNormalDialog: (openNoramlDialog: boolean) => {
        set(state => {
            return { ...state, openNoramlDialog };
        });
    },
    setDialogContentType: (dialogContentType: string) => {
        set(state => {
            return { ...state, dialogContentType };
        });
    },
    setDialogContent: (dialogContent: ReactNode) => {
        set(state => {
            return { ...state, dialogContent };
        });
    }
});

const creatDiscSelectStore = (init: InitState) =>
    (useDiscSelectStore = initStore<DiscSelectState>(initialState, init));

export { creatDiscSelectStore, useDiscSelectStore };
