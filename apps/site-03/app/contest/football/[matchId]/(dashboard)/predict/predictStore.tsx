import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { Predict } from '@/types/predict';

interface InitState {
    predictList: Predict[];
}

interface PredictState extends InitState {
    loading: boolean;
}

let usePredictStore: StoreWithSelectors<PredictState>;

const initialState = (set: (data: Partial<PredictState>) => void) => ({
    predictList: [],
    loading: false,
    setSlideList: (predictList: Predict[]) => {
        set({ predictList });
    }
});

const creatPredictStore = (init: InitState) =>
    (usePredictStore = initStore<PredictState>(initialState, init));

export { creatPredictStore, usePredictStore };
