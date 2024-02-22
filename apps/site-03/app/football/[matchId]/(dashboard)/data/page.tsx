import {
    getLeaguePointsRank,
    getSingleMatchId,
    getRecentMatchData,
    getRecentMatchCompare,
    getRecentMatchSchedule,
    getHalfFullWinCounts,
    getRecentBattleMatch,
    getBattleMatchCompare
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
        battleMatchCompare,
        recentMatchData,
        recentMatchCompare,
        recentMatchSchedule,
        halfFullWinCounts
    ] = await Promise.all([
        getLeaguePointsRank(params.matchId), // 積分排名
        getRecentBattleMatch({
            matchId,
            homeId
        }), // 詳情 - 歷史交鋒
        getBattleMatchCompare({
            matchId
        }), // 對比 - 歷史交鋒
        getRecentMatchData({
            matchId,
            homeId,
            awayId
        }), // 詳情 - 近期戰績
        getRecentMatchCompare({
            matchId
        }), // 對比 - 近期戰績
        getRecentMatchSchedule(matchId), //近期賽程
        getHalfFullWinCounts({
            matchId
        }) // 半全場勝負
    ]);

    if (
        !leaguePointsRank.success ||
        !recentBattleMatch.success ||
        !battleMatchCompare.success ||
        !recentMatchData.success ||
        !recentMatchCompare.success ||
        !recentMatchSchedule.success ||
        !halfFullWinCounts.success
    ) {
        console.error(leaguePointsRank);
        console.error(recentBattleMatch);
        console.error(recentMatchData);
        console.error(recentMatchCompare);
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
                        : undefined,
                    battleMatchCompare: battleMatchCompare.success
                        ? battleMatchCompare.data
                        : undefined,
                    recentMatchCompare: recentMatchCompare.success
                        ? recentMatchCompare.data
                        : undefined
                }
            }}
            initStatus="analyze"
            matchId={params.matchId}
        />
    );
}

export default Page;
