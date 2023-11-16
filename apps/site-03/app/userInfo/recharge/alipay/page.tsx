import type { Metadata } from 'next';
import Alipay from './alipay';

export const metadata: Metadata = {
    title: '充值方式'
};

function Page() {
    return (
        <div className="alipay">
            <Alipay />
        </div>
    );
}

export default Page;
