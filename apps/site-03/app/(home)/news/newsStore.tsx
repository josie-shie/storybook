import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { GetLeisuNewsListResponse } from 'data-center';

interface InitState {
    newsList: GetLeisuNewsListResponse;
    marqueeList: string[];
}

interface NewsState extends InitState {
    loading: boolean;
    currentMarqueeIndex: number;
    setCurrentMarqueeIndex: (index: number) => void;
    setNewsList: (newsList: GetLeisuNewsListResponse) => void;
}

let useNewsStore: StoreWithSelectors<NewsState>;

const initialState = (set: (data: Partial<NewsState>) => void) => ({
    marqueeList: [],
    newsList: [],
    loading: false,
    currentMarqueeIndex: 0,
    setNewsList: (newsList: GetLeisuNewsListResponse) => {
        set({ newsList });
    },
    setMarqueeList: (marqueeList: string[]) => {
        set({ marqueeList });
    },
    setCurrentMarqueeIndex: (currentMarqueeIndex: number) => {
        set({ currentMarqueeIndex });
    }
});

const creatNewsStore = (init: InitState) =>
    (useNewsStore = initStore<NewsState>(initialState, init));

export { creatNewsStore, useNewsStore };
