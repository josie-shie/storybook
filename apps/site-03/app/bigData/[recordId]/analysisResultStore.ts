import 'dayjs/locale/zh-cn';
import { initStore, timestampToString } from 'lib';
import type { StoreWithSelectors } from 'lib';
import { getISOWeek, parseISO } from 'date-fns';
import type { GetAiAnalysisContestListResponse } from 'data-center';

export interface Match {
    startTime: number;
    matchId: number;
    countryCn: string;
    leagueId: number;
    leagueChsShort: string;
    homeChs: string;
    awayChs: string;
    homeScore: number;
    awayScore: number;
    homeHalfScore: number;
    awayHalfScore: number;
    isFamous: boolean; // 是否熱門賽事
    leagueLevel: number;
}

export interface AnalysisResult {
    // 全場讓球
    fullHandicapUpper: number[]; // full的讓球的“上”的所有的賽事matchId
    fullHandicapLower: number[]; // full的讓球的“下”的所有的賽事matchId
    fullHandicapDraw: number[]; // full的讓球的“走”的所有的賽事matchId
    fullHandicapUpperDaily: number[]; // 新增
    fullHandicapLowerDaily: number[]; // 新增
    fullHandicapDrawDaily: number[]; // 新增
    // 半場讓球
    halfHandicapUpper: number[]; // 新增
    halfHandicapLower: number[]; // 新增
    halfHandicapDraw: number[]; // 新增
    halfHandicapUpperDaily: number[]; // half的讓球的“上”的所有的賽事日期
    halfHandicapLowerDaily: number[]; // half的讓球的“下”的所有的賽事日期
    halfHandicapDrawDaily: number[]; // half的讓球的“走”的所有的賽事日期
    // 全場大小
    fullOverUnderUpper: number[]; // full的讓球的“上”的所有的賽事matchId
    fullOverUnderLower: number[]; // full的讓球的“下”的所有的賽事matchId
    fullOverUnderDraw: number[]; // full的讓球的“走”的所有的賽事matchId
    fullOverUnderUpperDaily: number[]; // 新增
    fullOverUnderLowerDaily: number[]; // 新增
    fullOverUnderDrawDaily: number[]; // 新增
    // 半場大小
    halfOverUnderUpper: number[]; // 新增
    halfOverUnderLower: number[]; // 新增
    halfOverUnderDraw: number[]; // 新增
    halfOverUnderUpperDaily: number[]; // half的讓球的“上”的所有的賽事日期
    halfOverUnderLowerDaily: number[]; // half的讓球的“下”的所有的賽事日期
    halfOverUnderDrawDaily: number[]; // half的讓球的“走”的所有的賽事日期
    // 全場獨贏
    fullMoneyLineUpper: number[]; // full的獨贏的“上”的所有的賽事matchId
    fullMoneyLineLower: number[]; // full的獨贏的“下”的所有的賽事matchId
    fullMoneyLineDraw: number[]; // full的獨贏的“走”的所有的賽事matchId
    fullMoneyLineUpperDaily: number[]; // 新增
    fullMoneyLineLowerDaily: number[]; // 新增
    fullMoneyLineDrawDaily: number[]; // 新增
    // 半場獨贏
    halfMoneyLineUpper: number[]; // 新增
    halfMoneyLineLower: number[]; // 新增
    halfMoneyLineDraw: number[]; // 新增
    halfMoneyLineUpperDaily: number[]; // half的獨贏的“上”的所有的賽事日期
    halfMoneyLineLowerDaily: number[]; // half的獨贏的“下”的所有的賽事日期
    halfMoneyLineDrawDaily: number[]; // half的獨贏的“走”的所有的賽事日期
    // 固定是6個object,代表6個時間區間
    minutesGoal: {
        goalUpper: number[]; // 該時間段的所有“大”的賽事matchId
        goalLower: number[]; // 該時間段的所有“小”的賽事matchId
    }[];
    // 固定4個
    goalRange: {
        goalRange0To1: number[]; // 該分數區間的賽事matchId
        goalRange2To3: number[]; // 該分數區間的賽事matchId
        goalRange4To6: number[]; // 該分數區間的賽事matchId
        goalRange7Upper: number[]; // 該分數區間的賽事matchId
    };
    // 固定26個
    exactGoal: {
        goalRange1To0: number[]; // 該分數區間的賽事matchId
        goalRange0To1: number[]; // 該分數區間的賽事matchId
        goalRange0To0: number[]; // 該分數區間的賽事matchId
        goalRange2To0: number[]; // 該分數區間的賽事matchId
        goalRange0To2: number[]; // 該分數區間的賽事matchId
        goalRange1To1: number[]; // 該分數區間的賽事matchId
        goalRange2To1: number[]; // 該分數區間的賽事matchId
        goalRange1To2: number[]; // 該分數區間的賽事matchId
        goalRange2To2: number[]; // 該分數區間的賽事matchId
        goalRange3To0: number[]; // 該分數區間的賽事matchId
        goalRange0To3: number[]; // 該分數區間的賽事matchId
        goalRange3To3: number[]; // 該分數區間的賽事matchId
        goalRange3To1: number[]; // 該分數區間的賽事matchId
        goalRange1To3: number[]; // 該分數區間的賽事matchId
        goalRange4To4: number[]; // 該分數區間的賽事matchId
        goalRange3To2: number[]; // 該分數區間的賽事matchId
        goalRange2To3: number[]; // 該分數區間的賽事matchId
        goalRange4To0: number[]; // 該分數區間的賽事matchId
        goalRange0To4: number[]; // 該分數區間的賽事matchId
        goalRange4To1: number[]; // 該分數區間的賽事matchId
        goalRange1To4: number[]; // 該分數區間的賽事matchId
        goalRange4To2: number[]; // 該分數區間的賽事matchId
        goalRange2To4: number[]; // 該分數區間的賽事matchId
        goalRange4To3: number[]; // 該分數區間的賽事matchId
        goalRange3To4: number[]; // 該分數區間的賽事matchId
        others: number[]; // 該分數區間的賽事matchId
    };
}

