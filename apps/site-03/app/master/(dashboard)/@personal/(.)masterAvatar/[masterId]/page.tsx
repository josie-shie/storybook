'use client';

import MasterAvatar from '@/app/master/masterAvatar/[masterId]/masterAvatar';

function Page({ params }: { params: { masterId: string } }) {
    return <MasterAvatar params={params} />;
}

export default Page;
