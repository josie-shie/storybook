import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetUnlockedPostResponse } from 'data-center';

interface InitState {
    articleList: GetUnlockedPostResponse;
}

interface ArticleState extends InitState {
    setArticleList: (articleList: GetUnlockedPostResponse) => void;
}

let useArticleStore: StoreWithSelectors<ArticleState>;

const initialState = (set: (data: Partial<ArticleState>) => void) => ({
    articleList: [],
    setArticleList: (articleList: GetUnlockedPostResponse) => {
        set({ articleList });
    }
});

const creatArticleStore = (init: InitState) =>
    (useArticleStore = initStore<ArticleState>(initialState, init));

export { creatArticleStore, useArticleStore };
