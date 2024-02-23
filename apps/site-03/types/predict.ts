import type { StaticImageData } from 'next/image';

export interface Predict {
    mentor_avatar: StaticImageData;
    mentorId: number;
    mentorName: string;
    rank: number;
    onRoll: number;
    homeChs: string;
    awayChs: string;
    max_accurate_streak: number; // -1表示不顯示
    price: number;
    createdAt: string;
    unlockTotal: number;
}

export type GuessType = 'NONE' | 'WIN' | 'DRAW' | 'LOSE' | 'PUSH';
export type GuessTeam = 'HOMEAWAY' | 'OVERUNDER';
export type PredictTypeWithLock = 'HOME' | 'AWAY' | 'OVER' | 'UNDER' | 'LOCK';
export type HandicapType = 'HANDICAP' | 'OVERUNDER';
export type PredictArticleType = 'WIN' | 'DRAW' | 'LOSE';
export type GuessRecord = 'WIN' | 'LOSE';
