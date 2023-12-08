'use client';
import type { ReactNode } from 'react';
import { creatMyGuessStoreStore } from './myGuessStore';

function MyGuessLayout({ children }: { children: ReactNode }) {
    creatMyGuessStoreStore({
        myGuess: {
            recentPerformance: {
                byWeek: {
                    rank: 0,
                    summary: { play: 0, win: 0, draw: 0, lose: 0 },
                    handicap: { play: 0, win: 0, draw: 0, lose: 0 },
                    size: { play: 0, win: 0, draw: 0, lose: 0 }
                },
                byMonth: {
                    rank: 0,
                    summary: { play: 0, win: 0, draw: 0, lose: 0 },
                    handicap: { play: 0, win: 0, draw: 0, lose: 0 },
                    size: { play: 0, win: 0, draw: 0, lose: 0 }
                },
                byQuarter: {
                    rank: 0,
                    summary: { play: 0, win: 0, draw: 0, lose: 0 },
                    handicap: { play: 0, win: 0, draw: 0, lose: 0 },
                    size: { play: 0, win: 0, draw: 0, lose: 0 }
                }
            },
            myPlans: {
                guessType: 0,
                guessMatchList: [],
                pagination: {
                    pageCount: 0,
                    totalCount: 0
                }
            },
            guessRecordList: {
                recordList: [],
                pagination: {
                    pageCount: 0,
                    totalCount: 0
                }
            }
        }
    });

    return <>{children}</>;
}

export default MyGuessLayout;
