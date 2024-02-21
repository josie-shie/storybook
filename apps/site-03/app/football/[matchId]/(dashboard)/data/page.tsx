import { getSingleMatchId, getRecentMatchData, getRecentMatchSchedule } from 'data-center';
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

    const [recentMatchData, recentMatchSchedule] = await Promise.all([
        getRecentMatchData({
            matchId,
            homeId,
            awayId
        }),
        getRecentMatchSchedule(matchId)
    ]);

    if (!recentMatchData.success || !recentMatchSchedule.success) {
        console.error(recentMatchData);
        console.error(recentMatchSchedule);
    }

    return (
        <TabContent
            fetchInitData={{
                data: {
                    recentMatchData: recentMatchData.success ? recentMatchData.data : undefined,
                    recentMatchSchedule: recentMatchSchedule.success
                        ? recentMatchSchedule.data
                        : undefined
                }
            }}
            initStatus="analyze"
            matchId={params.matchId}
        />
    );
}

export default Page;
