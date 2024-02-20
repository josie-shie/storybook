import { z } from 'zod';

export const PredictionResultSchema = z.union([
    z.literal('WIN'),
    z.literal('LOSE'),
    z.literal('DRAW'),
    z.literal('NONE'),
    z.literal('PUSH')
]);

export type PredictionResult = z.infer<typeof PredictionResultSchema>;

export const PredictedPlaySchema = z.union([
    z.literal('HOME'),
    z.literal('AWAY'),
    z.literal('OVER'),
    z.literal('UNDER'),
    z.literal('LOCK'),
    z.literal('HANDICAP'),
    z.literal('OVERUNDER')
]);

export type PredictedPlay = z.infer<typeof PredictedPlaySchema>;

export const TagSchema = z.object({
    id: z.number(),
    tagName: z.string(),
    note: z.string(),
    colorCode: z.string(),
    weekHitRecentTen: z.number(),
    weekMaxAccurateStreak: z.number(),
    weekHitMatches: z.number(),
    weekTotalMatches: z.number(),
    weekHitRate: z.number(),
    weekHitRateDisplay: z.string(),
    weekRanking: z.number(),
    weekHistoryMaxWinStreak: z.number(),
    monthHitRecentTen: z.number(),
    monthMaxAccurateStreak: z.number(),
    monthHitMatches: z.number(),
    monthTotalMatches: z.number(),
    monthHitRate: z.number(),
    monthHitRateDisplay: z.string(),
    monthRanking: z.number(),
    monthHistoryMaxWinStreak: z.number(),
    quarterHitRecentTen: z.number(),
    quarterMaxAccurateStreak: z.number(),
    quarterHitMatches: z.number(),
    quarterTotalMatches: z.number(),
    quarterHitRate: z.number(),
    quarterHitRateDisplay: z.string(),
    quarterRanking: z.number(),
    quarterHistoryMaxWinStreak: z.number(),
    winHitRecentTen: z.number(),
    winMaxAccurateStreak: z.number(),
    winHitMatches: z.number(),
    winTotalMatches: z.number(),
    winHitRate: z.number(),
    winHitRateDisplay: z.string(),
    winRanking: z.number(),
    winHistoryMaxWinStreak: z.number()
});

export type TagType = z.infer<typeof TagSchema>;

export const ChangeTypeCategorySchema = z.union([
    z.literal('ALL'),
    z.literal('RECHARGE'),
    z.literal('PAY'),
    z.literal('INCOME')
]);

export type ChangeTypeCategory = z.infer<typeof ChangeTypeCategorySchema>;

export const RechargeStatusSchema = z.union([
    z.literal('SUCCESS'),
    z.literal('PENDING'),
    z.literal('FAIL')
]);

export type RechargeStatus = z.infer<typeof RechargeStatusSchema>;

// 競猜玩法 ( 0: 全部, 1: 讓球, 2: 大小球 )
export type GuessType = -1 | 0 | 1 | 2;
export interface Pagination {
    pageCount: number;
    totalCount: number;
}
