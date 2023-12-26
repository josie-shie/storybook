'use client';
import { type ReactNode } from 'react';
import { creatHandicapAnalysisStore } from './formStore';
import { creatLongDragonStore } from './longDragonStore';

function BigDataLayout({ children }: { children: ReactNode }) {
    creatHandicapAnalysisStore({
        recordList: []
    });
    creatLongDragonStore({
        hintsSelectPlay: '',
        hintsSelectType: '',
        hintsSelectProgres: ''
    });
    return <>{children}</>;
}

export default BigDataLayout;
