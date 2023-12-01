import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetLeisuNewsContentResponse } from 'data-center';

interface InitState {
    article: GetLeisuNewsContentResponse;
}

interface ArticleState extends InitState {
    setArticle: (article: GetLeisuNewsContentResponse) => void;
}

let useArticleStore: StoreWithSelectors<ArticleState>;

const initialState = (set: (data: Partial<ArticleState>) => void) => ({
    article: {} as GetLeisuNewsContentResponse,
    setArticle: (article: GetLeisuNewsContentResponse) => {
        set({ article });
    }
});

const creatArticleStore = (init: InitState) =>
    (useArticleStore = initStore<ArticleState>(initialState, init));

export { creatArticleStore, useArticleStore };
