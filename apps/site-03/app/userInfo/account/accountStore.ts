import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    loading: boolean;
}

export interface FormState {
    username: string;
    birthday: number;
    birthdayDisplay: string;
    phoneNumber: string;
    wechat: string;
    qq: string;
    email: string;
    description: string;
}

interface SubmittedState {
    username: boolean;
    birthday: boolean;
    phoneNumber: boolean;
    wechat: boolean;
    qq: boolean;
    email: boolean;
    description: boolean;
}

interface AccountState extends InitState {
    formState: FormState;
    submittedState: SubmittedState;
    imgSrc: string;
    imgUpload: string;
    setFormState: (formState: FormState) => void;
    setSubmittedState: (submittedState: SubmittedState) => void;
    setImgSrc: (imgSrc: string) => void;
    setImgUpload: (setImgUpload: string) => void;
}

let useAccountStore: StoreWithSelectors<AccountState>;

const initialState = (set: (updater: (state: AccountState) => Partial<AccountState>) => void) => ({
    loading: false,
    formState: {
        username: '',
        birthday: 0,
        phoneNumber: '',
        wechat: '',
        qq: '',
        email: '',
        description: '',
        birthdayDisplay: '添加生日'
    },
    submittedState: {
        username: false,
        birthday: false,
        phoneNumber: false,
        wechat: false,
        qq: false,
        email: false,
        description: false
    },
    imgSrc: '',
    imgUpload: '',
    setFormState: (formState: FormState) => {
        set(state => ({ ...state, formState }));
    },
    setSubmittedState: (submittedState: SubmittedState) => {
        set(state => ({ ...state, submittedState }));
    },
    setImgSrc: (imgSrc: string) => {
        set(state => ({ ...state, imgSrc }));
    },
    setImgUpload: (imgUpload: string) => {
        set(state => ({ ...state, imgUpload }));
    }
});

const creatAccountStore = (init: InitState) => {
    useAccountStore = initStore<AccountState>(initialState, init);
};

export { creatAccountStore, useAccountStore };
