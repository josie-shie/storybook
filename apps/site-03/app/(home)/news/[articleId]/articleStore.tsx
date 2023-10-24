import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { StaticImageData } from 'next/image';

type ArticleContent =
    | { id: number; type: 'text'; data: string }
    | { id: number; type: 'image'; data: StaticImageData };

interface Article {
    id: number;
    time: string;
    title: string;
    content: ArticleContent[];
}

interface InitState {
    article: Article | null;
}

interface ArticleState extends InitState {
    loading: boolean;
}

let useArticleStore: StoreWithSelectors<ArticleState>;

const initialState = (set: (data: Partial<ArticleState>) => void) => ({
    loading: false,
    article: null,
    setArticle: (article: Article) => {
        set({ article });
    }
});

const creatArticleStore = (init: InitState) =>
    (useArticleStore = initStore<ArticleState>(initialState, init));

export { creatArticleStore, useArticleStore };
