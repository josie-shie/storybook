'use client';

import type { ReactNode } from 'react';
import Header from '@/components/header/headerTitle';
import Footer from '@/components/footer/footer';

function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header title="专家预测文章" />
            {children}
            <Footer />
        </>
    );
}

export default Layout;
