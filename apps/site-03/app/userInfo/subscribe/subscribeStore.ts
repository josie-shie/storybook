import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetSubscriptionPlanListResponse, GetRechargeOption } from 'data-center';

interface InitState {
    yearPlanList: GetSubscriptionPlanListResponse;
    planList: GetRechargeOption[];
}

interface SubscribeState extends InitState {
    planId: number;
    platformAmount: number;
    currencyAmount: number;
    isVip: boolean;
    isChecked: boolean;
    setPlanId: (planId: number) => void;
    setPlatformAmount: (platformAmount: number) => void;
    setCurrencyAmount: (currencyAmount: number) => void;
    setIsVip: (isVip: boolean) => void;
    setIsChecked: (isChecked: boolean) => void;
    setPlanList: (planList: GetRechargeOption[]) => void;
    setYearPlanList: (yearPlanList: GetSubscriptionPlanListResponse) => void;
}

let useSubscribeStore: StoreWithSelectors<SubscribeState>;

const initialState = (set: (data: Partial<SubscribeState>) => void) => ({
    planId: 1,
    platformAmount: 0,
    currencyAmount: 0,
    isVip: false,
    isChecked: false,
    planList: [],
    yearPlanList: [],
    setPlanId: (planId: number) => {
        set({ planId });
    },
    setPlatformAmount: (platformAmount: number) => {
        set({ platformAmount });
    },
    setCurrencyAmount: (currencyAmount: number) => {
        set({ currencyAmount });
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
