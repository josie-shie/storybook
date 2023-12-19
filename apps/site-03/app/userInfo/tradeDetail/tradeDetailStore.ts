import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

export type DateOption = 'ALL' | 'WEEK' | 'TWOWEEKS' | 'MONTH' | 'RANGE';
export type TradeTypeOption = 'ALL' | 'RECHARGE' | 'INCOME' | 'PAY';
export interface RechargeData {
    balanceLogId: number;
    changeTypeDisplayName: string;
    changeTypeCategory: string;
    changeTypeCategoryDisplayName: string;
    rechargeStatus: 'PENDING' | 'FAIL' | 'SUCCESS';
    rechargeId: string;
    currencyCode: string;
    exchangeRate: number;
    amountOfChange: number;
    balanceAfter: number;
    createdAt: number;
}

export interface PaymentData {
    balanceLogId: number;
    changeTypeDisplayName: string;
    changeTypeCategory: string;
    changeTypeCategoryDisplayName: string;
    amountOfChange: number;
    balanceAfter: number;
    createdAt: number;
}

interface OptionType {
    label: string;
    value: string;
}

interface TradeDetailItem {
    balanceId: number;
    changeTypeCategory: Omit<TradeTypeOption, 'ALL'>;
    data: RechargeData | PaymentData;
}
interface Pagination {
    pageCount: number;
    totalCount: number;
}

export interface TradeDetailInterface {
    pagination: Pagination;
    detailList: TradeDetailItem[];
}

interface InitState {
    tradeDetailList: TradeDetailInterface;
}

interface TradeDetailState extends InitState {
    setTradeDetailList: (tradeDetailList: TradeDetailInterface) => void;
    dateOption: OptionType[];
    tradeOption: OptionType[];
}

const initialState = (
    set: (updater: (state: TradeDetailState) => Partial<TradeDetailState>) => void
) => ({
    tradeDetailList: {
        detailList: [],
        pagination: {
            pageCount: 0,
            totalCount: 0
        }
    },
    dateOption: [
        {
            label: '全部時間',
            value: 'ALL'
        },
        {
            label: '一週',
            value: 'WEEK'
        },
        {
            label: '兩週',
            value: 'TWOWEEKS'
        },
        {
            label: '一个月',
            value: 'MONTH'
        }
    ],
    tradeOption: [
        {
            label: '全部分类',
            value: 'ALL'
        },
        {
            label: '充值',
            value: 'RECHARGE'
        },
        {
            label: '收入',
            value: 'INCOME'
        },
        {
            label: '支付',
            value: 'PAY'
        }
    ],
    setTradeDetailList: (tradeDetailList: TradeDetailInterface) => {
        set(state => {
            return {
                ...state,
                tradeDetailList
            };
        });
    }
});

let useTardeDetailStore: StoreWithSelectors<TradeDetailState>;

const creatTardeDetailStore = () => {
    useTardeDetailStore = initStore<TradeDetailState>(initialState);
};

export { creatTardeDetailStore, useTardeDetailStore };
