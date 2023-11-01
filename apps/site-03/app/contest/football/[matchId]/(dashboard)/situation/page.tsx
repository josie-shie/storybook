import { getDetailStatus } from 'data-center';
import Situation from './situation';

async function Page({ params }: { params: { matchId: number } }) {
    const situationData = await getDetailStatus(params.matchId);

    if (!situationData.success) {
        return new Error();
    }

    return <Situation situationData={situationData.data} />;
}

export default Page;
