'use client';
import type { Metadata } from 'next';
import { useState } from 'react';
import VsBox from './vsBox';
import MasterPlan from './masterPlan';
import Header from '@/components/header/headerTitle';
import Footer from '@/components/footer/footer';

export const metadata: Metadata = {
    title: '推薦詳情'
};

function GuessDetail() {
    const [isUnlocked, setIsUnlocked] = useState(false);

    const headerProps = {
        title: '足球竞猜',
        total: 999999
    };
    return (
        <>
            <Header title={headerProps.title} total={headerProps.total} />
            <VsBox isUnlocked={isUnlocked} />
            <MasterPlan isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked} />
            <Footer />
        </>
    );
}

export default GuessDetail;
