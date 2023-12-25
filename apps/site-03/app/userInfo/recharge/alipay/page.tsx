import type { Metadata } from 'next';
import Alipay from './alipay';

export const metadata: Metadata = {
    title: '充值方式 | FutureSport'
};

function Page() {
    return (
        <div className="wechat">
            <Alipay />
        </div>
    );
}

export default Page;
