import {
    getSingleMatchId,
    getRecentMatchData,
    getRecentMatchSchedule,
    getHalfFullWinCounts,
    getRecentBattleMatch
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

    const [recentBattleMatch, recentMatchData, recentMatchSchedule, halfFullWinCounts] =
        await Promise.all([
            getRecentBattleMatch({
                matchId,
                homeId
            }),
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

    if (
        !recentBattleMatch.success ||
        !recentMatchData.success ||
        !recentMatchSchedule.success ||
        !halfFullWinCounts.success
    ) {
        console.error(recentBattleMatch);
        console.error(recentMatchData);
        console.error(recentMatchSchedule);
        console.error(halfFullWinCounts);
    }

    return (
        <TabContent
            fetchInitData={{
                data: {
                    recentBattleMatch: recentBattleMatch.success
                        ? recentBattleMatch.data
                        : undefined,
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
