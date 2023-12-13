import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import { type GetPostDetailResponse } from 'data-center';
import type { HandicapType } from '@/types/predict';

interface RecommendationItem {
    id: number;
    createdAt: number; //發表時間
    leagueName: string; //聯賽名稱
    matchTime: number; //比賽時間
    homeTeamName: string; //主隊名稱
    awayTeamName: string; //客隊名稱
    price: number; //解鎖費用
    predictPlayType: HandicapType; //玩法
    unlockNumber: number; //已解鎖人數,
    isLock: boolean; //是否解鎖
}

interface InitState {
    articleDetail: GetPostDetailResponse;
    recommendationList: RecommendationItem[];
}

interface ArticleState extends InitState {
    setArticleDetail: ({ articleDetail }: { articleDetail: GetPostDetailResponse }) => void;
    setRecommendationList: ({
        recommendationList
    }: {
        recommendationList: RecommendationItem[];
    }) => void;
}

let isInit = true;
let useArticleStore: StoreWithSelectors<ArticleState>;

const initialState = (set: (updater: (state: ArticleState) => Partial<ArticleState>) => void) => ({
    recommendationList: [],
    articleDetail: {} as GetPostDetailResponse,
    setArticleDetail: ({ articleDetail }: { articleDetail: GetPostDetailResponse }) => {
        set(() => ({ articleDetail }));
    },
    setRecommendationList: ({
        recommendationList
    }: {
        recommendationList: RecommendationItem[];
    }) => {
        set(() => ({ recommendationList }));
    }
});

const creatArticleStore = (init: InitState) => {
    if (isInit) {
        const params = {
            recommendationList: init.recommendationList,
            articleDetail: init.articleDetail
        };

        useArticleStore = initStore<ArticleState>(initialState, params);
        isInit = false;
    }
};

export { creatArticleStore, useArticleStore };
