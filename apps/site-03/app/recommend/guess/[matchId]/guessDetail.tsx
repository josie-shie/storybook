'use client';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import VsBox from './vsBox';
import MasterPlan from './masterPlan';
import Header from '@/components/header/headerTitleBack';
import Footer from '@/components/footer/footer';

export const metadata: Metadata = {
    title: '推薦詳情'
};

function GuessDetail({ backHistory }: { backHistory: boolean }) {
    const router = useRouter();
    const [isUnlocked, setIsUnlocked] = useState(false);

    const headerProps = {
        title: '足球竞猜',
        total: 999999
    };

    const back = () => {
        if (backHistory) {
            router.back();
        } else {
            router.push('/recommend/guess');
        }
    };
    return (
        <>
            <Header back={back} title={headerProps.title} total={headerProps.total} />
            <VsBox isUnlocked={isUnlocked} />
            <MasterPlan isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked} />
            <Footer />
        </>
    );
}

export default GuessDetail;
