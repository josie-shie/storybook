import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type { HandicapType, GuessType, GuessTeam } from '@/types/predict';

interface Master {
    id: number;
    avatar: string; //頭像
    name: string; //使用者
    hotStreak: number; //連紅
    ranking: number; //排行
    followed: boolean; //是否關注
    unlockNumber: number; //解鎖次數
    fansNumber: number; //粉絲人數
}

interface ArticleDetail {
    id: number;
    master: Master;
    postTime: number; //發表時間
    title: string; //標題
    leagueName: string; //聯賽名稱
    dateTime: number; //比賽時間
    homeTeamLogo: string; //主隊logo
    homeTeamName: string; //主隊名稱
    awayTeamLogo: string; //客隊logo
    awayTeamName: string; //客隊名稱
    content: string; //文章內容
    unlock: boolean; //是否解鎖
    homeHandicap?: number; //大小/讓分
    awayHandicap?: number; //大小/讓分
    guessResult?: GuessType; //已開賽競猜結果
    masterGuess?: GuessTeam; //主客場推薦
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
        id: 0,
        master: {
            id: 0,
            avatar: '',
            name: '',
            hotStreak: 0,
            ranking: 0,
            followed: false,
            unlockNumber: 0,
            fansNumber: 0,
            description: ''
        },
        postTime: 0,
        title: '',
        leagueName: '',
        dateTime: 0,
        homeTeamLogo: '',
        homeTeamName: '',
        awayTeamLogo: '',
        awayTeamName: '',
        content: '',
        unlock: false,
        homeRate: 0,
        homeValue: 0,
        awayRate: 0,
        awayValue: 0,
        guessResult: 'none' as GuessType,
        masterGuess: 'home' as GuessTeam
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
