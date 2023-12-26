import type { Metadata } from 'next';
import MemberAvatar from './memberAvatar';

export const metadata: Metadata = {
    title: '會員個人 | FutureSport'
};

function Page({ params }: { params: { memberId: string } }) {
    return <MemberAvatar params={params} />;
}

export default Page;
