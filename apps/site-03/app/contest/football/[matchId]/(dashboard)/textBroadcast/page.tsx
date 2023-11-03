import { getLiveText } from 'data-center';
import TextBroadcast from './textBroadcast';

async function Page({ params }: { params: { matchId: number } }) {
    const broadcastList = await getLiveText(params.matchId);

    if (!broadcastList.success) {
        return new Error();
    }

    return <TextBroadcast broadcastList={broadcastList.data} />;
}

export default Page;
