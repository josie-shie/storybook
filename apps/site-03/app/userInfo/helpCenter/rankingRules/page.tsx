import type { Metadata } from 'next';
import RankingRules from './rankingRules';

export const metadata: Metadata = {
    title: '榜單規則說明 | FutureSport'
};

function Page() {
    return <RankingRules />;
}

export default Page;
