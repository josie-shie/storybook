import { getAnalysisOthers, getBeforeGameIndex, getLeaguePointsRank } from 'data-center';
import TabContent from '../../tabContent';

async function Page({ params }: { params: { matchId: number } }) {
    const [analysisData, beforeGameData, leaguePointsRank] = await Promise.all([
        getAnalysisOthers(params.matchId),
        getBeforeGameIndex(params.matchId, 3),
        getLeaguePointsRank(params.matchId)
    ]);

    if (!analysisData.success || !beforeGameData.success || !leaguePointsRank.success) {
        console.error('analysisData', analysisData);
        console.error('beforeGameData', beforeGameData);
        console.error('leaguePointsRank', leaguePointsRank);
        return null;
    }

    return (
        <TabContent
            fetchInitData={{
                analyze: {
                    analysisData: analysisData.data,
                    beforeGameData: beforeGameData.data,
                    leaguePointsRank: leaguePointsRank.data
                }
            }}
            initStatus="analyze"
            matchId={params.matchId}
        />
    );
}

export default Page;
