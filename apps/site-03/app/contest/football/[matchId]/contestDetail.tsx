import type { Metadata } from 'next';
import LiveBox from './liveBox';
import GuessBar from './guessBar';
import Dashboard from './dashboard';

export const metadata: Metadata = {
    title: '賽事 | Sport'
};

function ContestDetail({ params }: { params: { matchId: number } }) {
    console.warn(params.matchId);
    return (
        <>
            <LiveBox />
            <GuessBar />
            <Dashboard />
        </>
    );
}

export default ContestDetail;
