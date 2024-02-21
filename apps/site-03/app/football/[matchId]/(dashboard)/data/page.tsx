import { getRecentMatchData, getSingleMatchId } from 'data-center';
import TabContent from '../../tabContent';

async function Page({ params }: { params: { matchId: number } }) {
    const matchInfo = await getSingleMatchId(params.matchId);
    if (!matchInfo.success) {
        console.error(matchInfo.error);
        return (
            <TabContent
                fetchInitData={{ data: {} }}
                initStatus="analyze"
                matchId={params.matchId}
            />
        );
    }
    const { matchId, homeId, awayId } = matchInfo.data;

    const recentMatchData = await getRecentMatchData({
        matchId,
        homeId,
        awayId
    });

    if (!recentMatchData.success) {
        console.error(recentMatchData.error);
    }

    return (
        <TabContent
            fetchInitData={{
                data: {
                    recentMatchData: recentMatchData.success ? recentMatchData.data : undefined
                }
            }}
            initStatus="analyze"
            matchId={params.matchId}
        />
    );
}

export default Page;
