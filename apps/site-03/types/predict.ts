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

export type HandicapType = 'overUnder' | 'handicap';
export type GuessType = 'NONE' | 'WIN' | 'DRAW' | 'LOSE';
export type GuessTeam = 'HOMEAWAY' | 'OVERUNDER';
export type PredictType = 'HOME' | 'AWAY' | 'OVER' | 'UNDER' | 'LOCK';
