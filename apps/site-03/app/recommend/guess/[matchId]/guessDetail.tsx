'use client';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import VsBox from './vsBox';
import MasterPlan from './masterPlan';
import { createGuessDetailStore } from './guessDetailStore';
import Header from '@/components/header/headerTitleBack';
import Footer from '@/components/footer/footer';

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
        unlockTrend: false,
        detail: {
            leagueName: '歐錦U20A',
            dateTime: '7-14 02:00',
            homeTeamLogo: '',
            homeTeamName: '泰国国立法政大学',
            awayTeamLogo: '',
            awayTeamName: '北曼谷學院',
            participants: 200,
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
            enoughProData: false,
            memberPermission: false
        },
        masterPlanList: [
            {
                id: 7,
                avatar: '',
                name: '羅曼琉球',
                hotStreak: 9,
                ranking: 345,
                homeTeam: '欧锦U20A',
                awayTeam: '斯洛文尼亚U20',
                unlock: false,
                unlockPrice: 40,
                history: ['win', 'lose', 'draw', 'win', 'lose', 'draw', 'win', 'lose', 'draw'],
                guess: 'home',
                result: 'win',
                guessValue: 0.5
            },
            {
                id: 10,
                avatar: '',
                name: '小羅聊球',
                hotStreak: 7,
                ranking: 345,
                homeTeam: '欧锦U20A',
                awayTeam: '斯洛文尼亚U20',
                unlock: false,
                unlockPrice: 20,
                history: ['draw', 'draw', 'draw', 'win', 'lose', 'win', 'lose', 'lose', 'win'],
                guess: 'home',
                result: 'win',
                guessValue: 0.5
            },
            {
                id: 11,
                avatar: '',
                name: '老崔聊包',
                hotStreak: 2,
                ranking: 15,
                homeTeam: '欧锦U20A',
                awayTeam: '斯洛文尼亚U20',
                unlock: false,
                unlockPrice: 20,
                history: ['lose', 'win', 'win', 'win', 'draw', 'win', 'lose', 'win', 'win'],
                guess: 'small',
                result: 'draw',
                guessValue: 0.5
            }
        ]
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
