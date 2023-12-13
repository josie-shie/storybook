'use client';
import type { ReactNode } from 'react';
import { creatFocusMemberStore } from './myFocusStore';

function MyFocusLayout({ children }: { children: ReactNode }) {
    creatFocusMemberStore({
        focusMemberItem: []
    });

    return <>{children}</>;
}

export default MyFocusLayout;
