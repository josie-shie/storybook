import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    token: string;
}

interface UserState extends InitState {
    isLogin: boolean;
    setToken: (token: string) => void;
}

let isInit = true;
let useUserStore: StoreWithSelectors<UserState>;

const initialState = (set: (data: Partial<UserState>) => void) => ({
    isLogin: false,
    token: '',
    setToken: (token: string) => {
        localStorage.setItem('token', token);
        set({ token, isLogin: true });
    }
});

const creatUserStore = (init: InitState) => {
    if (isInit) {
        useUserStore = initStore<UserState>(initialState, init);
        isInit = false;
    }
};

export { creatUserStore, useUserStore };
