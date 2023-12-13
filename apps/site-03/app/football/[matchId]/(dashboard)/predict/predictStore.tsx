import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetPredictionMatchPostsResponse } from 'data-center';

interface InitState {
    predictList: GetPredictionMatchPostsResponse;
}

interface PredictState extends InitState {
    loading: boolean;
}

let usePredictStore: StoreWithSelectors<PredictState>;

const initialState = (set: (data: Partial<PredictState>) => void) => ({
    predictList: [],
    loading: false,
    setPredictList: (predictList: GetPredictionMatchPostsResponse) => {
        set({ predictList });
    }
});

const creatPredictStore = (init: InitState) =>
    (usePredictStore = initStore<PredictState>(initialState, init));

export { creatPredictStore, usePredictStore };
