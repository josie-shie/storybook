import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { ReactNode } from 'react';

interface InitState {
    loading: boolean;
}

interface AuthState extends InitState {
    authContent: ReactNode | null;
    setAuthContent: (authContent: ReactNode | null) => void;
    title: ReactNode | null;
    setTitle: (authContent: ReactNode | null) => void;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isOpen: boolean) => void;
    removeAuthQuery: () => void;
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
    forgetPassword: {
        sendCodeSuccess: boolean;
        setSendCodeSuccess: (sendCodeSuccess: boolean) => void;
        countDownNumber: number;
        setCountDownNumber: (countDownNumber: number) => void;
    };
    changePassword: {
        verifyPhoto: string;
        setVerifyPhoto: (verifyPhoto: string) => void;
        sendCodeSuccess: boolean;
        setSendCodeSuccess: (sendCodeSuccess: boolean) => void;
        countDownNumber: number;
        setCountDownNumber: (countDownNumber: number) => void;
    };
}

let useAuthStore: StoreWithSelectors<AuthState>;

const initialState = (set: (updater: (state: AuthState) => Partial<AuthState>) => void) => ({
    loading: false,
    authContent: null,
    setAuthContent: (authContent: ReactNode | null) => {
        set(state => {
            return {
                ...state,
                authContent
            };
        });
    },
    title: null,
    setTitle: (title: ReactNode | null) => {
        set(state => {
            return {
                ...state,
                title
            };
        });
    },
    isDrawerOpen: false,
    setIsDrawerOpen: (isDrawerOpen: boolean) => {
        set(state => {
            return {
                ...state,
                isDrawerOpen
            };
        });
    },
    removeAuthQuery: () => {
        const url = new URL(window.document.URL);
        url.searchParams.delete('auth');
        history.pushState({}, '', url);
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
    },
    forgetPassword: {
        sendCodeSuccess: false,
        setSendCodeSuccess: (sendCodeSuccess: boolean) => {
            set(state => {
                return {
                    forgetPassword: {
                        ...state.forgetPassword,
                        sendCodeSuccess
                    }
                };
            });
        },
        countDownNumber: 60,
        setCountDownNumber: (countDownNumber: number) => {
            set(state => {
                return {
                    forgetPassword: {
                        ...state.forgetPassword,
                        countDownNumber
                    }
                };
            });
        }
    },
    changePassword: {
        verifyPhoto: '',
        setVerifyPhoto: (verifyPhoto: string) => {
            set(state => {
                return {
                    changePassword: {
                        ...state.changePassword,
                        verifyPhoto
                    }
                };
            });
        },
        sendCodeSuccess: false,
        setSendCodeSuccess: (sendCodeSuccess: boolean) => {
            set(state => {
                return {
                    changePassword: {
                        ...state.changePassword,
                        sendCodeSuccess
                    }
                };
            });
        },
        countDownNumber: 60,
        setCountDownNumber: (countDownNumber: number) => {
            set(state => {
                return {
                    changePassword: {
                        ...state.changePassword,
                        countDownNumber
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
