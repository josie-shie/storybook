import {
    getLeaguePointsRank,
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

    const [
        leaguePointsRank,
        recentBattleMatch,
        recentMatchData,
        recentMatchSchedule,
        halfFullWinCounts
    ] = await Promise.all([
        getLeaguePointsRank(params.matchId), // 積分排名
        getRecentBattleMatch({
            matchId,
            homeId
        }), // 歷史交鋒
        getRecentMatchData({
            matchId,
            homeId,
            awayId
        }), // 近期戰績
        getRecentMatchSchedule(matchId), //近期賽程
        getHalfFullWinCounts({
            matchId
        }) // 半全場勝負
    ]);

    if (
        !leaguePointsRank.success ||
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
                    leaguePointsRank: leaguePointsRank.success ? leaguePointsRank.data : undefined,
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
