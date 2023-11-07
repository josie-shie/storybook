import { getAnalysisOthers, getBeforeGameIndex, getLeaguePointsRank } from 'data-center';
import Analyze from './analyze';

async function Page({ params }: { params: { matchId: number } }) {
    const [analysisData, beforeGameData, leaguePointsRank] = await Promise.all([
        getAnalysisOthers(params.matchId),
        getBeforeGameIndex(params.matchId, 3),
        getLeaguePointsRank(params.matchId)
    ]);

    if (!analysisData.success || !beforeGameData.success || !leaguePointsRank.success) {
        return new Error();
    }

    return (
        <Analyze
            analysisData={analysisData.data}
            beforeGameData={beforeGameData.data}
            leaguePointsRank={leaguePointsRank.data}
        />
    );
}

export default Page;
