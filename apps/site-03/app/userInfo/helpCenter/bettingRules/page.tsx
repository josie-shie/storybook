import type { Metadata } from 'next';
import BettingRules from './bettingRules';

export const metadata: Metadata = {
    title: '猜球规则说明 | FutureSport'
};

function Page() {
    return <BettingRules />;
}

export default Page;
