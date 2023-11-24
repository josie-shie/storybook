import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface ArticleFilter {
    id: number;
    gameName: string;
    gameTime: string;
    homeTeam: string;
    awayTeam: string;
    articleNumber: number;
}

interface InitState {
    filterList: ArticleFilter[];
}

interface FilterState extends InitState {
    setFilterList?: (filterList: ArticleFilter[]) => void;
}

let useArticleFilterStore: StoreWithSelectors<FilterState>;

const initialState = (set: (data: Partial<FilterState>) => void) => ({
    filterList: [],
    setFilterList: (filterList: ArticleFilter[]) => {
        set({ filterList });
    }
});

const creatArticleFilterStore = (init: InitState) =>
    (useArticleFilterStore = initStore<FilterState>(initialState, init));

export { creatArticleFilterStore, useArticleFilterStore };
