import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface Article {
    id: number;
    name: string;
    unlock: boolean;
    unlockNumber: number;
    hotStreak: number;
    ranking: number;
    title: string;
    cupName: string;
    cupTime: string;
    homeTeam: string;
    awayTeam: string;
    postTime: string;
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
