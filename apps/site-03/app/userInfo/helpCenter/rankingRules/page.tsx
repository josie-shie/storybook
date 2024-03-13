import type { Metadata } from 'next';
import RankingRules from './rankingRules';

export const metadata: Metadata = {
    title: '榜单规则说明 | FutureSport'
};

function Page() {
    return <RankingRules />;
}

export default Page;
