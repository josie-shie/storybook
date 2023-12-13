import 'dayjs/locale/zh-cn';
import { initStore, timestampToString } from 'lib';
import type { StoreWithSelectors } from 'lib';
import { getISOWeek, parseISO } from 'date-fns';
import type {
    GetAiAnalysisContestListResponse,
    GetFootballStatsRecord,
    GetAiAnalysisReportResponse
} from 'data-center';

export interface Statistics {
    upper: number;
    lower: number;
    draw: number;
}

interface StatisticsCategories {
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
    half: TimePeriod;
}

function groupSameWeek(dayListData: Record<string, Statistics>) {
    const weeklyData = {} as Record<string, Statistics>;

    Object.keys(dayListData).forEach(dateStr => {
        const date = parseISO(dateStr); // 解析日期字符串
        const weekNumber = getISOWeek(date); // 获取 ISO 周数

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
    analysisResultData: GetAiAnalysisReportResponse;
    recordData: GetFootballStatsRecord | undefined;
}

interface AnalysisResultState extends InitState {
    showContestDrawer: boolean;
    setShowContestDrawer: (showContestDrawer: boolean) => void;
    contestList: GetAiAnalysisContestListResponse;
    setContestList: (contestList: GetAiAnalysisContestListResponse) => void;
    selectedResult: { type: string; odds: string };
    setSelectedResult: (selectedResult: { type: string; odds: string }) => void;
    handicapEchart: HandicapEchartType;
    setAnalysisResultData: (analysisResultData: GetAiAnalysisReportResponse) => void;
    setRecordData: (recordData: GetFootballStatsRecord | undefined) => void;
    setHandicapEchart: (analysisResultData: GetAiAnalysisReportResponse) => void;
}

let useAnalyticsResultStore: StoreWithSelectors<AnalysisResultState>;

const initialState = (
    set: (updater: (state: AnalysisResultState) => Partial<AnalysisResultState>) => void
) => ({
    analysisResultData: {} as GetAiAnalysisReportResponse,
    recordData: {} as GetFootballStatsRecord,
    setRecordData: (recordData: GetFootballStatsRecord | undefined) => {
        set(state => {
            return {
                ...state,
                recordData
            };
        });
    },
    contestList: [],
    setContestList: (contestList: GetAiAnalysisContestListResponse) => {
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
        },
        half: {
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
    setHandicapEchart: (analysisResultData: GetAiAnalysisReportResponse) => {
        set(state => {
            const fullHanicapUpperDates = analysisResultData.fullHandicapUpperDaily.map(timestamp =>
                timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const fullHanicapLowerDates = analysisResultData.fullHandicapLowerDaily.map(timestamp =>
                timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const fullHanicapDrawDates = analysisResultData.fullHandicapDrawDaily.map(timestamp =>
                timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const halfHanicapUpperDates = analysisResultData.halfHandicapUpperDaily.map(timestamp =>
                timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const halfHanicapLowerDates = analysisResultData.halfHandicapLowerDaily.map(timestamp =>
                timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const halfHanicapDrawDates = analysisResultData.halfHandicapDrawDaily.map(timestamp =>
                timestampToString(timestamp, 'YYYY-MM-DD')
            );

            const fullOverUnderUpperDates = analysisResultData.fullOverUnderUpperDaily.map(
                timestamp => timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const fullOverUnderLowerDates = analysisResultData.fullOverUnderLowerDaily.map(
                timestamp => timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const fullOverUnderDrawDates = analysisResultData.fullOverUnderDrawDaily.map(
                timestamp => timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const halfOverUnderUpperDates = analysisResultData.halfOverUnderUpperDaily.map(
                timestamp => timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const halfOverUnderLowerDates = analysisResultData.halfOverUnderLowerDaily.map(
                timestamp => timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const halfOverUnderDrawDates = analysisResultData.halfOverUnderDrawDaily.map(
                timestamp => timestampToString(timestamp, 'YYYY-MM-DD')
            );

            const fullMoneyLineUpperDates = analysisResultData.fullMoneyLineUpperDaily.map(
                timestamp => timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const fullMoneyLineLowerDates = analysisResultData.fullMoneyLineLowerDaily.map(
                timestamp => timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const fullMoneyLineDrawDates = analysisResultData.fullMoneyLineDrawDaily.map(
                timestamp => timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const halfMoneyLineUpperDates = analysisResultData.halfMoneyLineUpperDaily.map(
                timestamp => timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const halfMoneyLineLowerDates = analysisResultData.halfMoneyLineLowerDaily.map(
                timestamp => timestampToString(timestamp, 'YYYY-MM-DD')
            );
            const halfMoneyLineDrawDates = analysisResultData.halfMoneyLineDrawDaily.map(
                timestamp => timestampToString(timestamp, 'YYYY-MM-DD')
            );

            const fullDayHandicap = {} as Record<string, Statistics>;
            const fullDayOverUnder = {} as Record<string, Statistics>;
            const fullDayMoneyLine = {} as Record<string, Statistics>;
            const halfDayHandicap = {} as Record<string, Statistics>;
            const halfDayOverUnder = {} as Record<string, Statistics>;
            const halfDayMoneyLine = {} as Record<string, Statistics>;

            fullHanicapUpperDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(fullDayHandicap, item)) {
                    fullDayHandicap[item].upper += 1;
                } else {
                    fullDayHandicap[item] = { upper: 1, lower: 0, draw: 0 };
                }
            });

            fullHanicapLowerDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(fullDayHandicap, item)) {
                    fullDayHandicap[item].lower += 1;
                } else {
                    fullDayHandicap[item] = { upper: 0, lower: 1, draw: 0 };
                }
            });

            fullHanicapDrawDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(fullDayHandicap, item)) {
                    fullDayHandicap[item].draw += 1;
                } else {
                    fullDayHandicap[item] = { upper: 0, lower: 0, draw: 1 };
                }
            });

            halfHanicapUpperDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(halfDayHandicap, item)) {
                    halfDayHandicap[item].upper += 1;
                } else {
                    halfDayHandicap[item] = { upper: 1, lower: 0, draw: 0 };
                }
            });

            // 处理 Half Handicap Lower
            halfHanicapLowerDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(halfDayHandicap, item)) {
                    halfDayHandicap[item].lower += 1;
                } else {
                    halfDayHandicap[item] = { upper: 0, lower: 1, draw: 0 };
                }
            });

            // 处理 Half Handicap Draw
            halfHanicapDrawDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(halfDayHandicap, item)) {
                    halfDayHandicap[item].draw += 1;
                } else {
                    halfDayHandicap[item] = { upper: 0, lower: 0, draw: 1 };
                }
            });

            // 遍历并更新 fullOverUnderUpperDates
            fullOverUnderUpperDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(fullDayOverUnder, item)) {
                    fullDayOverUnder[item].upper += 1;
                } else {
                    fullDayOverUnder[item] = { upper: 1, lower: 0, draw: 0 };
                }
            });

            // 遍历并更新 fullOverUnderLowerDates
            fullOverUnderLowerDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(fullDayOverUnder, item)) {
                    fullDayOverUnder[item].lower += 1;
                } else {
                    fullDayOverUnder[item] = { upper: 0, lower: 1, draw: 0 };
                }
            });

            // 遍历并更新 fullOverUnderDrawDates
            fullOverUnderDrawDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(fullDayOverUnder, item)) {
                    fullDayOverUnder[item].draw += 1;
                } else {
                    fullDayOverUnder[item] = { upper: 0, lower: 0, draw: 1 };
                }
            });

            // 处理 Half OverUnder Upper
            halfOverUnderUpperDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(halfDayOverUnder, item)) {
                    halfDayOverUnder[item].upper += 1;
                } else {
                    halfDayOverUnder[item] = { upper: 1, lower: 0, draw: 0 };
                }
            });

            // 处理 Half OverUnder Lower
            halfOverUnderLowerDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(halfDayOverUnder, item)) {
                    halfDayOverUnder[item].lower += 1;
                } else {
                    halfDayOverUnder[item] = { upper: 0, lower: 1, draw: 0 };
                }
            });

            // 处理 Half OverUnder Draw
            halfOverUnderDrawDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(halfDayOverUnder, item)) {
                    halfDayOverUnder[item].draw += 1;
                } else {
                    halfDayOverUnder[item] = { upper: 0, lower: 0, draw: 1 };
                }
            });

            // 处理 Full MoneyLine Upper
            fullMoneyLineUpperDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(fullDayMoneyLine, item)) {
                    fullDayMoneyLine[item].upper += 1;
                } else {
                    fullDayMoneyLine[item] = { upper: 1, lower: 0, draw: 0 };
                }
            });

            // 处理 Full MoneyLine Lower
            fullMoneyLineLowerDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(fullDayMoneyLine, item)) {
                    fullDayMoneyLine[item].lower += 1;
                } else {
                    fullDayMoneyLine[item] = { upper: 0, lower: 1, draw: 0 };
                }
            });

            // 处理 Full MoneyLine Draw
            fullMoneyLineDrawDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(fullDayMoneyLine, item)) {
                    fullDayMoneyLine[item].draw += 1;
                } else {
                    fullDayMoneyLine[item] = { upper: 0, lower: 0, draw: 1 };
                }
            });

            // 处理 Half MoneyLine Upper
            halfMoneyLineUpperDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(halfDayMoneyLine, item)) {
                    halfDayMoneyLine[item].upper += 1;
                } else {
                    halfDayMoneyLine[item] = { upper: 1, lower: 0, draw: 0 };
                }
            });

            // 处理 Half MoneyLine Lower
            halfMoneyLineLowerDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(halfDayMoneyLine, item)) {
                    halfDayMoneyLine[item].lower += 1;
                } else {
                    halfDayMoneyLine[item] = { upper: 0, lower: 1, draw: 0 };
                }
            });

            // 处理 Half MoneyLine Draw
            halfMoneyLineDrawDates.forEach((item: string) => {
                if (Object.prototype.hasOwnProperty.call(halfDayMoneyLine, item)) {
                    halfDayMoneyLine[item].draw += 1;
                } else {
                    halfDayMoneyLine[item] = { upper: 0, lower: 0, draw: 1 };
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
                },
                half: {
                    day: {
                        handicap: halfDayHandicap,
                        overUnder: halfDayOverUnder,
                        moneyLine: halfDayMoneyLine
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
    setAnalysisResultData: (analysisResultData: GetAiAnalysisReportResponse) => {
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
    }
});

const createAnalysisResultStore = (init: InitState) =>
    (useAnalyticsResultStore = initStore<AnalysisResultState>(initialState, init));

export { createAnalysisResultStore, useAnalyticsResultStore };
