import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import { type RecommendPost } from 'data-center';
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
    articleList: RecommendPost[];
    predictArticleList: PredictArticle[];
}

interface ArticleState extends InitState {
    setArticleList: ({ articleList }: { articleList: RecommendPost[] }) => void;
    setPredictArticleList: ({
        predictArticleList
    }: {
        predictArticleList: PredictArticle[];
    }) => void;
}

let useArticleStore: StoreWithSelectors<ArticleState>;

const initialState = (set: (updater: (state: ArticleState) => Partial<ArticleState>) => void) => ({
    articleList: [],
    predictArticleList: [],
    setArticleList: ({ articleList }: { articleList: RecommendPost[] }) => {
        set(() => ({ articleList }));
    },
    setPredictArticleList: ({ predictArticleList }: { predictArticleList: PredictArticle[] }) => {
        set(() => ({ predictArticleList }));
    }
});

const creatArticleStore = (init: InitState) =>
    (useArticleStore = initStore<ArticleState>(initialState, init));

export { creatArticleStore, useArticleStore };
