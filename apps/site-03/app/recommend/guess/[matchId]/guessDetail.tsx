'use client';
import type { Metadata } from 'next';
import { useState } from 'react';
import VsBox from './vsBox';
import MasterPlan from './masterPlan';
import Header from '@/components/header/headerTitle';

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
        </>
    );
}

export default GuessDetail;
