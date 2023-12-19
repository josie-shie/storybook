import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { RecommendPost } from 'data-center';

interface InitState {
    predictList: RecommendPost[];
    totalPage: number;
    totalArticle: number;
}

interface PredictState extends InitState {
    loading: boolean;
    pushPredictList: (predictList: RecommendPost[]) => void;
}

let usePredictStore: StoreWithSelectors<PredictState>;

const initialState = (set: (updater: (state: PredictState) => Partial<PredictState>) => void) => ({
    predictList: [],
    totalPage: 0,
    totalArticle: 0,
    loading: false,
    setPredictList: (predictList: RecommendPost[]) => {
        set(state => {
            return { ...state, predictList };
        });
    },
    pushPredictList: (predictList: RecommendPost[]) => {
        set(state => {
            return { ...state, predictList: [...state.predictList, ...predictList] };
        });
    }
});

const creatPredictStore = (init: InitState) =>
    (usePredictStore = initStore<PredictState>(initialState, init));

export { creatPredictStore, usePredictStore };
