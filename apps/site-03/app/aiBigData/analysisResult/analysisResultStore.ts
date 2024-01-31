import 'dayjs/locale/zh-cn';
import { initStore } from 'lib';
import type { StoreWithSelectors } from 'lib';
import type {
    GetFootballStatsMatchesResponse,
    GetFootballStatsResponse,
    DailyMatchType
} from 'data-center';
import type { ReactNode } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export interface Statistics {
    upper: number;
    lower: number;
    draw: number;
    upperPercentage: number;
    lowerPercentage: number;
    drawPercentage: number;
    matchIds?: number[];
}

export interface StatisticsCategories {
    handicap: Record<number, Statistics>;
    overUnder: Record<number, Statistics>;
    moneyLine: Record<number, Statistics>;
}

export interface TimePeriod {
    day: StatisticsCategories;
    week: StatisticsCategories;
}

export interface HandicapEchartType {
    full: TimePeriod;
}

function calculatePercentages(data: Record<string, Statistics>) {
    for (const date in data) {
        if (Object.prototype.hasOwnProperty.call(data, date)) {
            const dateValue = data[date];
            const total = dateValue.draw + dateValue.lower + dateValue.upper;
            data[date].drawPercentage = Math.floor((dateValue.draw / total) * 100);
            data[date].lowerPercentage = Math.floor((dateValue.lower / total) * 100);
            data[date].upperPercentage = Math.floor((dateValue.upper / total) * 100);
        }
    }
}

