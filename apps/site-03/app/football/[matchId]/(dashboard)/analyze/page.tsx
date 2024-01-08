import { getAnalysisOthers, getBeforeGameIndex, getLeaguePointsRank } from 'data-center';
import TabContent from '../../tabContent';

async function Page({ params }: { params: { matchId: number } }) {
    const [analysisData, beforeGameData, leaguePointsRank] = await Promise.all([
        getAnalysisOthers(params.matchId), // 聯賽走勢、對賽往績、近期戰績、半场/全场胜负统计(进两赛季)
        getBeforeGameIndex(params.matchId, 3), // 賽前指數
        getLeaguePointsRank(params.matchId) // 聯賽積分排名（包含主隊和客隊）
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
