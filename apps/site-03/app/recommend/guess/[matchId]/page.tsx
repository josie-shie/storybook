import type { Metadata } from 'next';
import GuessDetail from './guessDetail';

export const metadata: Metadata = {
    title: '推薦'
};

function Page({ params }: { params: { matchId: number } }) {
    return <GuessDetail params={params} />;
}

export default Page;
