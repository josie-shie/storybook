import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetMemberInfoResponse } from 'data-center';

interface InitState {
    authQuery: string;
    userInfo: GetMemberInfoResponse;
}

interface UserState extends InitState {
    token: string;
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
    setToken: (token: string) => void;
    setAuthQuery: (authQuery: string) => void;
    setUserInfo: (userInfo: GetMemberInfoResponse) => void;
}

let isInit = true;
let useUserStore: StoreWithSelectors<UserState>;

const initialState = (set: (updater: (state: UserState) => Partial<UserState>) => void) => ({
    userInfo: {} as GetMemberInfoResponse,
    isLogin: false,
    token: '',
    setIsLogin: (isLogin: boolean) => {
        set(state => {
            return {
                ...state,
                isLogin
            };
        });
    },
    setUserInfo: (userInfo: GetMemberInfoResponse) => {
        set(state => {
            return {
                ...state,
                userInfo
            };
        });
    },
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
