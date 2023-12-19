import type { Metadata } from 'next';
import MasterAvatar from './masterAvatar';

export const metadata: Metadata = {
    title: '专家预测'
};

function Page({ params }: { params: { masterId: string } }) {
    return <MasterAvatar params={params} />;
}

export default Page;
