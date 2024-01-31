'use client';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/header/headerTransparent';
import Footer from '@/components/footer/footer';
import style from './guessDetail.module.scss';
import VsBox from './vsBox';
import MasterPlan from './masterPlan';
import { createGuessDetailStore } from './guessDetailStore';
import Hints from './components/hints/hints';

export const metadata: Metadata = {
    title: '推荐详情 | FutureSport'
};

function GuessDetail({ backHistory }: { backHistory: boolean }) {
    const router = useRouter();
    const [showHints, setShowHints] = useState(localStorage.getItem('guessHints') || 'show');

    const handleCloseHints = () => {
        localStorage.setItem('guessHints', 'hide');
        setShowHints('hide');
    };

    const headerProps = {
        title: '猜球风向'
    };

    const back = () => {
        if (backHistory) {
            router.back();
        } else {
            router.push('/guess');
        }
    };

    createGuessDetailStore({ masterPlanList: [] });

    return (
        <div className={style.guessDetail}>
            {showHints === 'show' && <Hints onClose={handleCloseHints} />}
            <Header backHandler={back} title={headerProps.title} />
            <div className={style.container}>
                <VsBox />
                <MasterPlan />
            </div>
            <Footer />
        </div>
    );
}

export default GuessDetail;
