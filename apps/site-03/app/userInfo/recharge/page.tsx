import type { Metadata } from 'next';
import Recharge from './recharge';

export const metadata: Metadata = {
    title: '充值方式 | FutureSport'
};

function Page() {
    return (
        <div className="recharge">
            <Recharge />
        </div>
    );
}

export default Page;
