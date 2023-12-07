import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetMatchPostsResponse } from 'data-center';

interface InitState {
    predictList: GetMatchPostsResponse;
}

interface PredictState extends InitState {
    loading: boolean;
}

let usePredictStore: StoreWithSelectors<PredictState>;

const initialState = (set: (data: Partial<PredictState>) => void) => ({
    predictList: [],
    loading: false,
    setPredictList: (predictList: GetMatchPostsResponse) => {
        set({ predictList });
    }
});

const creatPredictStore = (init: InitState) =>
    (usePredictStore = initStore<PredictState>(initialState, init));

export { creatPredictStore, usePredictStore };
