import { getLiveText } from 'data-center';
import LiveEvent from './liveEvent';

async function Page({ params }: { params: { matchId: number } }) {
    const broadcastList = await getLiveText(params.matchId);

    if (!broadcastList.success) {
        return new Error();
    }

    return <LiveEvent broadcastList={broadcastList.data} />;
}

export default Page;
