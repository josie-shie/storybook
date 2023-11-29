import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    loading: boolean;
}

interface AuthState extends InitState {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isOpen: boolean) => void;
    register: {
        sendCodeSuccess: boolean;
        setSendCodeSuccess: (sendCodeSuccess: boolean) => void;
        countDownNumber: number;
        setCountDownNumber: (countDownNumber: number) => void;
    };
    login: {
        verifyPhoto: string;
        setVerifyPhoto: (verifyPhoto: string) => void;
    };
}

let useAuthStore: StoreWithSelectors<AuthState>;

const initialState = (set: (updater: (state: AuthState) => Partial<AuthState>) => void) => ({
    loading: false,
    isDrawerOpen: false,
    setIsDrawerOpen: (isDrawerOpen: boolean) => {
        set(state => {
            return {
                ...state,
                isDrawerOpen
            };
        });
    },
    register: {
        sendCodeSuccess: false,
        setSendCodeSuccess: (sendCodeSuccess: boolean) => {
            set(state => {
                return {
                    register: {
                        ...state.register,
                        sendCodeSuccess
                    }
                };
            });
        },
        countDownNumber: 60,
        setCountDownNumber: (countDownNumber: number) => {
            set(state => {
                return {
                    register: {
                        ...state.register,
                        countDownNumber
                    }
                };
            });
        }
    },
    login: {
        verifyPhoto: '',
        setVerifyPhoto: (verifyPhoto: string) => {
            set(state => {
                return {
                    login: {
                        ...state.login,
                        verifyPhoto
                    }
                };
            });
        }
    }
});

const creatAuthStore = (init: InitState) => {
    useAuthStore = initStore<AuthState>(initialState, init);
};

export { creatAuthStore, useAuthStore };
