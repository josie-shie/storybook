'use client';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import VsBox from './vsBox';
import MasterPlan from './masterPlan';
import { creatGuessDetailStore } from './guessDetailStore';
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

    creatGuessDetailStore({
        guessesLeft: 5,
        unlockTrend: false,
        detail: {
            leagueName: '歐錦U20A',
            dateTime: '7-14 02:00',
            homeTeamLogo: '',
            homeTeamName: '泰国国立法政大学',
            awayTeamLogo: '',
            awayTeamName: '北曼谷學院',
            participants: 1876,
            guessBigSmall: 'none',
            guessHomeAway: 'none',
            home: 888,
            away: 28,
            big: 888,
            small: 28
        },
        highWinRateTrend: {
            trendHome: 76,
            trendAway: 24,
            trendBig: 62,
            trendSmall: 38
        },
        masterPlanList: [
            {
                id: 7,
                avatar: '',
                name: '羅曼琉球',
                hotStreak: 2,
                ranking: 345,
                homeTeam: '欧锦U20A',
                awayTeam: '斯洛文尼亚U20',
                unlock: false,
                history: ['win', 'lose', 'draw', 'win', 'lose', 'draw', 'win', 'lose', 'draw'],
                guess: 'home',
                result: 'win'
            },
            {
                id: 10,
                avatar: '',
                name: '小羅聊球',
                hotStreak: 2,
                ranking: 345,
                homeTeam: '欧锦U20A',
                awayTeam: '斯洛文尼亚U20',
                unlock: false,
                history: ['win', 'lose', 'draw', 'win', 'lose', 'draw', 'win', 'lose', 'draw'],
                guess: 'home',
                result: 'win'
            }
        ]
    });

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
