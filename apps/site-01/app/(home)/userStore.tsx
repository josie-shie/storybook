import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    token: string;
}

interface UserState extends InitState {
    isLogin: boolean;
    setToken: (token: string) => void;
}

let useUserStore: StoreWithSelectors<UserState>;

const initialState = (set: (data: Partial<UserState>) => void) => ({
    isLogin: false,
    token: '',
    setToken: (token: string) => {
        set({ token, isLogin: true });
    }
});

const creatUserStore = (init: InitState) =>
    (useUserStore = initStore<UserState>(initialState, init));

export { creatUserStore, useUserStore };
