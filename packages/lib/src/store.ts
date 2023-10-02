import type { StoreApi } from 'zustand';
import { createStore, useStore as takeStore } from 'zustand';

export type StoreWithSelectors<T> = StoreApi<T> & { use: { [K in keyof T]: () => T[K] } };

type Setter<T> = (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean
) => void;

type InitialStateFunction<T> = (set: Setter<T>, getState: () => T, store: StoreApi<T>) => T;

export const createSelectors = <T>(store: StoreApi<T>): StoreWithSelectors<T> => {
    const stateKeys = Object.keys(store.getState() as object) as (keyof T)[];

    const emptySelectors = Object.assign(
        {},
        ...stateKeys.map(key => ({ [key]: () => undefined }))
    ) as { [K in keyof T]: () => T[K] };

    const selectors = stateKeys.reduce<{ [K in keyof T]: () => T[K] }>((acc, key) => {
        acc[key] = () => takeStore(store, s => s[key]);
        return acc;
    }, emptySelectors);

    const extendedStore = store as StoreWithSelectors<T>;
    extendedStore.use = selectors;

    return extendedStore;
};

export const initStore = <T>(initialState: InitialStateFunction<T>, initProps?: Partial<T>) => {
    const storeInstance = createStore<T>()((set, getState, store) => {
        const state = initialState(set, getState, store);
        return {
            ...state,
            ...initProps
        };
    });
    const useNewStore = createSelectors(storeInstance);

    return useNewStore;
};
