import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface InitState {
    loading: boolean;
}

interface QueryFormState extends InitState {
    setLoading: (loading: boolean) => void;
}

let useQueryFormStore: StoreWithSelectors<QueryFormState>;

const initialState = (
    set: (updater: (state: QueryFormState) => Partial<QueryFormState>) => void
) => ({
    loading: false,
    setLoading: (loading: boolean) => {
        set(state => {
            return {
                ...state,
                loading
            };
        });
    }
});

const creatQueryFormStore = (init: InitState) =>
    (useQueryFormStore = initStore<QueryFormState>(initialState, init));

export { creatQueryFormStore, useQueryFormStore };
