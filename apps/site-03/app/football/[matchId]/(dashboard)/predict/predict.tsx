'use client';

import type { GetPredictionMatchPostsResponse } from 'data-center';
import PredictList from './predictList';
import { creatPredictStore } from './predictStore';

function Predict({ predictData }: { predictData: GetPredictionMatchPostsResponse }) {
    creatPredictStore({
        predictList: predictData
    });
    return <PredictList />;
}

export default Predict;
