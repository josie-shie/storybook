import type {
    BigDataRecordListResponse,
    BigDataHintListResponse,
    GetAiAnalysisReportResponse,
    GetAiAnalysisContestListResponse
} from './index';

// 智能分析：盤路提示列表API
export const OddsHintList: BigDataHintListResponse = [
    {
        startTime: 1701094800,
        matchId: 2504100,
        countryCn: '科威特',
        leagueId: 923,
        leagueChsShort: '科威甲',
        homeId: 3665,
        homeChs: 'Al沙希尔',
        awayId: 7977,
        awayChs: '伯根',
        longOddsTeamId: 7977,
        longOddsType: '大',
        longOddsTimes: 4,
        isFamous: true,
        leagueLevel: 0
    },
    {
        startTime: 1701095400,
        matchId: 2504146,
        countryCn: '卡塔尔',
        leagueId: 1671,
        leagueChsShort: '卡后备',
        homeId: 35706,
        homeChs: '杜哈阿拉伯后备队',
        awayId: 30195,
        awayChs: '华卡拉后备队',
        longOddsTeamId: 35706,
        longOddsType: '赢',
        longOddsTimes: 1,
        isFamous: false,
        leagueLevel: 1
    }
];

// 智能分析：分析紀錄列表API
export const BigDataRecordList: BigDataRecordListResponse = [
    {
        recordId: 1,
        recordTime: 1701771917,
        handicap: 'home',
        odds: '1',
        overUnder: '1',
        startDate: 1701771917,
        endDate: 1701771917,
        state: 0
    },
    {
        recordId: 1,
        recordTime: 1701919911,
        handicap: 'away',
        odds: '',
        overUnder: '4+',
        startDate: 1701771917,
        endDate: 1701919911,
        state: 0
    }
];

// 智能分析：取得分析結果

export const AiAnalysisReport: GetAiAnalysisReportResponse = {
    // 全場讓球
    fullHandicapUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullHandicapLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullHandicapDraw: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullHandicapUpperDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    fullHandicapLowerDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    fullHandicapDrawDaily: [1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394],
    // 半場讓球
    halfHandicapUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfHandicapLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfHandicapDraw: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfHandicapUpperDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    halfHandicapLowerDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    halfHandicapDrawDaily: [1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394],
    // 全場大小
    fullOverUnderUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullOverUnderLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullOverUnderDraw: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullOverUnderUpperDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    fullOverUnderLowerDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    fullOverUnderDrawDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    // 半場大小
    halfOverUnderUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfOverUnderLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfOverUnderDraw: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfOverUnderUpperDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    halfOverUnderLowerDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    halfOverUnderDrawDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    // 全場獨贏
    fullMoneyLineUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullMoneyLineLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullMoneyLineDraw: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    fullMoneyLineUpperDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    fullMoneyLineLowerDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    fullMoneyLineDrawDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    // 半場獨贏
    halfMoneyLineUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfMoneyLineLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfMoneyLineDraw: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
    halfMoneyLineUpperDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    halfMoneyLineLowerDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    halfMoneyLineDrawDaily: [
        1701920394, 1701833994, 1701747594, 1701661194, 1701574794, 1701488394
    ],
    // 固定是6個object,代表6個時間區間
    minutesGoal: [
        {
            goalUpper: [2504100, 2504101],
            goalLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
        },
        {
            goalUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
            goalLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
        },
        {
            goalUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
            goalLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
        },
        {
            goalUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
            goalLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
        },
        {
            goalUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
            goalLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
        },
        {
            goalUpper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
            goalLower: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
        }
    ],
    // 固定4個
    goalRange: {
        goalRange0To1: [2504100, 2504101],
        goalRange2To3: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange4To6: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange7Upper: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
    },
    // 固定26個
    exactGoal: {
        goalRange1To0: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange0To1: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange0To0: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange2To0: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange0To2: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange1To1: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange2To1: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange1To2: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange2To2: [2504100, 2504101],
        goalRange3To0: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange0To3: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange3To3: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange3To1: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange1To3: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange4To4: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange3To2: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange2To3: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange4To0: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange0To4: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange4To1: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange1To4: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange4To2: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange2To4: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange4To3: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        goalRange3To4: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421],
        others: [2504145, 2487425, 2502652, 2504141, 2423502, 2442421]
    }
};

// 智能分析：用matchIds取得賽事列表
export const AiAnalysisContestList: GetAiAnalysisContestListResponse = [
    {
        startTime: 1699280450,
        matchId: 2504100,
        countryCn: '科威特',
        leagueId: 923,
        leagueChsShort: '科威甲',
        homeChs: 'Al沙希尔',
        awayChs: '伯根',
        homeScore: 3,
        awayScore: 0,
        homeHalfScore: 3,
        awayHalfScore: 0,
        isFamous: true,
        leagueLevel: 1
    },
    {
        startTime: 1701099199,
        matchId: 2504145,
        countryCn: '卡塔尔',
        leagueId: 1671,
        leagueChsShort: '卡后备',
        homeChs: '恩沙巴后备队',
        awayChs: '阿尔加尔后备队',
        homeScore: 3,
        awayScore: 0,
        homeHalfScore: 3,
        awayHalfScore: 0,
        isFamous: false,
        leagueLevel: 0
    }
];
