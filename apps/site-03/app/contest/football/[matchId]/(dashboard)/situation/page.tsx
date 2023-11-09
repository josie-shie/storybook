import { getDetailStatus, getCompanyLiveOddsDetail } from 'data-center';
import Situation from './situation';

async function Page({ params }: { params: { matchId: number } }) {
    const situationData = await getDetailStatus(params.matchId);
    const companyLiveOddsDetail = await getCompanyLiveOddsDetail(params.matchId, 3);

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
