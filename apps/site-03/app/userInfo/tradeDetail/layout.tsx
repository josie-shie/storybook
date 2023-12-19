'use client';
import type { ReactNode } from 'react';
import { creatTardeDetailStore } from './tradeDetailStore';

function TardeLayout({ children }: { children: ReactNode }) {
    creatTardeDetailStore();

    return <>{children}</>;
}

export default TardeLayout;
