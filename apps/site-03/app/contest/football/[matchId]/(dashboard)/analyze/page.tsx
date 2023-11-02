import { getAnalysisOthers } from 'data-center';
import Analyze from './analyze';

async function Page({ params }: { params: { matchId: number } }) {
    const analysisData = await getAnalysisOthers(params.matchId);

    if (!analysisData.success) {
        return new Error();
    }

    return <Analyze analysisData={analysisData.data} />;
}

export default Page;
