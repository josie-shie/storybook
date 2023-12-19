import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetSubscriptionPlanListResponse } from 'data-center';

interface SubscribePlan {
    planId: number;
    period: number;
    discount: string;
    price: number;
    freePlan: number;
    unlock: number;
}

interface InitState {
    yearPlanList: GetSubscriptionPlanListResponse;
    planList: SubscribePlan[];
}

interface SubscribeState extends InitState {
    planId: number;
    isVip: boolean;
    isChecked: boolean;
    subscribeStatus: boolean;
    setPlanId: (planId: number) => void;
    setIsVip: (isVip: boolean) => void;
    setIsChecked: (isChecked: boolean) => void;
    setPlanList: (planList: SubscribePlan[]) => void;
    setSubscribeStatus: (subscribeStatus: boolean) => void;
    setYearPlanList: (yearPlanList: GetSubscriptionPlanListResponse) => void;
}

let useSubscribeStore: StoreWithSelectors<SubscribeState>;

const initialState = (set: (data: Partial<SubscribeState>) => void) => ({
    planId: 1,
    isVip: false,
    isChecked: false,
    planList: [],
    yearPlanList: [],
    subscribeStatus: false,
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
    },
    setSubscribeStatus: (subscribeStatus: boolean) => {
        set({ subscribeStatus });
    },
    setYearPlanList: (yearPlanList: GetSubscriptionPlanListResponse) => {
        set({ yearPlanList });
    }
});

const creatSubscriberStore = (init: InitState) =>
    (useSubscribeStore = initStore<SubscribeState>(initialState, init));

export { creatSubscriberStore, useSubscribeStore };