export interface BigDataRecordListResponse {
    recordId: number;
    recordTime: number;
    handicap: string;
    odds: string;
    overUnder: string;
    startDate: number;
    endDate: number;
    state: number;
}

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
    analysisResultData: AnalysisResult;
    recordList: BigDataRecordListResponse[];
    recordData: BigDataRecordListResponse;
}

interface AnalysisResultState extends InitState {
    showContestDrawer: boolean;
    setShowContestDrawer: (showContestDrawer: boolean) => void;
    contestList: GetAiAnalysisContestListResponse;
    setContestList: (contestList: GetAiAnalysisContestListResponse) => void;
    selectedResult: { type: string; odds: string };
    setSelectedResult: (selectedResult: { type: string; odds: string }) => void;
    handicapEchart: HandicapEchartType;
    setAnalysisResultData: (analysisResultData: AnalysisResult) => void;
    setRecordData: (recordData: BigDataRecordListResponse) => void;
    setRecordList: (recordList: BigDataRecordListResponse[]) => void;
    setHandicapEchart: (analysisResultData: AnalysisResult) => void;
}

let useAnalyticsResultStore: StoreWithSelectors<AnalysisResultState>;

const initialState = (
    set: (updater: (state: AnalysisResultState) => Partial<AnalysisResultState>) => void
) => ({
    analysisResultData: {} as AnalysisResult,
    recordList: [],
    recordData: {} as BigDataRecordListResponse,
    setRecordData: (recordData: BigDataRecordListResponse) => {
        set(state => {
            return {
                ...state,
                recordData
            };
        });
    },
    setRecordList: (recordList: BigDataRecordListResponse[]) => {
        set(state => {
            return {
                ...state,
                recordList
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
    setHandicapEchart: (analysisResultData: AnalysisResult) => {
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
    setAnalysisResultData: (analysisResultData: AnalysisResult) => {
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
