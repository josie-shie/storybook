import type { Metadata } from 'next';
import BettingRules from './bettingRules';

export const metadata: Metadata = {
    title: '猜球規則說明 | FutureSport'
};

function Page() {
    return <BettingRules />;
}

export default Page;
