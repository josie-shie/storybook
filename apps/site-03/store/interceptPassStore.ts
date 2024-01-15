import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState<TData> {
    interceptData: TData;
}

interface InterceptState<TData> extends InitState<TData> {
    resetInterceptData: () => void;
    setInterceptData: (interceptData: TData) => void;
}

let isInit = true;
let useInterceptPassStore: StoreWithSelectors<InterceptState<object>>;

const initialState = <TData extends object>(
    set: (data: Partial<InterceptState<TData>>) => void
) => ({
    interceptData: {} as TData,
    resetInterceptData: () => {
        set({ interceptData: {} as TData });
    },
    setInterceptData: (interceptData: TData) => {
        set({ interceptData });
    }
});

const createInterceptPassStore = <TData extends object>(init: InitState<TData>) => {
    if (isInit) {
        useInterceptPassStore = initStore<InterceptState<TData>>(initialState, init);
        isInit = false;
    }
};

export { createInterceptPassStore, useInterceptPassStore };
