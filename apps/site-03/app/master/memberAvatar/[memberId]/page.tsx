import type { Metadata } from 'next';
import MemberAvatar from './memberAvatar';

export const metadata: Metadata = {
    title: '会员个人 | FutureSport'
};

function Page({ params }: { params: { memberId: string } }) {
    return <MemberAvatar params={params} />;
}

export default Page;
