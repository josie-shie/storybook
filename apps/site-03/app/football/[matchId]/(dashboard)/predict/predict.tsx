'use client';

import type { GetPostListResponse } from 'data-center';
import PredictList from './predictList';
import { creatPredictStore } from './predictStore';

function Predict({ predictData, matchId }: { predictData: GetPostListResponse; matchId: number }) {
    creatPredictStore({
        predictList: predictData.posts,
        pageCount: predictData.pagination.pageCount,
        totalCount: predictData.pagination.totalCount
    });
    return <PredictList matchId={matchId} />;
}

export default Predict;
