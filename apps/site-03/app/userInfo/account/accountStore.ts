import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    loading: boolean;
}

export interface FormState {
    nickName: string;
    birthday: number;
    birthdayDisplay: string;
    phoneNumber: string;
    wechat: string;
    qq: string;
    email: string;
    description: string;
}

interface SubmittedState {
    nickName: boolean;
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
    isSubmitted: boolean;
    setFormState: (formState: FormState) => void;
    setSubmittedState: (submittedState: SubmittedState) => void;
    setImgSrc: (imgSrc: string) => void;
    setImgUpload: (setImgUpload: string) => void;
    setIsSubmitted: (isSubmitted: boolean) => void;
}

let useAccountStore: StoreWithSelectors<AccountState>;

const initialState = (set: (updater: (state: AccountState) => Partial<AccountState>) => void) => ({
    loading: false,
    formState: {
        nickName: '',
        birthday: 0,
        phoneNumber: '',
        wechat: '',
        qq: '',
        email: '',
        description: '',
        birthdayDisplay: '添加生日'
    },
    submittedState: {
        nickName: false,
        birthday: false,
        phoneNumber: false,
        wechat: false,
        qq: false,
        email: false,
        description: false
    },
    imgSrc: '',
    imgUpload: '',
    isSubmitted: false,
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
    },
    setIsSubmitted: (isSubmitted: boolean) => {
        set(state => ({ ...state, isSubmitted }));
    }
});

const creatAccountStore = (init: InitState) => {
    useAccountStore = initStore<AccountState>(initialState, init);
};

export { creatAccountStore, useAccountStore };
