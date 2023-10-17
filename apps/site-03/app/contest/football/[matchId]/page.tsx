import type { Metadata } from 'next';
import LiveBox from './liveBox';

export const metadata: Metadata = {
    title: '賽事 | Sport'
};

function ContestInfo({ params }: { params: { matchId: number } }) {
    return (
        <>
            <LiveBox />
            <p>matchId:{params.matchId}</p>
        </>
    );
}

export default ContestInfo;
