'use client';
import type { GetLeaguePointsRankResponse, LeaguePointsRankInfo } from 'data-center';
import { formatNumberWithPercent, roundToDecimalPlace } from 'lib';
import { useDataStore } from '@/app/football/[matchId]/dataDetailStore';
import ComparedTeamBar from '../components/comparedTeamBar';
import ComparedLineProgress from '../components/comparedLineProgress';
import style from './leaguePointsRank.module.scss';

type LeagueDataType =
    | GetLeaguePointsRankResponse
    | {
          homeTeam?: {
              total?: LeaguePointsRankInfo;
              home?: LeaguePointsRankInfo;
              away?: LeaguePointsRankInfo;
              recent?: LeaguePointsRankInfo;
          };
          awayTeam?: {
              total?: LeaguePointsRankInfo;
              home?: LeaguePointsRankInfo;
              away?: LeaguePointsRankInfo;
              recent?: LeaguePointsRankInfo;
          };
      }
    | undefined;

function LeagueRankTables() {
    const leaguePointsRank: LeagueDataType = useDataStore.use.leaguePointsRank();
    const noHomeData = typeof (leaguePointsRank as LeagueDataType)?.homeTeam?.home === 'undefined';
    const noAwayData = typeof (leaguePointsRank as LeagueDataType)?.awayTeam?.home === 'undefined';

    if (noHomeData || noAwayData) {
        return null;
    }

    const { homeTeam, awayTeam } = leaguePointsRank as GetLeaguePointsRankResponse;

    return (
        <div className={style.leaguePointsRankDetail}>
            <div className="topBar">
                <h6 className="title">积分排名</h6>
            </div>
            <ComparedTeamBar />
            {typeof awayTeam !== 'undefined' && (
                <div className={style.progressContainer}>
                    <ComparedLineProgress
                        awayProgress={formatNumberWithPercent(
                            awayTeam.total.integral,
                            homeTeam.total.integral + awayTeam.total.integral
                        )}
                        awayValue={`${awayTeam.total.integral}/${awayTeam.total.rank}`}
                        homeProgress={formatNumberWithPercent(
                            homeTeam.total.integral,
                            homeTeam.total.integral + awayTeam.total.integral
                        )}
                        homeValue={`${homeTeam.total.integral}/${homeTeam.total.rank}`}
                        title="积分/排名"
                    />
                    <ComparedLineProgress
                        awayProgress={formatNumberWithPercent(
                            awayTeam.total.winCount,
                            awayTeam.total.winCount +
                                awayTeam.total.drawCount +
                                awayTeam.total.loseCount
                        )}
                        awayValue={`${awayTeam.total.winCount}/${awayTeam.total.drawCount}/${awayTeam.total.loseCount}`}
                        homeProgress={formatNumberWithPercent(
                            homeTeam.total.winCount,
                            homeTeam.total.winCount +
                                homeTeam.total.drawCount +
                                homeTeam.total.loseCount
                        )}
                        homeValue={`${homeTeam.total.winCount}/${homeTeam.total.drawCount}/${homeTeam.total.loseCount}`}
                        title="胜/平/负"
                    />
                    <ComparedLineProgress
                        awayProgress={formatNumberWithPercent(
                            awayTeam.total.getScore,
                            homeTeam.total.getScore + awayTeam.total.getScore
                        )}
                        awayValue={`${awayTeam.total.getScore}(${roundToDecimalPlace(
                            awayTeam.total.totalCount / awayTeam.total.getScore,
                            1
                        )})`}
                        homeProgress={formatNumberWithPercent(
                            homeTeam.total.getScore,
                            homeTeam.total.getScore + awayTeam.total.getScore
                        )}
                        homeValue={`${homeTeam.total.getScore}(${roundToDecimalPlace(
                            homeTeam.total.totalCount / homeTeam.total.getScore,
                            1
                        )})`}
                        title="进球"
                    />
                    <ComparedLineProgress
                        awayProgress={formatNumberWithPercent(
                            awayTeam.total.loseScore,
                            homeTeam.total.loseScore + awayTeam.total.loseScore
                        )}
                        awayValue={`${awayTeam.total.loseScore}(${roundToDecimalPlace(
                            awayTeam.total.totalCount / awayTeam.total.loseScore,
                            1
                        )})`}
                        homeProgress={formatNumberWithPercent(
                            homeTeam.total.loseScore,
                            homeTeam.total.loseScore + awayTeam.total.loseScore
                        )}
                        homeValue={`${homeTeam.total.loseScore}(${roundToDecimalPlace(
                            homeTeam.total.totalCount / homeTeam.total.loseScore,
                            1
                        )})`}
                        title="失球"
                    />
                </div>
            )}
        </div>
    );
}

export default LeagueRankTables;
