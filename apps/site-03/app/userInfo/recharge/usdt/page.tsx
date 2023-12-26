import type { Metadata } from 'next';
import Usdt from './usdt';

export const metadata: Metadata = {
    title: '充值方式 | FutureSport'
};

function Page() {
    return (
        <div className="usdt">
            <Usdt />
        </div>
    );
}

export default Page;
