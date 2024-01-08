import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';

interface PointsItem {
    id: number;
    ranking: number;
    label: number | null;
    name: string;
    total: number;
    wins: number;
    draws: number;
    losses: number;
    scored: number;
    against: number;
    matches: number;
}

interface ScheduleItem {
    time: string;
    status: string;
    home: string;
    homeScore: number;
    away: string;
    awayScore: number;
}

interface HandicapItem {
    team: string;
    game: number;
    win: number;
    draw: number;
    lose: number;
    winPercent: number;
    drawPercent: number;
    losePercent: number;
    total: number;
}

interface GoalsItem {
    team: string;
    game: number;
    big: number;
    draw: number;
    small: number;
    bigPercent: number;
    drawPercent: number;
    smallPercent: number;
}

interface TopScorerItem {
    ranking: number;
    member: string;
    team: string;
    score: number;
    homeScore: number;
    awayScore: number;
}

export interface National {
    international: string[];
    Europe: string[];
    Asia: string[];
    America: string[];
    Africa: string[];
    Oceania: string[];
}

interface InitState {
    pointsList: PointsItem[];
    scheduleList: ScheduleItem[];
    handicapList: HandicapItem[];
    totalGoalsList: GoalsItem[];
    topScorersList: TopScorerItem[];
}

interface DataState extends InitState {
    nationallist: National;
    setPointsList: (pointsList: PointsItem[]) => void;
    setScheduleList: (scheduleList: ScheduleItem[]) => void;
    setHandicapList: (handicapList: HandicapItem[]) => void;
    setTotalGoalsList: (totalGoalsList: GoalsItem[]) => void;
    setTopScorersList: (topScorersList: TopScorerItem[]) => void;
}

let useAnalyticsStore: StoreWithSelectors<DataState>;

const initialState = (set: (data: Partial<DataState>) => void) => ({
    nationallist: {
        international: ['欧洲赛事', '美洲赛事', '非洲赛事', '亚洲赛事'],
        Europe: [
            '英格兰',
            '葡萄牙',
            '意大利',
            '法国',
            '德国',
            '西班牙',
            '冰岛',
            '苏格兰',
            '俄罗斯',
            '比利时',
            '乌克兰',
            '土耳其',
            '荷兰',
            '奥地利',
            '瑞士'
        ],
        Asia: [
            '中国',
            '日本',
            '韩国',
            '印度',
            '伊朗',
            '沙特阿拉伯',
            '澳大利亚',
            '卡塔尔',
            '阿联酋',
            '伊拉克',
            '泰国',
            '乌兹别克斯坦',
            '越南',
            '马来西亚',
            '印度尼西亚',
            '巴基斯坦'
        ],
        America: [
            '美国',
            '巴西',
            '阿根廷',
            '墨西哥',
            '哥伦比亚',
            '智利',
            '乌拉圭',
            '秘鲁',
            '加拿大',
            '巴拉圭',
            '厄瓜多尔',
            '玻利维亚',
            '委内瑞拉',
            '牙买加',
            '哥斯达黎加',
            '巴拿马'
        ],
        Africa: [
            '埃及',
            '尼日利亚',
            '南非',
            '喀麦隆',
            '塞内加尔',
            '加纳',
            '摩洛哥',
            '阿尔及利亚',
            '突尼斯',
            '科特迪瓦',
            '肯尼亚',
            '乌干达',
            '赞比亚',
            '马里',
            '安哥拉',
            '苏丹'
        ],
        Oceania: [
            '澳大利亚',
            '新西兰',
            '斐济',
            '巴布亚新几内亚',
            '所罗门群岛',
            '瓦努阿图',
            '萨摩亚',
            '汤加',
            '密克罗尼西亚联邦',
            '马绍尔群岛',
            '帕劳',
            '基里巴斯',
            '图瓦卢',
            '纽埃',
            '库克群岛',
            '托克劳'
        ]
    },
    pointsList: [],
    scheduleList: [],
    handicapList: [],
    totalGoalsList: [],
    topScorersList: [],
    setPointsList: (pointsList: PointsItem[]) => {
        set({ pointsList });
    },
    setScheduleList: (scheduleList: ScheduleItem[]) => {
        set({ scheduleList });
    },
    setHandicapList: (handicapList: HandicapItem[]) => {
        set({ handicapList });
    },
    setTotalGoalsList: (totalGoalsList: GoalsItem[]) => {
        set({ totalGoalsList });
    },
    setTopScorersList: (topScorersList: TopScorerItem[]) => {
        set({ topScorersList });
    }
});

const createAnalyticsStore = (init: InitState) =>
    (useAnalyticsStore = initStore<DataState>(initialState, init));

export { createAnalyticsStore, useAnalyticsStore };
