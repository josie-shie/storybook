import type { GetAiAnalysisReportResponse, GetAiAnalysisContestListResponse } from './index';

// 智能分析：取得分析結果

export const AiAnalysisReport: GetAiAnalysisReportResponse = {
    memberId: 1,
    ticketId: '0fbdd0d',
    handicapSide: 'home',
    handicapValues: '2.5',
    overUnderValues: '',
    startTime: 1700728328,
    endTime: 1701333128,
    fullHandicapUpper: [2383275, 2458311, 2458308, 2439879, 2501913, 2502726, 2503730],
    fullHandicapLower: [2439876],
    fullHandicapDraw: [],
    fullHandicapUpperDaily: [
        { date: '2023-11-25', matches: 3 },
        { date: '2023-11-26', matches: 4 }
    ],
    fullHandicapLowerDaily: [{ date: '2023-11-26', matches: 1 }],
    fullHandicapDrawDaily: [],
    halfHandicapUpper: [2458311, 2439879, 2501913, 2502726],
    halfHandicapLower: [2383275, 2458308, 2439876, 2503730],
    halfHandicapDraw: [],
    halfHandicapUpperDaily: [
        { date: '2023-11-26', matches: 2 },
        { date: '2023-11-25', matches: 2 }
    ],
    halfHandicapLowerDaily: [
        { date: '2023-11-26', matches: 3 },
        { date: '2023-11-25', matches: 1 }
    ],
    halfHandicapDrawDaily: [],
    fullOverUnderOver: [2458308, 2439879, 2501913, 2502726],
    fullOverUnderUnder: [2458311, 2439876, 2503730],
    fullOverUnderDraw: [2383275],
    fullOverUnderOverDaily: [
        { date: '2023-11-26', matches: 2 },
        { date: '2023-11-25', matches: 2 }
    ],
    fullOverUnderUnderDaily: [{ date: '2023-11-26', matches: 3 }],
    fullOverUnderDrawDaily: [{ date: '2023-11-25', matches: 1 }],
    halfOverUnderOver: [2458308],
    halfOverUnderUnder: [2383275, 2458311, 2439879, 2439876, 2501913, 2502726, 2503730],
    halfOverUnderDraw: [],
    halfOverUnderOverDaily: [{ date: '2023-11-26', matches: 1 }],
    halfOverUnderUnderDaily: [
        { date: '2023-11-25', matches: 3 },
        { date: '2023-11-26', matches: 4 }
    ],
    halfOverUnderDrawDaily: [],
    fullTimeHomeWin: [2383275, 2458311, 2458308, 2439879, 2439876, 2501913, 2502726, 2503730],
    fullTimeDraw: [],
    fullTimeAwayWin: [],
    fullTimeHomeWinDaily: [
        { date: '2023-11-25', matches: 3 },
        { date: '2023-11-26', matches: 5 }
    ],
    fullTimeDrawDaily: [],
    fullTimeAwayWinDaily: [],
    halfTimeHomeWin: [2383275, 2458311, 2458308, 2439879, 2501913, 2502726, 2503730],
    halfTimeDraw: [2439876],
    halfTimeAwayWin: [],
    halfTimeHomeWinDaily: [
        { date: '2023-11-25', matches: 3 },
        { date: '2023-11-26', matches: 4 }
    ],
    halfTimeDrawDaily: [{ date: '2023-11-26', matches: 1 }],
    halfTimeAwayWinDaily: [],
    goalsIn15Mins: [
        {
            goalsOver: [2383275, 2458311, 2458308, 2501913, 2503730],
            goalsUnder: [
                2458311, 2458308, 2439879, 2439876, 2501913, 2502726, 2503730, 2458308, 2439879,
                2439876, 2501913, 2502726, 2503730, 2439879, 2439876, 2501913, 2502726, 2503730,
                2439879, 2439876, 2501913, 2502726, 2503730, 2439879, 2439876, 2501913, 2502726,
                2503730, 2439879, 2439876, 2502726, 2503730, 2439879, 2439876, 2502726, 2503730,
                2439879, 2439876, 2502726
            ]
        },
        {
            goalsOver: [2458311, 2458308, 2501913, 2502726],
            goalsUnder: [
                2383275, 2458311, 2458308, 2439879, 2439876, 2501913, 2502726, 2503730, 2383275,
                2458308, 2439879, 2439876, 2501913, 2502726, 2503730, 2383275, 2439879, 2439876,
                2501913, 2502726, 2503730, 2383275, 2439879, 2439876, 2501913, 2502726, 2503730,
                2383275, 2439879, 2439876, 2501913, 2502726, 2503730, 2383275, 2439879, 2439876,
                2502726, 2503730, 2383275, 2439879, 2439876, 2503730, 2383275, 2439879, 2439876,
                2503730
            ]
        },
        {
            goalsOver: [
                2383275, 2458311, 2458308, 2458308, 2439879, 2439879, 2439879, 2501913, 2502726,
                2502726
            ],
            goalsUnder: [
                2458311, 2458308, 2439879, 2439876, 2501913, 2502726, 2503730, 2458308, 2439879,
                2439876, 2501913, 2502726, 2503730, 2439879, 2439876, 2501913, 2502726, 2503730,
                2439876, 2501913, 2502726, 2503730, 2439876, 2501913, 2502726, 2503730, 2439876,
                2502726, 2503730, 2439876, 2503730, 2439876, 2503730
            ]
        },
        {
            goalsOver: [2458308, 2439879, 2439876, 2439876, 2502726, 2503730],
            goalsUnder: [
                2383275, 2458311, 2458308, 2439879, 2439876, 2501913, 2502726, 2503730, 2383275,
                2458311, 2458308, 2439879, 2439876, 2501913, 2502726, 2503730, 2383275, 2458311,
                2439879, 2439876, 2501913, 2502726, 2503730, 2383275, 2458311, 2439876, 2501913,
                2502726, 2503730, 2383275, 2458311, 2501913, 2502726, 2503730, 2383275, 2458311,
                2501913, 2502726, 2503730, 2383275, 2458311, 2501913, 2503730, 2383275, 2458311,
                2501913
            ]
        },
        {
            goalsOver: [2383275, 2383275, 2439879, 2439879, 2501913, 2502726],
            goalsUnder: [
                2458311, 2458308, 2439879, 2439876, 2501913, 2502726, 2503730, 2458311, 2458308,
                2439879, 2439876, 2501913, 2502726, 2503730, 2458311, 2458308, 2439879, 2439876,
                2501913, 2502726, 2503730, 2458311, 2458308, 2439876, 2501913, 2502726, 2503730,
                2458311, 2458308, 2439876, 2501913, 2502726, 2503730, 2458311, 2458308, 2439876,
                2502726, 2503730, 2458311, 2458308, 2439876, 2503730, 2458311, 2458308, 2439876,
                2503730
            ]
        },
        {
            goalsOver: [2383275, 2458311, 2458308, 2439879, 2501913, 2502726, 2503730],
            goalsUnder: [
                2458311, 2458308, 2439879, 2439876, 2501913, 2502726, 2503730, 2458308, 2439879,
                2439876, 2501913, 2502726, 2503730, 2439879, 2439876, 2501913, 2502726, 2503730,
                2439876, 2501913, 2502726, 2503730, 2439876, 2501913, 2502726, 2503730, 2439876,
                2502726, 2503730, 2439876, 2503730, 2439876
            ]
        }
    ],
    correctScores: [
        { score: '6-1', matches: [2502726] },
        { score: '4-0', matches: [2383275] },
        { score: '3-0', matches: [2458311, 2503730] },
        { score: '5-2', matches: [2458308, 2439879] },
        { score: '2-0', matches: [2439876] },
        { score: '5-0', matches: [2501913] }
    ],
    goalsInterval0To1: [],
    goalsInterval2To3: [2458311, 2439876, 2503730],
    goalsInterval4To6: [2383275, 2501913],
    goalsInterval7Plus: [2458308, 2439879, 2502726],
    analyTime: 1702455093
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
