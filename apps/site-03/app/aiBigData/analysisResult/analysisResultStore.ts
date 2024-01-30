import 'dayjs/locale/zh-cn';
import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import { getISOWeek, parseISO } from 'date-fns';
import type {
    GetFootballStatsMatchesResponse,
    GetFootballStatsResponse,
    DailyMatchType
} from 'data-center';
import type { ReactNode } from 'react';

export interface Statistics {
    upper: number;
    lower: number;
    draw: number;
}

export interface StatisticsCategories {
    handicap: Record<string, Statistics>;
    overUnder: Record<string, Statistics>;
    moneyLine: Record<string, Statistics>;
}

interface TimePeriod {
    day: StatisticsCategories;
    week: StatisticsCategories;
}

export interface HandicapEchartType {
    full: TimePeriod;
}

function groupSameWeek(dayListData: Record<string, Statistics>) {
    const weeklyData = {} as Record<string, Statistics>;

    Object.keys(dayListData).forEach(dateStr => {
        const date = parseISO(dateStr);
        const weekNumber = getISOWeek(date);

        if (!Object.prototype.hasOwnProperty.call(weeklyData, weekNumber)) {
            weeklyData[weekNumber] = { upper: 0, lower: 0, draw: 0 };
        }

        weeklyData[weekNumber].upper += dayListData[dateStr].upper;
        weeklyData[weekNumber].lower += dayListData[dateStr].lower;
        weeklyData[weekNumber].draw += dayListData[dateStr].draw;
    });

    return weeklyData;
}

interface InitState {
    analysisResultData: GetFootballStatsResponse | undefined;
}

interface AnalysisResultState extends InitState {
    showContestDrawer: boolean;
    setShowContestDrawer: (showContestDrawer: boolean) => void;
    contestList: GetFootballStatsMatchesResponse;
    setContestList: (contestList: GetFootballStatsMatchesResponse) => void;
    selectedResult: { type: string; odds: string };
    setSelectedResult: (selectedResult: { type: string; odds: string }) => void;
    handicapEchart: HandicapEchartType;
    setAnalysisResultData: (analysisResultData: GetFootballStatsResponse | undefined) => void;
    setHandicapEchart: (analysisResultData: GetFootballStatsResponse | undefined) => void;
    dialogContentType: string;
    dialogContent: ReactNode;
    openNoramlDialog: boolean;
    setDialogContentType: (dialogContentType: string) => void;
    setOpenNormalDialog: (openNoramlDialog: boolean) => void;
    setDialogContent: (dialogContent: ReactNode) => void;
    defaultPageIndex: number;
    setDefaultPageIndex: (defaultPageIndex: number) => void;
    tabSlideScroll: boolean;
    setTabSlideScroll: (tabSlideScroll: boolean) => void;
    showedTutorial: boolean;
    setShowedTutorial: (showedTutorial: boolean) => void;
}

let useAnalyticsResultStore: StoreWithSelectors<AnalysisResultState>;

