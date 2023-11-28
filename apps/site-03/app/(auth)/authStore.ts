import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    loading: boolean;
}

interface AuthState extends InitState {
    register: {
        isOpen: boolean;
        setIsOpen: (isOpen: boolean) => void;
        sendCodeSuccess: boolean;
        setSendCodeSuccess: (sendCodeSuccess: boolean) => void;
        countDownNumber: number;
        setCountDownNumber: (countDownNumber: number) => void;
    };
    login: {
        isOpen: boolean;
        setIsOpen: (isOpen: boolean) => void;
        verifyPhoto: string;
        setVerifyPhoto: (verifyPhoto: string) => void;
    };
}

let useAuthStore: StoreWithSelectors<AuthState>;

const initialState = (set: (updater: (state: AuthState) => Partial<AuthState>) => void) => ({
    loading: false,
    register: {
        isOpen: true,
        setIsOpen: (isOpen: boolean) => {
            set(state => {
                return {
                    register: {
                        ...state.register,
                        isOpen
                    }
                };
            });
        },
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
        isOpen: true,
        setIsOpen: (isOpen: boolean) => {
            set(state => {
                return {
                    login: {
                        ...state.login,
                        isOpen
                    }
                };
            });
        },
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
