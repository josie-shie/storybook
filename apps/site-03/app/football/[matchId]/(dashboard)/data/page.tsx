import {
    getSingleMatchId,
    getRecentMatchData,
    getRecentMatchSchedule,
    getHalfFullWinCounts
} from 'data-center';
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

    const [recentMatchData, recentMatchSchedule, halfFullWinCounts] = await Promise.all([
        getRecentMatchData({
            matchId,
            homeId,
            awayId
        }),
        getRecentMatchSchedule(matchId),
        getHalfFullWinCounts({
            matchId
        })
    ]);

    if (!recentMatchData.success || !recentMatchSchedule.success || !halfFullWinCounts.success) {
        console.error(recentMatchData);
        console.error(recentMatchSchedule);
        console.error(halfFullWinCounts);
    }

    return (
        <TabContent
            fetchInitData={{
                data: {
                    recentMatchData: recentMatchData.success ? recentMatchData.data : undefined,
                    recentMatchSchedule: recentMatchSchedule.success
                        ? recentMatchSchedule.data
                        : undefined,
                    halfFullWinCounts: halfFullWinCounts.success
                        ? halfFullWinCounts.data
                        : undefined
                }
            }}
            initStatus="analyze"
            matchId={params.matchId}
        />
    );
}

export default Page;
