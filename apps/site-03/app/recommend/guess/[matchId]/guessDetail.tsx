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
        masterPlanPrice: 20,
        detail: {
            leagueName: '歐錦U20A',
            dateTime: 1678880400,
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
            enoughProData: true,
            memberPermission: false,
            unlockPrice: 1
        },
        masterPlanList: [
            {
                guessId: 7,
                memberId: 22,
                avatarPath: '',
                memberName: '羅曼琉球',
                highlights: [
                    {
                        id: 1,
                        type: 2,
                        value: 10
                    },
                    {
                        id: 3,
                        type: 3,
                        value: 6
                    }
                ],
                records: ['DRAW', 'LOSE', 'WIN', 'WIN', 'WIN', 'DRAW', 'DRAW', 'LOSE', 'WIN'],
                predictedType: 'HANDICAP',
                predictedPlay: 'HOME',
                predictionResult: 'DRAW'
            },
            {
                guessId: 8,
                memberId: 33,
                avatarPath: '',
                memberName: '老羅聊球',
                highlights: [
                    {
                        id: 4,
                        type: 2,
                        value: 10
                    }
                ],
                records: ['WIN', 'WIN', 'LOSE', 'DRAW', 'DRAW', 'LOSE', 'WIN', 'DRAW', 'WIN'],
                predictedType: 'HANDICAP',
                predictedPlay: 'LOCK',
                predictionResult: 'WIN'
            },
            {
                guessId: 9,
                memberId: 44,
                avatarPath: '',
                memberName: '老崔包子',
                highlights: [],
                records: ['WIN', 'LOSE', 'WIN', 'LOSE', 'DRAW', 'DRAW', 'WIN', 'LOSE', 'WIN'],
                predictedType: 'HANDICAP',
                predictedPlay: 'LOCK',
                predictionResult: 'NONE'
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
