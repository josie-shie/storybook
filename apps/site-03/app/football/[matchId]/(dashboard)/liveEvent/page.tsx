import { getLiveText } from 'data-center';
import TabContent from '../../tabContent';

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
