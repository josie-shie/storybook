import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

export type DateOption = 'ALL' | 'TOADY' | 'WEEK' | 'MONTH' | 'THREEWEEKS' | 'RANGE';
export type TradeTypeOption = 'ALL' | 'RECHARGE' | 'INCOME' | 'PAY';
export interface RechargeData {
    balanceLogId: number;
    changeTypeDisplayName: string;
    changeTypeCategory: string;
    changeTypeCategoryDisplayName: string;
    rechargeStatus: 'padding' | 'fail' | 'succes';
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
            value: 'all'
        },
        {
            label: '今日',
            value: 'today'
        },
        {
            label: '最近一週',
            value: 'week'
        },
        {
            label: '最近一个月',
            value: 'month'
        },
        {
            label: '最近三个月',
            value: 'threeMonths'
        }
    ],
    tradeOption: [
        {
            label: '全部分类',
            value: 'all'
        },
        {
            label: '充值',
            value: 'deposit'
        },
        {
            label: '收入',
            value: 'inCome'
        },
        {
            label: '支付',
            value: 'expend'
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
