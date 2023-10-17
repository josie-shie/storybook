import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface Banner {
    image: string;
    tag: string;
    title: string;
}

interface InitState {
    bannerList: Banner[];
}

interface NewsState extends InitState {
    marquee: string[];
}

let useNewsStore: StoreWithSelectors<NewsState>;

const initialState = (set: (data: Partial<NewsState>) => void) => ({
    bannerList: [],
    marquee: [],
    setBannerList: (bannerList: Banner[]) => {
        set({ bannerList });
    }
});

const creatNewsStore = (init: InitState) =>
    (useNewsStore = initStore<NewsState>(initialState, init));

export { creatNewsStore, useNewsStore };
