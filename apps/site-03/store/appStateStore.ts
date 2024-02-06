import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    isClientSide: boolean;
}

interface UserState extends InitState {
    setIsClientSide: (isClientSide: boolean) => void;
}

let isInit = true;
let appStateStore: StoreWithSelectors<UserState>;

const initialState = (set: (updater: (state: UserState) => Partial<UserState>) => void) => ({
    isClientSide: false,
    setIsClientSide: (isClientSide: boolean) => {
        set(state => {
            return {
                ...state,
                isClientSide
            };
        });
    }
});

const createAppStateStore = (init: InitState) => {
    if (isInit) {
        appStateStore = initStore<UserState>(initialState, init);
        isInit = false;
    }
};

export { createAppStateStore, appStateStore };
