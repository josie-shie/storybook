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

interface InitState {
    pointsList: PointsItem[];
    scheduleList: ScheduleItem[];
    handicapList: HandicapItem[];
    totalGoalsList: GoalsItem[];
    topScorersList: TopScorerItem[];
}

interface DataState extends InitState {
    setPointsList: (pointsList: PointsItem[]) => void;
    setScheduleList: (scheduleList: ScheduleItem[]) => void;
    setHandicapList: (handicapList: HandicapItem[]) => void;
    setTotalGoalsList: (totalGoalsList: GoalsItem[]) => void;
    setTopScorersList: (topScorersList: TopScorerItem[]) => void;
}

let useDataStore: StoreWithSelectors<DataState>;

const initialState = (set: (data: Partial<DataState>) => void) => ({
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

const creatDataStore = (init: InitState) =>
    (useDataStore = initStore<DataState>(initialState, init));

export { creatDataStore, useDataStore };
