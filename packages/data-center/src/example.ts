import { fetcher } from 'lib';

export interface GetForbiddenWordResponse {
    forbidden_word: string;
    replaced_word: string;
    sensitive_level: string;
}

export interface AddForbiddenWordParams {
    forbidden_word: string;
    replaced_word: string;
    sensitive_level: string;
}

/**
 * 獲取敏感詞列表
 */
export const getForbiddenWords = async () => {
    try {
        const { data }: { data: { getForbiddenWords: GetForbiddenWordResponse[] } } = await fetcher(
            {
                data: {
                    query: `
                        query getForbiddenWords {
                            getForbiddenWords {
                                forbidden_word
                                replaced_word
                                sensitive_level
                            }
                        }
                    `
                }
            },
            { cache: 'no-store' }
        );

        return { data: data.getForbiddenWords };
    } catch (error) {
        return {
            error
        };
    }
};

/**
 * 新增敏感詞至列表
 */
export const addForbiddenWords = async (input: AddForbiddenWordParams) => {
    try {
        const { data }: { data: { getForbiddenWords: GetForbiddenWordResponse[] } } = await fetcher(
            {
                data: {
                    query: `
                        query getForbiddenWords($input: ForbiddenWordResponse!) {
                            getForbiddenWords(input: $input) {
                                forbidden_word
                                replaced_word
                                sensitive_level
                            }
                        }
                    `,
                    variables: {
                        input
                    }
                }
            },
            { cache: 'no-store' }
        );
        return { data: data.getForbiddenWords };
    } catch (error) {
        return {
            error
        };
    }
};
