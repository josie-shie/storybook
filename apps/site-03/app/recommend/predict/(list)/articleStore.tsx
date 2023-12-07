import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GuessType } from '@/types/predict';

interface Article {
    id: number;
    mentorName: string;
    isLock: boolean;
    unlockNumber: number;
    hotStreak: number;
    ranking: number;
    analysisTitle: string;
    leagueName: string;
    matchTime: number;
    awayTeamName: string;
    homeTeamName: string;
    createdAt: number;
    predictionResult: GuessType;
}

interface InitState {
    articleList: Article[];
}

interface ArticleState extends InitState {
    setArticleList?: (articleList: Article[]) => void;
}

let useArticleStore: StoreWithSelectors<ArticleState>;

const initialState = (set: (data: Partial<ArticleState>) => void) => ({
    articleList: [],
    setArticleList: (articleList: Article[]) => {
        set({ articleList });
    }
});

const creatArticleStore = (init: InitState) =>
    (useArticleStore = initStore<ArticleState>(initialState, init));

export { creatArticleStore, useArticleStore };
