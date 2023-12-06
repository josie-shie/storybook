import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

export interface RechargeData {
    currency: string;
    exchangeRate: number;
    time: string;
    tradeNumber: string;
    result: number;
    status: 'inProgress' | 'fail' | 'completed';
    overage: number;
}

export interface PaymentData {
    type: number;
    time: string;
    result: number;
    overage: number;
}

export interface TradeDetailItem {
    id: number;
    type: 'recharge' | 'payment' | 'income';
    data: RechargeData | PaymentData;
}

interface InitState {
    tradeDetailList: TradeDetailItem[];
}

interface TradeDetailState extends InitState {
    setFansMemberList?: (tradeDetailList: TradeDetailItem[]) => void;
}

let useTardeDetailStore: StoreWithSelectors<TradeDetailState>;

const initialState = (set: (data: Partial<TradeDetailState>) => void) => ({
    tradeDetailList: [],
    setTradeDetailList: (tradeDetailList: TradeDetailItem[]) => {
        set({ tradeDetailList });
    }
});

const creatTardeDetailStore = (init: InitState) =>
    (useTardeDetailStore = initStore<InitState>(initialState, init));

export { creatTardeDetailStore, useTardeDetailStore };
