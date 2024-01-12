'use client';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/headerTitleBack';
import Footer from '@/components/footer/footer';
import style from './guessDetail.module.scss';
import VsBox from './vsBox';
import MasterPlan from './masterPlan';
import { createGuessDetailStore } from './guessDetailStore';

export const metadata: Metadata = {
    title: '推荐详情 | FutureSport'
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
            router.push('/guess');
        }
    };

    createGuessDetailStore({ masterPlanList: [] });

    return (
        <>
            <Header back={back} title={headerProps.title} />
            <div className={style.container}>
                <VsBox />
                <MasterPlan />
            </div>
            <Footer />
        </>
    );
}

export default GuessDetail;
