import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import { type Pagination, type GetUnlockedPostData } from 'data-center';

export interface UnLockPostInterface {
    pagination: Pagination;
    articleList: GetUnlockedPostData[];
}

interface InitState {
    unLockPostList: UnLockPostInterface;
}

interface ArticleState extends InitState {
    setUnLockPostList: (unLockPostList: UnLockPostInterface) => void;
}

let useArticleStore: StoreWithSelectors<ArticleState>;

const initialState = (set: (data: Partial<ArticleState>) => void) => ({
    unLockPostList: {
        articleList: [],
        pagination: {
            pageCount: 0,
            totalCount: 0
        }
    },
    setUnLockPostList: (unLockPostList: UnLockPostInterface) => {
        set({ unLockPostList });
    }
});

const creatArticleStore = (init: InitState) =>
    (useArticleStore = initStore<ArticleState>(initialState, init));

export { creatArticleStore, useArticleStore };
