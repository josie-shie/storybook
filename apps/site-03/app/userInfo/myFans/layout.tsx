'use client';
import type { ReactNode } from 'react';
import { creatFansMemberStore } from './myFansStore';

function MyFocusLayout({ children }: { children: ReactNode }) {
    creatFansMemberStore({
        fansMemberItem: []
    });

    return <>{children}</>;
}

export default MyFocusLayout;
