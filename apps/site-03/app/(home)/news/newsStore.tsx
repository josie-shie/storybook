import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface Slide {
    id: number;
    image: string;
    leagueChs: string;
    title: string;
}

interface News {
    id: number;
    image: string;
    title: string;
    time: string;
}

interface InitState {
    slideList: Slide[];
    newsList: News[];
    marqueeList: string[];
}

interface NewsState extends InitState {
    loading: boolean;
}

let useNewsStore: StoreWithSelectors<NewsState>;

const initialState = (set: (data: Partial<NewsState>) => void) => ({
    slideList: [],
    marqueeList: [],
    newsList: [],
    loading: false,
    setSlideList: (slideList: Slide[]) => {
        set({ slideList });
    },
    setNewsList: (newsList: News[]) => {
        set({ newsList });
    },
    setMarqueeList: (marqueeList: string[]) => {
        set({ marqueeList });
    }
});

const creatNewsStore = (init: InitState) =>
    (useNewsStore = initStore<NewsState>(initialState, init));

export { creatNewsStore, useNewsStore };
