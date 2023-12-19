import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetSubscriptionPlanListResponse, GetRechargeOption } from 'data-center';

interface InitState {
    yearPlanList: GetSubscriptionPlanListResponse;
    planList: GetRechargeOption[];
}

interface SubscribeState extends InitState {
    planId: number;
    isVip: boolean;
    isChecked: boolean;
    setPlanId: (planId: number) => void;
    setIsVip: (isVip: boolean) => void;
    setIsChecked: (isChecked: boolean) => void;
    setPlanList: (planList: GetRechargeOption[]) => void;
    setYearPlanList: (yearPlanList: GetSubscriptionPlanListResponse) => void;
}

let useSubscribeStore: StoreWithSelectors<SubscribeState>;

const initialState = (set: (data: Partial<SubscribeState>) => void) => ({
    planId: 1,
    isVip: false,
    isChecked: false,
    planList: [],
    yearPlanList: [],
    setPlanId: (planId: number) => {
        set({ planId });
    },
    setIsVip: (isVip: boolean) => {
        set({ isVip });
    },
    setIsChecked: (isChecked: boolean) => {
        set({ isChecked });
    },
    setPlanList: (planList: GetRechargeOption[]) => {
        set({ planList });
    },
    setYearPlanList: (yearPlanList: GetSubscriptionPlanListResponse) => {
        set({ yearPlanList });
    }
});

const creatSubscriberStore = (init: InitState) =>
    (useSubscribeStore = initStore<SubscribeState>(initialState, init));

export { creatSubscriberStore, useSubscribeStore };
