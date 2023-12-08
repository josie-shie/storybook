'use client';
import { type ReactNode } from 'react';
import Analysis from './analysis';

function BigDataLayout({ children }: { children: ReactNode }) {
    return <Analysis>{children}</Analysis>;
}

export default BigDataLayout;
