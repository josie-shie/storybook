import { fetcher } from 'lib';
import { z } from 'zod';
import { handleApiError, throwErrorMessage } from '../common';
import type { ReturnData, FetchResultData } from '../common';
import { GET_BANNER_LIST_QUERY } from './graphqlQueries';

const DisplayTime = z.object({
    startTime: z.number(),
    endTime: z.number(),
    isForever: z.boolean()
});

const PaginationSchema = z.object({
    pageCount: z.number(),
    totalCount: z.number()
});

const BannerSchema = z.object({
    id: z.number(),
    location: z.string(),
    title: z.string(),
    imgPath: z.string(),
    link: z.string(),
    displayTime: DisplayTime,
    isActive: z.boolean()
});

const GetBannerListResultSchema = z.object({
    banners: z.array(BannerSchema),
    Pagination: PaginationSchema
});

export type BannerInfo = z.infer<typeof BannerSchema>;
export type GetBannerListResult = z.infer<typeof GetBannerListResultSchema>;

const GetBannerListResponseSchema = z.object({
    getBannerList: GetBannerListResultSchema
});
export type GetBannerListResponse = z.infer<typeof GetBannerListResponseSchema>;

/**
 * 取得對應位置該顯示的Banner清單
 * - param (location: string) ex: ALL | MATCH | SOCCERGUESS | SOCCERANALYSIS
 * - returns : {@link GetBannerListResultSchema}
 */
export const getBannerList = async ({
    location
}: {
    location: string;
}): Promise<ReturnData<GetBannerListResult>> => {
    try {
        const { data, errors } = await fetcher<FetchResultData<GetBannerListResponse>, unknown>(
            {
                data: {
                    query: GET_BANNER_LIST_QUERY,
                    variables: {
                        input: {
                            location
                        }
                    }
                }
            },
            { cache: 'no-store' }
        );

        throwErrorMessage(errors);
        GetBannerListResultSchema.parse(data);
        return {
            success: true,
            data: data.getBannerList
        };
    } catch (error) {
        return handleApiError(error);
    }
};
