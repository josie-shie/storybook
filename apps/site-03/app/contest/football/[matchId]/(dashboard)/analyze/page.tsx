import { getAnalysisOthers, getBeforeGameIndex } from 'data-center';
import Analyze from './analyze';

async function Page({ params }: { params: { matchId: number } }) {
    const [analysisData, beforeGameData] = await Promise.all([
        getAnalysisOthers(params.matchId),
        getBeforeGameIndex(params.matchId, 3)
    ]);

    if (!analysisData.success || !beforeGameData.success) {
        return new Error();
    }

    return <Analyze analysisData={analysisData.data} beforeGameData={beforeGameData.data} />;
}

export default Page;
