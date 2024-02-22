import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetAiAnalyzeMatchResponse } from 'data-center';

interface InitState {
    aiPredictList: GetAiAnalyzeMatchResponse[];
}

interface AiPredictState extends InitState {
    setAiPredictList: (aiPredictList: GetAiAnalyzeMatchResponse[]) => void;
}

let useAiPredictStore: StoreWithSelectors<AiPredictState>;

const initialState = (set: (data: Partial<AiPredictState>) => void) => ({
    aiPredictList: [],
    setAiPredictList: (aiPredictList: GetAiAnalyzeMatchResponse[]) => {
        set({ aiPredictList });
    }
});

const creatAiPredictStore = (init: InitState) =>
    (useAiPredictStore = initStore<AiPredictState>(initialState, init));

export { creatAiPredictStore, useAiPredictStore };
