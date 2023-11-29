import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import Cookies from 'js-cookie';

interface InitState {
    authQuery: string;
}

interface UserState extends InitState {
    token: string;
    isLogin: boolean;
    setToken: (token: string) => void;
    setAuthQuery: (authQuery: string) => void;
}

let isInit = true;
let useUserStore: StoreWithSelectors<UserState>;

const initialState = (set: (updater: (state: UserState) => Partial<UserState>) => void) => ({
    isLogin: Boolean(Cookies.get('access')),
    token: Cookies.get('access') || '',
    setToken: (token: string) => {
        set(state => {
            return {
                ...state,
                token,
                isLogin: true
            };
        });
    },
    authQuery: '',
    setAuthQuery: (authQuery: string) => {
        const url = new URL(window.document.URL);
        url.searchParams.set('auth', authQuery);
        history.pushState({}, '', url);

        set(state => {
            return {
                ...state,
                authQuery
            };
        });
    }
});

const creatUserStore = (init: InitState) => {
    if (isInit) {
        useUserStore = initStore<UserState>(initialState, init);
        isInit = false;
    }
};

export { creatUserStore, useUserStore };
