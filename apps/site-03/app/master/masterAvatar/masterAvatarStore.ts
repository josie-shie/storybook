import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { HandicapType, GuessType } from '@/types/predict';

interface PredictArticle {
    id: number;
    analysisTitle: string;
    leagueName: string;
    isUnlocked: boolean;
    predictedPlay: HandicapType;
    predictionResult: GuessType;
    matchTime: number;
    createdAt: number;
    homeTeamName: string;
    awayTeamName: string;
}

interface InitState {
    predictArticleList: PredictArticle[];
}

interface MasterAvatarState extends InitState {
    setPredictArticleList: ({
        predictArticleList
    }: {
        predictArticleList: PredictArticle[];
    }) => void;
}

let useMasterAvatarStore: StoreWithSelectors<MasterAvatarState>;

const initialState = (
    set: (updater: (state: MasterAvatarState) => Partial<MasterAvatarState>) => void
) => ({
    predictArticleList: [],
    setPredictArticleList: ({ predictArticleList }: { predictArticleList: PredictArticle[] }) => {
        set(() => ({ predictArticleList }));
    }
});

const creatMasterAvatarStore = (init: InitState) =>
    (useMasterAvatarStore = initStore<MasterAvatarState>(initialState, init));

export { creatMasterAvatarStore, useMasterAvatarStore };
