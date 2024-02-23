import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetPredicativeAnalysisMatchResponse } from 'data-center';

interface InitState {
    aiPredictList: GetPredicativeAnalysisMatchResponse;
}

interface AiPredictState extends InitState {
    setAiPredictList: (aiPredictList: GetPredicativeAnalysisMatchResponse) => void;
}

let useAiPredictStore: StoreWithSelectors<AiPredictState>;

const initialState = (set: (data: Partial<AiPredictState>) => void) => ({
    aiPredictList: [],
    setAiPredictList: (aiPredictList: GetPredicativeAnalysisMatchResponse) => {
        set({ aiPredictList });
    }
});

const creatAiPredictStore = (init: InitState) =>
    (useAiPredictStore = initStore<AiPredictState>(initialState, init));

export { creatAiPredictStore, useAiPredictStore };
