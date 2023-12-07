import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface SubscribePlan {
    planId: number;
    period: number;
    discount: string;
    price: number;
    freePlan: number;
    unlock: number;
}

interface InitState {
    planList: SubscribePlan[];
}

interface SubscribeState extends InitState {
    planId: number;
    isVip: boolean;
    isChecked: boolean;
    masterPlan: number;
    unlockArticle: number;
    setPlanId: (planId: number) => void;
    setIsVip: (isVip: boolean) => void;
    setIsChecked: (isChecked: boolean) => void;
    setPlanList: (planList: SubscribePlan[]) => void;
    setMasterPlan: (masterPlan: number) => void;
    setUnlockArticle: (unlockArticle: number) => void;
}

let useSubscribeStore: StoreWithSelectors<SubscribeState>;

const initialState = (set: (data: Partial<SubscribeState>) => void) => ({
    planId: 1,
    isVip: false,
    isChecked: false,
    planList: [],
    masterPlan: 2,
    unlockArticle: 1,
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
    setMasterPlan: (masterPlan: number) => {
        set({ masterPlan });
    },
    setUnlockArticle: (unlockArticle: number) => {
        set({ unlockArticle });
    }
});

const creatSubscriberStore = (init: InitState) =>
    (useSubscribeStore = initStore<SubscribeState>(initialState, init));

export { creatSubscriberStore, useSubscribeStore };
