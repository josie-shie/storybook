import type { Metadata } from 'next';
import GuessDetail from './guessDetail';

export const metadata: Metadata = {
    title: '推薦詳情'
};

function Page() {
    return <GuessDetail />;
}

export default Page;
