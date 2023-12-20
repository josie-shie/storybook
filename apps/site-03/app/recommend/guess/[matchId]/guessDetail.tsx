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
        guessesLeft: 6,
        masterPlanPrice: 20,
        detail: {
            leagueName: '歐錦U20A',
            dateTime: 1678880400,
            homeTeamLogo: '',
            homeTeamName: '泰国国立法政大学',
            awayTeamLogo: '',
            awayTeamName: '北曼谷學院',
            participants: 200,
            handicap: 0,
            handicapInChinese: '平手',
            overUnder: 0,
            guessHomeAway: 'none',
            guessBigSmall: 'none',
            home: 721,
            away: 84,
            big: 996,
            small: 355
        },
        highWinRateTrend: {
            home: 50,
            away: 50,
            over: 50,
            under: 50,
            enoughProData: true,
            memberPermission: false,
            unlockPrice: 1
        },
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
