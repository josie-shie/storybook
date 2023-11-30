'use client';
import type { ReactNode } from 'react';
import Footer from '@/components/footer/footer';

function DataPageLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}

export default DataPageLayout;
