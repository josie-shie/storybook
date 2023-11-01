'use client';
import type { ReactNode } from 'react';
import { creatContestInfoStore } from './contestInfoStore';

function GlobalStore({ children }: { children: ReactNode }) {
    creatContestInfoStore({ contestInfo: {} });
    return <>{children}</>;
}

export default GlobalStore;
