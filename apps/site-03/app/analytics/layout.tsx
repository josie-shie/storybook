'use client';
import type { ReactNode } from 'react';
import Footer from '@/components/footer/footer';
import { createAnalyticsStore } from './analyticsStore';

function DataPageLayout({ children }: { children: ReactNode }) {
    createAnalyticsStore({
        pointsList: [
            {
                id: 1,
                ranking: 1,
                label: 3,
                name: '曼彻斯特城',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 2,
                ranking: 2,
                label: 3,
                name: '阿森納',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 3,
                ranking: 3,
                label: null,
                name: '曼彻斯特城',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 4,
                ranking: 4,
                label: 3,
                name: '利物浦',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 5,
                ranking: 5,
                label: 2,
                name: '布萊頓',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 6,
                ranking: 6,
                label: 1,
                name: '阿斯頓維拉',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 7,
                ranking: 7,
                label: null,
                name: '托特納姆熱刺',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 8,
                ranking: 8,
                label: null,
                name: '布侖特福德',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            },
            {
                id: 9,
                ranking: 9,
                label: 4,
                name: '布侖特福德',
                matches: 39,
                wins: 28,
                draws: 5,
                losses: 5,
                scored: 94,
                against: 33,
                total: 89
            }
        ],
        scheduleList: [
            {
                time: '05-28 23:30',
                status: 'finish',
                home: '南安普敦',
                homeScore: 4,
                away: '利物浦',
                awayScore: 4
            },
            {
                time: '05-28 23:30',
                status: 'finish',
                home: '南安普敦',
                homeScore: 4,
                away: '利物浦',
                awayScore: 4
            },
            {
                time: '05-28 23:30',
                status: 'finish',
                home: '南安普敦',
                homeScore: 4,
                away: '利物浦',
                awayScore: 4
            },
            {
                time: '05-28 23:30',
                status: 'finish',
                home: '南安普敦',
                homeScore: 4,
                away: '利物浦',
                awayScore: 4
            },
            {
                time: '05-28 23:30',
                status: 'finish',
                home: '南安普敦',
                homeScore: 4,
                away: '利物浦',
                awayScore: 4
            },
            {
                time: '05-28 23:30',
                status: 'finish',
                home: '南安普敦',
                homeScore: 4,
                away: '利物浦',
                awayScore: 4
            }
        ],
        handicapList: [
            {
                team: '曼彻斯特城',
                game: 0,
                win: 0,
                draw: 0,
                lose: 0,
                winPercent: 0,
                drawPercent: 24,
                losePercent: 33,
                total: 89
            },
            {
                team: '曼彻斯特城',
                game: 0,
                win: 0,
                draw: 0,
                lose: 0,
                winPercent: 0,
                drawPercent: 24,
                losePercent: 33,
                total: 89
            }
        ],
        totalGoalsList: [
            {
                team: '曼彻斯特城',
                game: 0,
                big: 0,
                draw: 0,
                small: 0,
                bigPercent: 0,
                drawPercent: 24,
                smallPercent: 33
            },
            {
                team: '曼彻斯特城',
                game: 0,
                big: 0,
                draw: 0,
                small: 0,
                bigPercent: 0,
                drawPercent: 24,
                smallPercent: 33
            }
        ],
        topScorersList: [
            {
                ranking: 1,
                member: '哈兰德',
                team: '南安普敦',
                score: 36,
                homeScore: 22,
                awayScore: 14
            },
            {
                ranking: 2,
                member: '凯恩',
                team: '切尔西',
                score: 36,
                homeScore: 22,
                awayScore: 14
            },
            {
                ranking: 3,
                member: '哈兰德',
                team: '南安普敦',
                score: 36,
                homeScore: 22,
                awayScore: 14
            },
            {
                ranking: 4,
                member: '凯恩',
                team: '切尔西',
                score: 36,
                homeScore: 22,
                awayScore: 14
            },
            {
                ranking: 5,
                member: '哈兰德',
                team: '南安普敦',
                score: 36,
                homeScore: 22,
                awayScore: 14
            },
            {
                ranking: 6,
                member: '凯恩',
                team: '切尔西',
                score: 36,
                homeScore: 22,
                awayScore: 14
            }
        ]
    });

    return (
        <>
            {children}
            <Footer />
        </>
    );
}

export default DataPageLayout;
