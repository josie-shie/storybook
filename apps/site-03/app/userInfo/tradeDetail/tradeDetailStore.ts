import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import { type Pagination, type GetMemberTransaction } from 'data-center';

export type DateOption = 'ALL' | 'WEEK' | 'TWOWEEKS' | 'MONTH' | 'RANGE';

export interface TradeDetailInterface {
    pagination: Pagination;
    detailList: GetMemberTransaction[];
}
interface InitState {
    tradeDetailList: TradeDetailInterface;
}
interface TradeDetailState extends InitState {
    setTradeDetailList: (tradeDetailList: TradeDetailInterface) => void;
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
