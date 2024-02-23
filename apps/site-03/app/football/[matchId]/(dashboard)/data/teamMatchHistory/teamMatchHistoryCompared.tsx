'use client';
import { formatNumberWithPercent, truncateFloatingPoint } from 'lib';
import { getRecentMatchCompare } from 'data-center';
import { useEffect, useState } from 'react';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import { useDataComparedStore } from '@/app/football/[matchId]/dataComparedStore';
import ComparedTeamBar from '../components/comparedTeamBar';
import SameOptionBar from '../components/sameOptionBar';
import MatchCountOptionBar from '../components/matchCountOptionBar';
import ComparedLineProgress from '../components/comparedLineProgress';
import style from './teamMatchHistoryCompared.module.scss';

function ComparedProgress() {
    const recentMatchCompare = useDataComparedStore.use.recentMatchCompare();

    if (typeof recentMatchCompare.home === 'undefined') {
        return null;
    }

    const totalGoal = recentMatchCompare.home.goal + recentMatchCompare.away.goal;

    return (
        <div className={style.progressContainer}>
            <ComparedLineProgress
                awayProgress={formatNumberWithPercent(recentMatchCompare.away.goal || 0, totalGoal)}
                awayValue={`(${truncateFloatingPoint(
                    recentMatchCompare.away.goal / recentMatchCompare.home.matchCount,
                    1
                )})${recentMatchCompare.away.goal}`}
                homeProgress={formatNumberWithPercent(recentMatchCompare.home.goal || 0, totalGoal)}
                homeValue={`${recentMatchCompare.home.goal}(${truncateFloatingPoint(
                    recentMatchCompare.home.goal / recentMatchCompare.home.matchCount,
                    1
                )})`}
                title="进球"
            />
            <ComparedLineProgress
                awayProgress={formatNumberWithPercent(
                    recentMatchCompare.away.goalAgainst || 0,
                    totalGoal
                )}
                awayValue={`(${truncateFloatingPoint(
                    recentMatchCompare.away.goalAgainst / recentMatchCompare.away.matchCount,
                    1
                )})${recentMatchCompare.away.goalAgainst}`}
                homeProgress={formatNumberWithPercent(
                    recentMatchCompare.home.goalAgainst || 0,
                    totalGoal
                )}
                homeValue={`${recentMatchCompare.home.goalAgainst}(${truncateFloatingPoint(
                    recentMatchCompare.home.goalAgainst / recentMatchCompare.away.matchCount,
                    1
                )})`}
                title="失球"
            />
            <ComparedLineProgress
                awayProgress={recentMatchCompare.away.winRate}
                awayValue={`${recentMatchCompare.away.winRate}`}
                homeProgress={recentMatchCompare.home.winRate}
                homeValue={`${recentMatchCompare.home.winRate}`}
                title="胜率%"
            />
            <ComparedLineProgress
                awayProgress={recentMatchCompare.away.handicapWinRate}
                awayValue={`(${formatNumberWithPercent(
                    recentMatchCompare.away.handicapLose,
                    recentMatchCompare.away.matchCount
                )})${recentMatchCompare.away.handicapWinRate}`}
                homeProgress={recentMatchCompare.home.handicapWinRate}
                homeValue={`${recentMatchCompare.home.handicapWinRate}(${formatNumberWithPercent(
                    recentMatchCompare.home.handicapLose,
                    recentMatchCompare.home.matchCount
                )})`}
                title="赢（输）%"
            />
            <ComparedLineProgress
                awayProgress={recentMatchCompare.away.overUnderWinRate}
                awayValue={`${recentMatchCompare.away.overUnderWinRate}`}
                homeProgress={recentMatchCompare.home.handicapWinRate}
                homeValue={`${recentMatchCompare.home.handicapWinRate}`}
                title="大率%"
            />
        </div>
    );
}

function TeamMatchHistoryCompared() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const matchOption = useDataComparedStore.use.recentMatchOption();
    const setRecentMatchOption = useDataComparedStore.use.setRecentMatchOption();
    const setRecentMatchCompare = useDataComparedStore.use.setRecentMatchCompare();
    const { leagueId, homeAway, dataCount } = matchOption;
    const [secondRender, setSecondRender] = useState(false);

    const handleOptionChange = (
        target: 'homeAway' | 'leagueId' | 'dataCount',
        newValue: number
    ) => {
        setRecentMatchOption({ target, newValue });
    };

    const fetchRecentMatchData = async () => {
        const res = await getRecentMatchCompare({
            matchId: matchDetail.matchId,
            leagueId,
            homeAway,
            dataCount
        });
        if (res.success) {
            setRecentMatchCompare({ recentMatchCompare: res.data });
        }
    };

    useEffect(() => {
        if (secondRender) {
            void fetchRecentMatchData();
        } else {
            setSecondRender(true);
        }
    }, [leagueId, homeAway, dataCount]);

    return (
        <div className={style.teamMatchHistoryCompared}>
            <div className="topBar">
                <h6 className="title">近期战绩</h6>
            </div>
            <div className={style.option}>
                <SameOptionBar
                    league={leagueId}
                    leagueActiveValue={matchDetail.leagueId}
                    setLeague={newLeague => {
                        handleOptionChange('leagueId', newLeague);
                    }}
                    setTeam={newTeam => {
                        handleOptionChange('homeAway', newTeam);
                    }}
                    team={homeAway}
                    teamActiveValue={1}
                />
                <div className={style.full}>
                    <MatchCountOptionBar
                        count={dataCount}
                        option={[6, 10, 20]}
                        setCount={newCount => {
                            handleOptionChange('dataCount', newCount);
                        }}
                    />
                </div>
            </div>
            <ComparedTeamBar />
            <ComparedProgress />
        </div>
    );
}

export default TeamMatchHistoryCompared;
