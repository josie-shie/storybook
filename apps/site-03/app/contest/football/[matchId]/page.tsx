import type { Metadata } from 'next';
import ContestDetail from './contestDetail';

export const metadata: Metadata = {
    title: '賽事 | Sport'
};

function Page({ params }: { params: { matchId: number } }) {
    return <ContestDetail params={params} />;
}

export default Page;
