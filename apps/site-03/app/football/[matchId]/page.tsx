import type { Metadata } from 'next';
import MessageBoard from './(dashboard)/messageBoard/messageBoard';

export const metadata: Metadata = {
    title: '賽事 | Sport'
};

function Page({ params }: { params: { matchId: number } }) {
    return <MessageBoard matchId={params.matchId} />;
}

export default Page;
