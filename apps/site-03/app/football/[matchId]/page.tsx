import { getLiveText } from 'data-center';
import type { Metadata } from 'next';
import TabContent from './tabContent';

export const metadata: Metadata = {
    title: '賽事 | FutureSport'
};

async function Page({ params }: { params: { matchId: number } }) {
    const liveTextData = await getLiveText(params.matchId);

    if (!liveTextData.success) {
        return new Error();
    }
    return (
        <TabContent
            fetchInitData={{ textLive: liveTextData.data }}
            initStatus="liveEvent"
            matchId={params.matchId}
        />
    );
}

export default Page;
