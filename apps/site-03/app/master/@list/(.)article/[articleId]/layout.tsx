'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header/headerTitle';

function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Header title="专家预测文章" />
            {children}
        </div>
    );
}

export default Layout;
