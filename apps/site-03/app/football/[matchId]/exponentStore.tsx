import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { CompanyInfo, CompanyList } from 'data-center';

interface InitState {
    companyInfo: CompanyInfo;
    companyList: CompanyList;
}

type TabListType = 'handicap' | 'overUnder' | 'winDrawLose' | 'corners';

interface ExponentState extends InitState {
    isDetailLoading: boolean;
    isDetailOpen: boolean;
    detailCompanyId: number;
    detailSelectedKind: TabListType;
    setIsDetailLoading: (isDetailLoading: boolean) => void;
    setCompanyInfo: (companyInfo: CompanyInfo) => void;
    setIsDetailOpen: (isOpen: boolean) => void;
    setDetailSelectedKind: (detailSelectedKind: TabListType) => void;
    setDetailCompanyId: (detailCompanyId: number) => void;
    setDetailOption: (detailCompanyId: number, detailSelectedKind: TabListType) => void;
}

let useExponentStore: StoreWithSelectors<ExponentState>;

const initialState = (
    set: (updater: (state: ExponentState) => Partial<ExponentState>) => void
) => ({
    companyInfo: {
        handicap: {},
        overUnder: {},
        winDrawLose: {},
        corners: {}
    } as CompanyInfo,
    companyList: {
        handicap: [],
        overUnder: [],
        winDrawLose: [],
        corners: []
    } as CompanyList,
    isDetailLoading: false,
    isDetailOpen: false,
    detailCompanyId: 3,
    detailSelectedKind: 'handicap' as TabListType,
    setCompanyInfo: (companyInfo: CompanyInfo) => {
        set(state => {
            return { ...state, companyInfo };
        });
    },
    setIsDetailLoading: (isDetailLoading: boolean) => {
        set(state => {
            return { ...state, isDetailLoading };
        });
    },
    setIsDetailOpen: (isOpen: boolean) => {
        set(state => {
            return { ...state, isDetailOpen: isOpen };
        });
    },
    setDetailSelectedKind: (detailSelectedKind: TabListType) => {
        set(state => {
            return { ...state, detailSelectedKind };
        });
    },
    setDetailCompanyId: (detailCompanyId: number) => {
        set(state => {
            return { ...state, detailCompanyId };
        });
    },
    setDetailOption: (detailCompanyId: number, detailSelectedKind: TabListType) => {
        set(state => {
            return { ...state, detailCompanyId, detailSelectedKind };
        });
    }
});

const createExponentStore = (init: InitState) =>
    (useExponentStore = initStore<ExponentState>(initialState, init));

export { createExponentStore, useExponentStore };
