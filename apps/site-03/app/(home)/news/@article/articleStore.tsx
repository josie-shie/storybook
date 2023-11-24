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

type NotificationType = 'success' | 'error';

interface Notification {
    type: NotificationType;
    visible: boolean;
    message: string;
}

interface InitState {
    article: Article | null;
}

interface ArticleState extends InitState {
    notification: Notification;
    setNotification: (notification: Notification) => void;
}

let useArticleStore: StoreWithSelectors<ArticleState>;

const initialState = (set: (data: Partial<ArticleState>) => void) => ({
    article: null,
    notification: {
        type: 'success' as NotificationType,
        visible: false,
        message: ''
    },
    setNotification: (notification: Notification) => {
        set({ notification });
    },
    setArticle: (article: Article) => {
        set({ article });
    }
});

const creatArticleStore = (init: InitState) =>
    (useArticleStore = initStore<ArticleState>(initialState, init));

export { creatArticleStore, useArticleStore };
