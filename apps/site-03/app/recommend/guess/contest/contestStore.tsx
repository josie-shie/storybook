import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface Banner {
    sport: string;
    time: string;
    homeTeam: string;
    awayTeam: string;
    member: number;
    plan: boolean;
    odds: number;
    oddss: number;
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
