'use client';

import type { GetMatchPostsResponse } from 'data-center';
import PredictList from './predictList';
import { creatPredictStore } from './predictStore';

function Predict({ predictData }: { predictData: GetMatchPostsResponse }) {
    creatPredictStore({
        predictList: predictData
    });
    return <PredictList />;
}

export default Predict;
