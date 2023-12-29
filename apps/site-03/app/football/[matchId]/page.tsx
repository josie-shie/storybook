import type { Metadata } from 'next';
import TabContent from './tabContent';

export const metadata: Metadata = {
    title: '賽事 | FutureSport'
};

function Page({ params }: { params: { matchId: number } }) {
    return <TabContent initStatus="messageBoard" matchId={params.matchId} />;
}

export default Page;
