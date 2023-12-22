import type { Metadata } from 'next';
import Notice from './notice';

export const metadata: Metadata = {
    title: '消息中心 | FutureSport'
};

function Page() {
    return <Notice />;
}

export default Page;
