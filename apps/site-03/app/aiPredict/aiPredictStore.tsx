import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetPredicativeAnalysisMatchResponse } from 'data-center';

interface InitState {
    aiPredictList: GetPredicativeAnalysisMatchResponse;
    aiHistoryList: GetPredicativeAnalysisMatchResponse;
}

interface AiPredictState extends InitState {
    setAiPredictList: (aiPredictList: GetPredicativeAnalysisMatchResponse) => void;
    setAiHistoryList: (aiPredictList: GetPredicativeAnalysisMatchResponse) => void;
}

let useAiPredictStore: StoreWithSelectors<AiPredictState>;

const initialState = (set: (data: Partial<AiPredictState>) => void) => ({
    aiPredictList: [],
    aiHistoryList: [],
    setAiPredictList: (aiPredictList: GetPredicativeAnalysisMatchResponse) => {
        set({ aiPredictList });
    },
    setAiHistoryList: (aiHistoryList: GetPredicativeAnalysisMatchResponse) => {
        set({ aiHistoryList });
    }
});

const creatAiPredictStore = (init: InitState) =>
    (useAiPredictStore = initStore<AiPredictState>(initialState, init));

export { creatAiPredictStore, useAiPredictStore };
