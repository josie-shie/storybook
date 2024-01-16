'use client';
import { type ReactNode } from 'react';
import { creatQueryFormStore } from './queryFormStore';
import { creatLeagueStore } from './leagueStore';

function BigDataLayout({ children }: { children: ReactNode }) {
    creatQueryFormStore({
        loading: false
    });
    creatLeagueStore({
        loading: false
    });
    return <>{children}</>;
}

export default BigDataLayout;
