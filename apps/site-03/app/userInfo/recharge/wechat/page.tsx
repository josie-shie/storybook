import type { Metadata } from 'next';
import Wechat from './wechat';

export const metadata: Metadata = {
    title: '充值方式'
};

function Page() {
    return (
        <div className="wechat">
            <Wechat />
        </div>
    );
}

export default Page;
