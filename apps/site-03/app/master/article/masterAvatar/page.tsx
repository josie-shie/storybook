import type { Metadata } from 'next';
import MasterAvatar from './masterAvatar';

export const metadata: Metadata = {
    title: '专家预测'
};

function Page() {
    return <MasterAvatar />;
}

export default Page;
