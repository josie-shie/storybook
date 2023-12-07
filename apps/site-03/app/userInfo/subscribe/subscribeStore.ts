import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface SubscribePlan {
    planId: number;
    period: number;
    discount: string;
    price: number;
}

interface InitState {
    planList: SubscribePlan[];
}

interface SubscribeState extends InitState {
    planId: number;
    isVip: boolean;
    isChecked: boolean;
    setPlanId: (planId: number) => void;
    setIsVip: (isVip: boolean) => void;
    setIsChecked: (isChecked: boolean) => void;
    setPlanList: (planList: SubscribePlan[]) => void;
}

let useSubscribeStore: StoreWithSelectors<SubscribeState>;

const initialState = (set: (data: Partial<SubscribeState>) => void) => ({
    planId: 1,
    isVip: false,
    isChecked: false,
    planList: [],
    setPlanId: (planId: number) => {
        set({ planId });
    },
    setIsVip: (isVip: boolean) => {
        set({ isVip });
    },
    setIsChecked: (isChecked: boolean) => {
        set({ isChecked });
    },
    setPlanList: (planList: SubscribePlan[]) => {
        set({ planList });
    }
});

const creatSubscriberStore = (init: InitState) =>
    (useSubscribeStore = initStore<SubscribeState>(initialState, init));

export { creatSubscriberStore, useSubscribeStore };
