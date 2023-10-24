import type { Metadata } from 'next';
import LiveBox from './liveBox';
import GuessBar from './guessBar';
import Dashboard from './dashboard';

export const metadata: Metadata = {
    title: '賽事 | Sport'
};

function ContestDetail({ params }: { params: { matchId: number } }) {
    return (
        <>
            <LiveBox />
            <GuessBar />
            <Dashboard />
            <p>matchId:{params.matchId}</p>
        </>
    );
}

export default ContestDetail;
