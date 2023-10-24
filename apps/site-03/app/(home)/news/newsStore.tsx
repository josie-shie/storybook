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
    currentMarqueeIndex: number;
    setCurrentMarqueeIndex: (index: number) => void;
}

let useNewsStore: StoreWithSelectors<NewsState>;

const initialState = (set: (data: Partial<NewsState>) => void) => ({
    slideList: [],
    marqueeList: [],
    newsList: [],
    loading: false,
    currentMarqueeIndex: 0,
    setSlideList: (slideList: Slide[]) => {
        set({ slideList });
    },
    setNewsList: (newsList: News[]) => {
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
