import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { HandicapType, GuessType, GuessTeam, PredictType } from '@/types/predict';

interface ArticleDetail {
    mentorId: number; // 導師id
    mentorName: string; //導師名稱
    mentorImage: string; //導師logo
    analysisTitle: string; //文章標題
    analysisContent: string; //文章內容
    homeTeam: {
        id: number; //主隊id
        name: string; //主隊名稱
        logo: string; //主隊logo
    };
    awayTeam: {
        id: number; //客隊id
        name: string; //客隊名稱
        logo: string; //客隊logo
    };
    matchTime: number; //開賽時間
    createdAt: number; //文章發表時間
    leagueName: string; //聯賽名稱
    predictionResult: GuessType; //預測結果
    playType: GuessTeam; //玩法
    odds: {
        handicap: number;
        overUnder: number;
    };
    fansNumber: number; //粉絲人數
    unlockNumber: number; //解鎖次數
    hotStreak: number; //連紅
    ranking: number; //月榜
    followed: boolean; //是否關注
    predictedPlay: PredictType; //預測玩法
    price: number; //解鎖金幣
}

interface RecommendationItem {
    id: number;
    postTime: number; //發表時間
    leagueName: string; //發表時間
    dateTime: number; //比賽時間
    homeTeamName: string; //主隊名稱
    awayTeamName: string; //客隊名稱
    handicap: HandicapType; //盤口
    amount: number; //解鎖費用
    lockCount: number; //已解鎖人數
}

interface InitState {
    articleDetail: ArticleDetail;
    recommendationList: RecommendationItem[];
}

interface ArticleState extends InitState {
    setArticleDetail?: (articleDetail: ArticleDetail) => void;
    setRecommendLeagueList?: (recommendationList: RecommendationItem[]) => void;
}

let useArticleStore: StoreWithSelectors<ArticleState>;

const initialState = (set: (data: Partial<ArticleState>) => void) => ({
    recommendationList: [],
    articleDetail: {
        mentorId: 0,
        mentorName: '',
        mentorImage: '',
        analysisTitle: '',
        analysisContent: '',
        homeTeam: {
            id: 0,
            name: '',
            logo: ''
        },
        awayTeam: {
            id: 0,
            name: '',
            logo: ''
        },
        matchTime: 0,
        createdAt: 0,
        leagueName: '',
        predictionResult: 'WIN' as GuessType,
        playType: 'HOMEAWAY' as GuessTeam,
        odds: {
            handicap: 0,
            overUnder: 0
        },
        fansNumber: 0,
        unlockNumber: 0,
        hotStreak: 0,
        ranking: 0,
        followed: false,
        predictedPlay: 'LOCK' as PredictType,
        price: 0
    },
    setArticleDetail: (articleDetail: ArticleDetail) => {
        set({ articleDetail });
    },
    setRecommendationList: (recommendationList: RecommendationItem[]) => {
        set({ recommendationList });
    }
});

const creatArticleStore = (init: InitState) =>
    (useArticleStore = initStore<ArticleState>(initialState, init));

export { creatArticleStore, useArticleStore };
