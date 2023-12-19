'use client';
import type { ReactNode } from 'react';
import { creatMyGuessStore } from './myGuessStore';

function MyGuessLayout({ children }: { children: ReactNode }) {
    creatMyGuessStore();

    return <>{children}</>;
}

export default MyGuessLayout;
