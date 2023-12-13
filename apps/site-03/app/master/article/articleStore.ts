import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import { type RecommendPost } from 'data-center';

interface InitState {
    articleList: RecommendPost[];
}

interface ArticleState extends InitState {
    setArticleList: ({ articleList }: { articleList: RecommendPost[] }) => void;
}

let useArticleStore: StoreWithSelectors<ArticleState>;

const initialState = (set: (updater: (state: ArticleState) => Partial<ArticleState>) => void) => ({
    articleList: [],
    setArticleList: ({ articleList }: { articleList: RecommendPost[] }) => {
        set(() => ({ articleList }));
    }
});

const creatArticleStore = (init: InitState) =>
    (useArticleStore = initStore<ArticleState>(initialState, init));

export { creatArticleStore, useArticleStore };
