'use client';

import MasterAvatar from '../../../masterAvatar/[masterId]/masterAvatar';

function Page({ params }: { params: { masterId } }) {
    return (
        <>
            <MasterAvatar params={params} />;
        </>
    );
}

export default Page;
