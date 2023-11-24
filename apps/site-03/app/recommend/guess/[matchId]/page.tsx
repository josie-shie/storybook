import type { Metadata } from 'next';
import GuessDetail from './guessDetail';

export const metadata: Metadata = {
    title: '推荐详情'
};

function Page() {
    return <GuessDetail backHistory={false} />;
}

export default Page;
