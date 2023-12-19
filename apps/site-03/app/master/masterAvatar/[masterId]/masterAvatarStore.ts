import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { HandicapType, GuessType } from '@/types/predict';
import { type RecommendPost } from 'data-center';

interface InitState {
    predictArticleList: RecommendPost[];
}

interface MasterAvatarState extends InitState {
    setPredictArticleList: ({
        predictArticleList
    }: {
        predictArticleList: RecommendPost[];
    }) => void;
}

let useMasterAvatarStore: StoreWithSelectors<MasterAvatarState>;

const initialState = (
    set: (updater: (state: MasterAvatarState) => Partial<MasterAvatarState>) => void
) => ({
    predictArticleList: [],
    setPredictArticleList: ({ predictArticleList }: { predictArticleList: RecommendPost[] }) => {
        set(() => ({ predictArticleList }));
    }
});

const creatMasterAvatarStore = (init: InitState) =>
    (useMasterAvatarStore = initStore<MasterAvatarState>(initialState, init));

export { creatMasterAvatarStore, useMasterAvatarStore };
