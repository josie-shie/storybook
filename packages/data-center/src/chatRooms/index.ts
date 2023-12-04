import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError } from '../common';
import type { ReturnData } from '../common';
import { GET_FORBIDDEN_WORDS_QUERY } from './graphqlQueries';

const GetForbiddenWordSchema = z.object({
    forbidden_word: z.string(),
    replaced_word: z.string(),
    sensitive_level: z.string()
});

const GetForbiddenWordResultSchema = z.object({
    getForbiddenWords: z.array(GetForbiddenWordSchema)
});

type GetForbiddenWordResult = z.infer<typeof GetForbiddenWordResultSchema>;

export type GetForbiddenWord = z.infer<typeof GetForbiddenWordSchema>;
export type GetForbiddenWordResponse = GetForbiddenWord[];

/**
 * 獲取敏感詞列表
 * - returns : {@link GetForbiddenWordResponse}
 * - {@link GetForbiddenWord}
 */
export const getForbiddenWords = async (): Promise<ReturnData<GetForbiddenWordResponse>> => {
    try {
        const { data }: { data: GetForbiddenWordResult } = await fetcher(
            { data: { query: GET_FORBIDDEN_WORDS_QUERY } },
            { cache: 'no-store' }
        );
        GetForbiddenWordResultSchema.parse(data);
        return { success: true, data: data.getForbiddenWords };
    } catch (error) {
        return handleApiError(error);
    }
};
