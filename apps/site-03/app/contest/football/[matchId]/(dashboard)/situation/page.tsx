import { getDetailStatus, getOddsRunning } from 'data-center';
import Situation from './situation';

async function Page({ params }: { params: { matchId: number } }) {
    const situationData = await getDetailStatus(params.matchId);
    const companyLiveOddsDetail = await getOddsRunning(params.matchId, 3, 'HANDICAP');

    if (!situationData.success || !companyLiveOddsDetail.success) {
        return new Error();
    }

    return (
        <Situation
            companyLiveOddsDetail={companyLiveOddsDetail.data}
            situationData={situationData.data}
        />
    );
}

export default Page;
