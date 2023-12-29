import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetRechargeOption } from 'data-center';

interface InitState {
    planList: GetRechargeOption[];
}

interface RechargeState extends InitState {
    planId: number;
    amount: string;
    setPlanId: (planId: number) => void;
    setAmount: (amount: string) => void;
    setPlanList: (planList: GetRechargeOption[]) => void;
}

let isInit = true;
let useRechargeStore: StoreWithSelectors<RechargeState>;

const initialState = (
    set: (updater: (state: RechargeState) => Partial<RechargeState>) => void
) => ({
    planId: 1,
    amount: '',
    planList: [],
    setPlanId: (planId: number) => {
        set(state => {
            return { ...state, planId };
        });
    },
    setAmount: (amount: string) => {
        set(state => {
            return { ...state, amount };
        });
    },
    setPlanList: (planList: GetRechargeOption[]) => {
        set(state => {
            return { ...state, planList };
        });
    }
});

const creatRechargeStore = (init: InitState) => {
    if (isInit) {
        useRechargeStore = initStore<RechargeState>(initialState, init);
        isInit = false;
    }
};

export { creatRechargeStore, useRechargeStore };
