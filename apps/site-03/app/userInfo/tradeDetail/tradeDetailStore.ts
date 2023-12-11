import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

export type DateOption = 'all' | 'today' | 'week' | 'month' | 'threeMonths';
export type TradeTypeOption = 'all' | 'deposit' | 'inCome' | 'expend';
export interface RechargeData {
    currency: string;
    exchangeRate: number;
    time: number;
    tradeNumber: string;
    result: number;
    status: 'inProgress' | 'fail' | 'completed';
    overage: number;
}

export interface PaymentData {
    type: number;
    time: number;
    result: number;
    overage: number;
}

interface OptionType {
    label: string;
    value: string;
}

export interface TradeDetailItem {
    id: number;
    tradeType: Omit<TradeTypeOption, 'all'>;
    data: RechargeData | PaymentData;
}

interface InitState {
    tradeDetailList: TradeDetailItem[];
}

interface TradeDetailState extends InitState {
    setTradeDetailList: (tradeDetailList: TradeDetailItem[]) => void;
    dateOption: OptionType[];
    tradeOption: OptionType[];
}

const initialState = (
    set: (updater: (state: TradeDetailState) => Partial<TradeDetailState>) => void
) => ({
    tradeDetailList: [],
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
    setTradeDetailList: (tradeDetailList: TradeDetailItem[]) => {
        set(state => {
            return {
                ...state,
                tradeDetailList
            };
        });
    }
});

let useTardeDetailStore: StoreWithSelectors<TradeDetailState>;

const creatTardeDetailStore = (init: InitState) =>
    (useTardeDetailStore = initStore<TradeDetailState>(initialState, init));

export { creatTardeDetailStore, useTardeDetailStore };
