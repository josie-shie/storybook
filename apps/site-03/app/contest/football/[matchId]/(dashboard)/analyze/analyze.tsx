import { createAnalyzeStore } from './analyzeStore';
import BeforeGameTable from './beforeGameTable';
import LeagueRankTables from './leagueRankTables';
import LeagueTrendTables from './leagueTrendTables';

function Analyze() {
    createAnalyzeStore({
        companyDetailAnalyze: [
            {
                label: '欧',
                init: 3.85,
                initHome: 3.45,
                initAway: 1.82,
                current: 3.85,
                currentHome: 3.45,
                currentAway: 1.82
            },
            {
                label: '亞',
                init: -0.5,
                initHome: 1,
                initAway: 0.82,
                current: 0.82,
                currentHome: 1.06,
                currentAway: 0.82
            },
            {
                label: '大',
                init: 3,
                initHome: 0.91,
                initAway: 0.89,
                current: 3.25,
                currentHome: 0.99,
                currentAway: 0.87
            }
        ],
        leagueTrendData: {
            homeOdds: {
                totalFullTime: {
                    name: '',
                    played: 0,
                    handicapWin: 0,
                    handicapDraw: 0,
                    handicapLose: 0,
                    HandicapWinRate: 0,
                    overUnderOver: 0,
                    overUnderOverRate: 0,
                    overUnderUnder: 0,
                    overUnderUnderRate: 0
                },
                homeFullTime: {
                    name: '',
                    played: 0,
                    handicapWin: 0,
                    handicapDraw: 0,
                    handicapLose: 0,
                    HandicapWinRate: 0,
                    overUnderOver: 0,
                    overUnderOverRate: 0,
                    overUnderUnder: 0,
                    overUnderUnderRate: 0
                },
                awayFullTime: {
                    name: '',
                    played: 0,
                    handicapWin: 0,
                    handicapDraw: 0,
                    handicapLose: 0,
                    HandicapWinRate: 0,
                    overUnderOver: 0,
                    overUnderOverRate: 0,
                    overUnderUnder: 0,
                    overUnderUnderRate: 0
                },
                lastSixResultFullTime: {
                    name: '',
                    played: 0,
                    handicapResult: '',
                    handicapWinRate: 0,
                    overUnderResult: ''
                },
                totalHalfTime: {
                    name: '',
                    played: 0,
                    handicapWin: 0,
                    handicapDraw: 0,
                    handicapLose: 0,
                    HandicapWinRate: 0,
                    overUnderOver: 0,
                    overUnderOverRate: 0,
                    overUnderUnder: 0,
                    overUnderUnderRate: 0
                },
                homeHalfTime: {
                    name: '',
                    played: 0,
                    handicapWin: 0,
                    handicapDraw: 0,
                    handicapLose: 0,
                    HandicapWinRate: 0,
                    overUnderOver: 0,
                    overUnderOverRate: 0,
                    overUnderUnder: 0,
                    overUnderUnderRate: 0
                },
                awayHalfTime: {
                    name: '',
                    played: 0,
                    handicapWin: 0,
                    handicapDraw: 0,
                    handicapLose: 0,
                    HandicapWinRate: 0,
                    overUnderOver: 0,
                    overUnderOverRate: 0,
                    overUnderUnder: 0,
                    overUnderUnderRate: 0
                },
                lastSixResultHalfTime: {
                    name: '',
                    played: 0,
                    handicapResult: '',
                    handicapWinRate: 0,
                    overUnderResult: ''
                }
            },
            awayOdds: {
                totalFullTime: {
                    name: '',
                    played: 0,
                    handicapWin: 0,
                    handicapDraw: 0,
                    handicapLose: 0,
                    HandicapWinRate: 0,
                    overUnderOver: 0,
                    overUnderOverRate: 0,
                    overUnderUnder: 0,
                    overUnderUnderRate: 0
                },
                homeFullTime: {
                    name: '',
                    played: 0,
                    handicapWin: 0,
                    handicapDraw: 0,
                    handicapLose: 0,
                    HandicapWinRate: 0,
                    overUnderOver: 0,
                    overUnderOverRate: 0,
                    overUnderUnder: 0,
                    overUnderUnderRate: 0
                },
                awayFullTime: {
                    name: '',
                    played: 0,
                    handicapWin: 0,
                    handicapDraw: 0,
                    handicapLose: 0,
                    HandicapWinRate: 0,
                    overUnderOver: 0,
                    overUnderOverRate: 0,
                    overUnderUnder: 0,
                    overUnderUnderRate: 0
                },
                lastSixResultFullTime: {
                    name: '',
                    played: 0,
                    handicapResult: '',
                    handicapWinRate: 0,
                    overUnderResult: ''
                },
                totalHalfTime: {
                    name: '',
                    played: 0,
                    handicapWin: 0,
                    handicapDraw: 0,
                    handicapLose: 0,
                    HandicapWinRate: 0,
                    overUnderOver: 0,
                    overUnderOverRate: 0,
                    overUnderUnder: 0,
                    overUnderUnderRate: 0
                },
                homeHalfTime: {
                    name: '',
                    played: 0,
                    handicapWin: 0,
                    handicapDraw: 0,
                    handicapLose: 0,
                    HandicapWinRate: 0,
                    overUnderOver: 0,
                    overUnderOverRate: 0,
                    overUnderUnder: 0,
                    overUnderUnderRate: 0
                },
                awayHalfTime: {
                    name: '',
                    played: 0,
                    handicapWin: 0,
                    handicapDraw: 0,
                    handicapLose: 0,
                    HandicapWinRate: 0,
                    overUnderOver: 0,
                    overUnderOverRate: 0,
                    overUnderUnder: 0,
                    overUnderUnderRate: 0
                },
                lastSixResultHalfTime: {
                    name: '',
                    played: 0,
                    handicapResult: '',
                    handicapWinRate: 0,
                    overUnderResult: ''
                }
            }
        }
    });
    return (
        <>
            <BeforeGameTable />
            <LeagueRankTables />
            <LeagueTrendTables />
        </>
    );
}

export default Analyze;
