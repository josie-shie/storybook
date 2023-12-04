import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

type GuessTeam = 'home' | 'away';
type GuessType = 'none' | 'win' | 'draw' | 'lose';

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
    master: Master;
    postTime: string; //發表時間
    title: string; //標題
    leagueName: string; //聯賽名稱
    dateTime: string; //比賽時間
    homeTeamLogo: string; //主隊logo
    homeTeamName: string; //主隊名稱
    awayTeamLogo: string; //客隊logo
    awayTeamName: string; //客隊名稱
    content: string; //文章內容
    unlock: boolean; //是否解鎖
    homeRate?: number; //主隊賠率
    homeValue?: number; //大小/讓分
    awayRate?: number; //客隊賠率
    awayValue?: number; //大小/讓分
    guessResult?: GuessType; //已開賽競猜結果
    masterGuess?: GuessTeam; //主客場推薦
}

interface RecommendLeague {
    postTime: number; //發表時間
    leagueName: string; //發表時間
    dateTime: number; //比賽時間
    homeTeamName: string; //主隊名稱
    awayTeamName: string; //客隊名稱
    betType: string; //投注
    account: number; //解鎖費用
    lockCount: number; //已解鎖人數
}

interface InitState {
    articleDetail: ArticleDetail;
    recommendLeagueList: RecommendLeague[];
}

interface ArticleState extends InitState {
    setArticleDetail?: (articleDetail: ArticleDetail) => void;
    setRecommendLeagueList?: (recommendLeagueList: RecommendLeague[]) => void;
}

let useArticleStore: StoreWithSelectors<ArticleState>;

const initialState = (set: (data: Partial<ArticleState>) => void) => ({
    recommendLeagueList: [],
    articleDetail: {
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
        postTime: '',
        title: '',
        leagueName: '',
        dateTime: '',
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
    setRecommendLeagueList: (recommendLeagueList: RecommendLeague[]) => {
        set({ recommendLeagueList });
    }
});

const creatArticleStore = (init: InitState) =>
    (useArticleStore = initStore<ArticleState>(initialState, init));

export { creatArticleStore, useArticleStore };