const initialState = (
    set: (updater: (state: AnalysisResultState) => Partial<AnalysisResultState>) => void
) => ({
    analysisResultData: undefined,
    contestList: [],
    setContestList: (contestList: GetFootballStatsMatchesResponse) => {
        set(state => {
            return {
                ...state,
                contestList
            };
        });
    },
    handicapEchart: {
        full: {
            day: {
                handicap: {} as Record<string, Statistics>,
                overUnder: {} as Record<string, Statistics>,
                moneyLine: {} as Record<string, Statistics>
            },
            week: {
                handicap: {} as Record<string, Statistics>,
                overUnder: {} as Record<string, Statistics>,
                moneyLine: {} as Record<string, Statistics>
            }
        }
    },
    setHandicapEchart: (analysisResultData: GetFootballStatsResponse | undefined) => {
        set(state => {
            const fullDayHandicap = {} as Record<string, Statistics>;
            const fullDayOverUnder = {} as Record<string, Statistics>;
            const fullDayMoneyLine = {} as Record<string, Statistics>;

            analysisResultData?.fullHandicapUpperDaily?.forEach((item: DailyMatchType) => {
                if (Object.prototype.hasOwnProperty.call(fullDayHandicap, item.date)) {
                    fullDayHandicap[item.date].upper = item.matches;
                } else {
                    fullDayHandicap[item.date] = { upper: item.matches, lower: 0, draw: 0 };
                }
            });

            analysisResultData?.fullHandicapLowerDaily?.forEach((item: DailyMatchType) => {
                if (Object.prototype.hasOwnProperty.call(fullDayHandicap, item.date)) {
                    fullDayHandicap[item.date].lower = item.matches;
                } else {
                    fullDayHandicap[item.date] = { upper: 0, lower: item.matches, draw: 0 };
                }
            });

            analysisResultData?.fullHandicapDrawDaily?.forEach((item: DailyMatchType) => {
                if (Object.prototype.hasOwnProperty.call(fullDayHandicap, item.date)) {
                    fullDayHandicap[item.date].draw = item.matches;
                } else {
                    fullDayHandicap[item.date] = { upper: 0, lower: 0, draw: item.matches };
                }
            });

            // 遍历并更新 fullOverUnderUpperDates
            analysisResultData?.fullOverUnderOverDaily?.forEach((item: DailyMatchType) => {
                if (Object.prototype.hasOwnProperty.call(fullDayOverUnder, item.date)) {
                    fullDayOverUnder[item.date].upper = item.matches;
                } else {
                    fullDayOverUnder[item.date] = { upper: item.matches, lower: 0, draw: 0 };
                }
            });

            // 遍历并更新 fullOverUnderLowerDates
            analysisResultData?.fullOverUnderUnderDaily?.forEach((item: DailyMatchType) => {
                if (Object.prototype.hasOwnProperty.call(fullDayOverUnder, item.date)) {
                    fullDayOverUnder[item.date].lower = item.matches;
                } else {
                    fullDayOverUnder[item.date] = { upper: 0, lower: item.matches, draw: 0 };
                }
            });

            // 遍历并更新 fullOverUnderDrawDates
            analysisResultData?.fullOverUnderDrawDaily?.forEach((item: DailyMatchType) => {
                if (Object.prototype.hasOwnProperty.call(fullDayOverUnder, item.date)) {
                    fullDayOverUnder[item.date].draw = item.matches;
                } else {
                    fullDayOverUnder[item.date] = { upper: 0, lower: 0, draw: item.matches };
                }
            });

            // 处理 Full MoneyLine Upper
            analysisResultData?.fullTimeHomeWinDaily?.forEach((item: DailyMatchType) => {
                if (Object.prototype.hasOwnProperty.call(fullDayMoneyLine, item.date)) {
                    fullDayMoneyLine[item.date].upper = item.matches;
                } else {
                    fullDayMoneyLine[item.date] = { upper: item.matches, lower: 0, draw: 0 };
                }
            });

            // 处理 Full MoneyLine Lower
            analysisResultData?.fullTimeAwayWinDaily?.forEach((item: DailyMatchType) => {
                if (Object.prototype.hasOwnProperty.call(fullDayMoneyLine, item.date)) {
                    fullDayMoneyLine[item.date].lower = item.matches;
                } else {
                    fullDayMoneyLine[item.date] = { upper: 0, lower: item.matches, draw: 0 };
                }
            });

            // 处理 Full MoneyLine Draw
            analysisResultData?.fullTimeDrawDaily?.forEach((item: DailyMatchType) => {
                if (Object.prototype.hasOwnProperty.call(fullDayMoneyLine, item.date)) {
                    fullDayMoneyLine[item.date].draw = item.matches;
                } else {
                    fullDayMoneyLine[item.date] = { upper: 0, lower: 0, draw: item.matches };
                }
            });

            const chartData = {
                full: {
                    day: {
                        handicap: fullDayHandicap,
                        overUnder: fullDayOverUnder,
                        moneyLine: fullDayMoneyLine
                    },
                    week: {
                        handicap: groupSameWeek(fullDayHandicap),
                        overUnder: groupSameWeek(fullDayOverUnder),
                        moneyLine: groupSameWeek(fullDayMoneyLine)
                    }
                }
            };

            return {
                ...state,
                handicapEchart: chartData
            };
        });
    },
    setAnalysisResultData: (analysisResultData: GetFootballStatsResponse | undefined) => {
        set(state => {
            return {
                ...state,
                analysisResultData
            };
        });
    },
    showContestDrawer: false,
    setShowContestDrawer: (showContestDrawer: boolean) => {
        set(state => {
            return {
                ...state,
                showContestDrawer
            };
        });
    },
    selectedResult: { type: '', odds: '' },
    setSelectedResult: (selectedResult: { type: string; odds: string }) => {
        set(state => {
            return {
                ...state,
                selectedResult
            };
        });
    },
    dialogContentType: 'system',
    openNoramlDialog: false,
    dialogContent: null,
    setOpenNormalDialog: (openNoramlDialog: boolean) => {
        set(state => {
            return { ...state, openNoramlDialog };
        });
    },
    setDialogContentType: (dialogContentType: string) => {
        set(state => {
            return { ...state, dialogContentType };
        });
    },
    setDialogContent: (dialogContent: ReactNode) => {
        set(state => {
            return { ...state, dialogContent };
        });
    },
    defaultPageIndex: 0,
    setDefaultPageIndex: (defaultPageIndex: number) => {
        set(state => {
            return { ...state, defaultPageIndex };
        });
    },
    tabSlideScroll: true,
    setTabSlideScroll: (tabSlideScroll: boolean) => {
        set(state => {
            return { ...state, tabSlideScroll };
        });
    },
    showedTutorial: false,
    setShowedTutorial: (showedTutorial: boolean) => {
        set(state => {
            return { ...state, showedTutorial };
        });
    }
});
let isInit = true;
const createAnalysisResultStore = (init: InitState) => {
    if (isInit) {
        useAnalyticsResultStore = initStore<AnalysisResultState>(initialState, init);
        isInit = false;
    }
};

export { createAnalysisResultStore, useAnalyticsResultStore };
