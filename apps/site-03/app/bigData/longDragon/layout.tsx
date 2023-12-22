'use client';
import type { ReactNode } from 'react';
import { creatHintsFormStore } from '../(list)/hintsFormStore';
import { creatMatchFilterStore } from '../(list)/matchFilterStore';

function LongDragonLayout({ children }: { children: ReactNode }) {
    creatMatchFilterStore({
        contestList: [],
        contestInfo: {}
    });
    creatHintsFormStore({
        handicapTips: []
    });
    return <>{children}</>;
}

export default LongDragonLayout;
