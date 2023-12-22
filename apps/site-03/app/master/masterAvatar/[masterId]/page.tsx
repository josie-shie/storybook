import type { Metadata } from 'next';
import MasterAvatar from './masterAvatar';

export const metadata: Metadata = {
    title: '专家聊球 | FutureSport'
};

function Page({ params }: { params: { masterId: string } }) {
    return <MasterAvatar params={params} />;
}

export default Page;
