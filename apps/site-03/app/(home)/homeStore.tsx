import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface Slide {
    id: number;
    image: string;
    leagueChs: string;
    homeIcon: string;
    awayIcon: string;
    homeChs: string;
    awayChs: string;
    homeScore: number;
    awayScore: number;
}

interface Contest {
    matchId: number;
    leagueChsShort: string;
    startTime: string;
    matchTime: number;
    state: number;
    homeChs: string;
    awayChs: string;
    onlineTotal: number;
    homeScore: number;
    awayScore: number;
}

type ContestList = Record<string, Contest[]>;

interface InitState {
    slideList: Slide[];
    contestList: ContestList;
}

interface HomeState extends InitState {
    loading: boolean;
}

let useHomeStore: StoreWithSelectors<HomeState>;

const initialState = (set: (data: Partial<HomeState>) => void) => ({
    slideList: [],
    contestList: {},
    loading: false,
    setSlideList: (slideList: Slide[]) => {
        set({ slideList });
    },
    setLoading: (loading: boolean) => {
        set({ loading });
    },
    setContestList: (contestList: ContestList) => {
        set({ contestList });
    }
});

const creatHomeStore = (init: InitState) =>
    (useHomeStore = initStore<HomeState>(initialState, init));

export { creatHomeStore, useHomeStore };
