import type { Metadata } from 'next';
import VsBox from './vsBox';
import MasterPlan from './masterPlan';
import Header from '@/components/header/headerTitle';

export const metadata: Metadata = {
    title: '推薦'
};

function GuessDetail({ params }: { params: { matchId: number } }) {
    const headerProps = {
        title: '足球竞猜',
        total: 999999
    };
    return (
        <>
            <Header title={headerProps.title} total={headerProps.total} />
            <VsBox />
            <MasterPlan />
            <p>{params.matchId}</p>
        </>
    );
}

export default GuessDetail;