function groupSameWeek(dayListData: Record<string, Statistics>) {
    const weeklyData = {} as Record<string, Statistics>;

    Object.keys(dayListData).forEach(dateStr => {
        const timestampInSeconds = parseInt(dateStr);
        const date = dayjs(timestampInSeconds * 1000);

        const weekNumber = date.isoWeek();

        if (!Object.prototype.hasOwnProperty.call(weeklyData, weekNumber)) {
            weeklyData[weekNumber] = {
                upper: 0,
                lower: 0,
                draw: 0,
                upperPercentage: 0,
                drawPercentage: 0,
                lowerPercentage: 0,
                matchIds: dayListData[dateStr].matchIds || []
            };
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
                if (
                    Object.prototype.hasOwnProperty.call(fullDayHandicap, dayjs(item.date).unix())
                ) {
                    fullDayHandicap[dayjs(item.date).unix()].upper = item.matches;
                } else {
                    fullDayHandicap[dayjs(item.date).unix()] = {
                        upper: item.matches,
                        lower: 0,
                        draw: 0,
                        upperPercentage: 0,
                        drawPercentage: 0,
                        lowerPercentage: 0,
                        matchIds: analysisResultData.fullHandicapUpper?.map(match => match.matchId)
                    };
                }
            });

            analysisResultData?.fullHandicapLowerDaily?.forEach((item: DailyMatchType) => {
                if (
                    Object.prototype.hasOwnProperty.call(fullDayHandicap, dayjs(item.date).unix())
                ) {
                    fullDayHandicap[dayjs(item.date).unix()].lower = item.matches;
                } else {
                    fullDayHandicap[dayjs(item.date).unix()] = {
                        upper: 0,
                        lower: item.matches,
                        draw: 0,
                        upperPercentage: 0,
                        drawPercentage: 0,
                        lowerPercentage: 0,
                        matchIds: analysisResultData.fullHandicapLower?.map(match => match.matchId)
                    };
                }
            });

            analysisResultData?.fullHandicapDrawDaily?.forEach((item: DailyMatchType) => {
                if (
                    Object.prototype.hasOwnProperty.call(fullDayHandicap, dayjs(item.date).unix())
                ) {
                    fullDayHandicap[dayjs(item.date).unix()].draw = item.matches;
                } else {
                    fullDayHandicap[dayjs(item.date).unix()] = {
                        upper: 0,
                        lower: 0,
                        draw: item.matches,
                        upperPercentage: 0,
                        drawPercentage: 0,
                        lowerPercentage: 0
                    };
                }
            });

            // 遍历并更新 fullOverUnderUpperDates
            analysisResultData?.fullOverUnderOverDaily?.forEach((item: DailyMatchType) => {
                if (
                    Object.prototype.hasOwnProperty.call(fullDayOverUnder, dayjs(item.date).unix())
                ) {
                    fullDayOverUnder[dayjs(item.date).unix()].upper = item.matches;
                } else {
                    fullDayOverUnder[dayjs(item.date).unix()] = {
                        upper: item.matches,
                        lower: 0,
                        draw: 0,
                        upperPercentage: 0,
                        drawPercentage: 0,
                        lowerPercentage: 0,
                        matchIds: analysisResultData.fullOverUnderOver?.map(match => match.matchId)
                    };
                }
            });

            // 遍历并更新 fullOverUnderLowerDates
            analysisResultData?.fullOverUnderUnderDaily?.forEach((item: DailyMatchType) => {
                if (
                    Object.prototype.hasOwnProperty.call(fullDayOverUnder, dayjs(item.date).unix())
                ) {
                    fullDayOverUnder[dayjs(item.date).unix()].lower = item.matches;
                } else {
                    fullDayOverUnder[dayjs(item.date).unix()] = {
                        upper: 0,
                        lower: item.matches,
                        draw: 0,
                        upperPercentage: 0,
                        drawPercentage: 0,
                        lowerPercentage: 0,
                        matchIds: analysisResultData.fullOverUnderUnder?.map(match => match.matchId)
                    };
                }
            });

            // 遍历并更新 fullOverUnderDrawDates
            analysisResultData?.fullOverUnderDrawDaily?.forEach((item: DailyMatchType) => {
                if (
                    Object.prototype.hasOwnProperty.call(fullDayOverUnder, dayjs(item.date).unix())
                ) {
                    fullDayOverUnder[dayjs(item.date).unix()].draw = item.matches;
                } else {
                    fullDayOverUnder[dayjs(item.date).unix()] = {
                        upper: 0,
                        lower: 0,
                        draw: item.matches,
                        upperPercentage: 0,
                        drawPercentage: 0,
                        lowerPercentage: 0
                    };
                }
            });

            // 处理 Full MoneyLine Upper
            analysisResultData?.fullTimeHomeWinDaily?.forEach((item: DailyMatchType) => {
                if (
                    Object.prototype.hasOwnProperty.call(fullDayMoneyLine, dayjs(item.date).unix())
                ) {
                    fullDayMoneyLine[dayjs(item.date).unix()].upper = item.matches;
                } else {
                    fullDayMoneyLine[dayjs(item.date).unix()] = {
                        upper: item.matches,
                        lower: 0,
                        draw: 0,
                        upperPercentage: 0,
                        drawPercentage: 0,
                        lowerPercentage: 0
                    };
                }
            });

            // 处理 Full MoneyLine Lower
            analysisResultData?.fullTimeAwayWinDaily?.forEach((item: DailyMatchType) => {
                if (
                    Object.prototype.hasOwnProperty.call(fullDayMoneyLine, dayjs(item.date).unix())
                ) {
                    fullDayMoneyLine[dayjs(item.date).unix()].lower = item.matches;
                } else {
                    fullDayMoneyLine[dayjs(item.date).unix()] = {
                        upper: 0,
                        lower: item.matches,
                        draw: 0,
                        upperPercentage: 0,
                        drawPercentage: 0,
                        lowerPercentage: 0
                    };
                }
            });

            // 处理 Full MoneyLine Draw
            analysisResultData?.fullTimeDrawDaily?.forEach((item: DailyMatchType) => {
                if (
                    Object.prototype.hasOwnProperty.call(fullDayMoneyLine, dayjs(item.date).unix())
                ) {
                    fullDayMoneyLine[dayjs(item.date).unix()].draw = item.matches;
                } else {
                    fullDayMoneyLine[dayjs(item.date).unix()] = {
                        upper: 0,
                        lower: 0,
                        draw: item.matches,
                        upperPercentage: 0,
                        drawPercentage: 0,
                        lowerPercentage: 0
                    };
                }
            });

            const weekHandicap: Record<string, Statistics> = groupSameWeek(fullDayHandicap);
            const weekOverUnder: Record<string, Statistics> = groupSameWeek(fullDayOverUnder);
            const weekMoneyLine: Record<string, Statistics> = groupSameWeek(fullDayMoneyLine);

            calculatePercentages(fullDayHandicap);
            calculatePercentages(fullDayOverUnder);
            calculatePercentages(fullDayMoneyLine);
            calculatePercentages(weekHandicap);
            calculatePercentages(weekOverUnder);
            calculatePercentages(weekMoneyLine);

            const chartData = {
                full: {
                    day: {
                        handicap: fullDayHandicap,
                        overUnder: fullDayOverUnder,
                        moneyLine: fullDayMoneyLine
                    },
                    week: {
                        handicap: weekHandicap,
                        overUnder: weekOverUnder,
                        moneyLine: weekMoneyLine
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
