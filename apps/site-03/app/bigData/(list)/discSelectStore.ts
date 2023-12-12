import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    openNoramlDialog: boolean;
}

interface DiscSelectState extends InitState {
    setOpenNormalDialog: (openNoramlDialog: boolean) => void;
}

let useDiscSelectStore: StoreWithSelectors<DiscSelectState>;

const initialState = (
    set: (updater: (state: DiscSelectState) => Partial<DiscSelectState>) => void
) => ({
    openNoramlDialog: false,
    setOpenNormalDialog: (openNoramlDialog: boolean) => {
        set(state => {
            return { ...state, openNoramlDialog };
        });
    }
});

const creatDiscSelectStore = (init: InitState) =>
    (useDiscSelectStore = initStore<DiscSelectState>(initialState, init));

export { creatDiscSelectStore, useDiscSelectStore };
