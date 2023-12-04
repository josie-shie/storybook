import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type {
    GetHomepageBannerMatch,
    GetHomepageBannerBanner,
    GetHotMatchListResponse
} from 'data-center';

interface InitState {
    slideList: GetHomepageBannerMatch[];
    contestList: GetHotMatchListResponse;
    bannerList: GetHomepageBannerBanner[];
}

interface HomeState extends InitState {
    loading: boolean;
}

let useHomeStore: StoreWithSelectors<HomeState>;

const initialState = (set: (data: Partial<HomeState>) => void) => ({
    slideList: [],
    bannerList: [],
    contestList: {},
    loading: false,
    setLoading: (loading: boolean) => {
        set({ loading });
    }
});

const creatHomeStore = (init: InitState) =>
    (useHomeStore = initStore<HomeState>(initialState, init));

export { creatHomeStore, useHomeStore };
