'use client';
import type { ReactNode } from 'react';
import { createIntiveStore } from './inviteStore';

function InviteLayout({ children }: { children: ReactNode }) {
    createIntiveStore({
        loading: false
    });

    return <>{children}</>;
}

export default InviteLayout;
