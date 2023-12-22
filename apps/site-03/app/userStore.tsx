import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type {
    GetMemberInfoResponse,
    GetMemberSubscriptionStatusResponse,
    TagType
} from 'data-center';

interface InitState {
    token: string;
    userInfo: GetMemberInfoResponse;
    tags: TagType;
    memberSubscribeStatus: GetMemberSubscriptionStatusResponse;
    isLogin: boolean;
}

interface UserState extends InitState {
    authQuery: string;
    userInfoIsLoading: boolean;
    isVipUseAnalysis: boolean;
    setIsLogin: (isLogin: boolean) => void;
    setUserInfoIsLoading: (userInfoIsLoading: boolean) => void;
    setToken: (token: string) => void;
    setAuthQuery: (authQuery: string) => void;
    setUserInfo: (userInfo: GetMemberInfoResponse) => void;
    setTags: (tags: TagType) => void;
    setMemberSubscribeStatus: (memberSubscribeStatus: GetMemberSubscriptionStatusResponse) => void;
    setIsVipUseAnalysis: (isVipUseAnalysis: boolean) => void;
}

let isInit = true;
let useUserStore: StoreWithSelectors<UserState>;

const initialState = (set: (updater: (state: UserState) => Partial<UserState>) => void) => ({
    userInfo: {} as GetMemberInfoResponse,
    tags: {} as TagType,
    memberSubscribeStatus: {} as GetMemberSubscriptionStatusResponse,
    userInfoIsLoading: false,
    isVipUseAnalysis: false,
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
                userInfo,
                userInfoIsLoading: false
            };
        });
    },
    setTags: (tags: TagType) => {
        set(state => {
            return {
                ...state,
                tags
            };
        });
    },
    setMemberSubscribeStatus: (memberSubscribeStatus: GetMemberSubscriptionStatusResponse) => {
        set(state => {
            return {
                ...state,
                memberSubscribeStatus
            };
        });
    },
    setUserInfoIsLoading: (userInfoIsLoading: boolean) => {
        set(state => {
            return {
                ...state,
                userInfoIsLoading
            };
        });
    },
    setIsVipUseAnalysis: (isVipUseAnalysis: boolean) => {
        set(state => {
            return {
                ...state,
                isVipUseAnalysis
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
