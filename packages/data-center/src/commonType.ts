import { z } from 'zod';

export const PredictionResultSchema = z.union([
    z.literal('WIN'),
    z.literal('LOSE'),
    z.literal('DRAW'),
    z.literal('NONE')
]);

export type PredictionResult = z.infer<typeof PredictionResultSchema>;

export const PredictedPlaySchema = z.union([
    z.literal('HOME'),
    z.literal('AWAY'),
    z.literal('OVER'),
    z.literal('UNDER'),
    z.literal('LOCK')
]);

export type PredictedPlay = z.infer<typeof PredictedPlaySchema>;
