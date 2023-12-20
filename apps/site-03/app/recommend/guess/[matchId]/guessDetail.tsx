'use client';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/headerTitleBack';
import Footer from '@/components/footer/footer';
import VsBox from './vsBox';
import MasterPlan from './masterPlan';
import { createGuessDetailStore } from './guessDetailStore';

export const metadata: Metadata = {
    title: '推薦詳情'
};

function GuessDetail({ backHistory }: { backHistory: boolean }) {
    const router = useRouter();

    const headerProps = {
        title: '猜风向'
    };

    const back = () => {
        if (backHistory) {
            router.back();
        } else {
            router.push('/recommend/guess');
        }
    };

    createGuessDetailStore({
        masterPlanList: []
    });

    return (
        <>
            <Header back={back} title={headerProps.title} />
            <VsBox />
            <MasterPlan />
            <Footer />
        </>
    );
}

export default GuessDetail;
