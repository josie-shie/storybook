'use client';
import { formatNumberWithPercent, truncateFloatingPoint } from 'lib';
import { getRecentMatchCompare } from 'data-center';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import { useDataComparedStore } from '@/app/football/[matchId]/dataComparedStore';
import ComparedTeamBar from '../components/comparedTeamBar';
import SameOptionBar from '../components/sameOptionBar';
import MatchCountOptionBar from '../components/matchCountOptionBar';
import style from './teamMatchHistoryCompared.module.scss';

function ComparedProgress() {
    const recentMatchCompare = useDataComparedStore.use.recentMatchCompare();

    if (typeof recentMatchCompare.home === 'undefined') {
        return null;
    }

    const totalGoal = recentMatchCompare.home.goal + recentMatchCompare.away.goal;

    return (
        <div className={style.comparedProgress}>
            <div className={style.progressCard}>
                <div className={style.topBar}>
                    <div className={style.value}>
                        {recentMatchCompare.home.goal}(
                        {truncateFloatingPoint(
                            recentMatchCompare.home.goal / recentMatchCompare.home.matchCount,
                            2
                        )}
                        )
                    </div>
                    <div className={style.title}>进球</div>
                    <div className={style.value}>
                        (
                        {truncateFloatingPoint(
                            recentMatchCompare.away.goal / recentMatchCompare.home.matchCount,
                            2
                        )}
                        ){recentMatchCompare.away.goal}
                    </div>
                </div>
                <div className={style.progressBar}>
                    <div className={style.homeProgressBar}>
                        <LinearProgress
                            className={style.homeProgress}
                            value={formatNumberWithPercent(
                                recentMatchCompare.home.goal || 0,
                                totalGoal
                            )}
                            variant="determinate"
                        />
                    </div>
                    <div className={style.awayProgressBar}>
                        <LinearProgress
                            className={style.awayProgress}
                            value={formatNumberWithPercent(
                                recentMatchCompare.away.goal || 0,
                                totalGoal
                            )}
                            variant="determinate"
                        />
                    </div>
                </div>
            </div>

            <div className={style.progressCard}>
                <div className={style.topBar}>
                    <div className={style.value}>
                        {recentMatchCompare.home.goalAgainst}(
                        {truncateFloatingPoint(
                            recentMatchCompare.home.goalAgainst /
                                recentMatchCompare.away.matchCount,
                            2
                        )}
                        )
                    </div>
                    <div className={style.title}>失球</div>
                    <div className={style.value}>
                        (
                        {truncateFloatingPoint(
                            recentMatchCompare.away.goalAgainst /
                                recentMatchCompare.away.matchCount,
                            2
                        )}
                        ){recentMatchCompare.away.goalAgainst}
                    </div>
                </div>
                <div className={style.progressBar}>
                    <div className={style.homeProgressBar}>
                        <LinearProgress
                            className={style.homeProgress}
                            value={formatNumberWithPercent(
                                recentMatchCompare.home.goalAgainst || 0,
                                totalGoal
                            )}
                            variant="determinate"
                        />
                    </div>
                    <div className={style.awayProgressBar}>
                        <LinearProgress
                            className={style.awayProgress}
                            value={formatNumberWithPercent(
                                recentMatchCompare.away.goalAgainst || 0,
                                totalGoal
                            )}
                            variant="determinate"
                        />
                    </div>
                </div>
            </div>
            <div className={style.progressCard}>
                <div className={style.topBar}>
                    <div className={style.value}>{recentMatchCompare.home.winRate}</div>
                    <div className={style.title}>胜率%</div>
                    <div className={style.value}>{recentMatchCompare.away.winRate}</div>
                </div>
                <div className={style.progressBar}>
                    <div className={style.homeProgressBar}>
                        <LinearProgress
                            className={style.homeProgress}
                            value={recentMatchCompare.home.winRate}
                            variant="determinate"
                        />
                    </div>
                    <div className={style.awayProgressBar}>
                        <LinearProgress
                            className={style.awayProgress}
                            value={recentMatchCompare.away.winRate}
                            variant="determinate"
                        />
                    </div>
                </div>
            </div>
            <div className={style.progressCard}>
                <div className={style.topBar}>
                    <div className={style.value}>
                        {recentMatchCompare.home.handicapWinRate}(
                        {formatNumberWithPercent(
                            recentMatchCompare.home.handicapLose,
                            recentMatchCompare.home.matchCount
                        )}
                        )
                    </div>
                    <div className={style.title}>赢（输）%</div>
                    <div className={style.value}>
                        (
                        {formatNumberWithPercent(
                            recentMatchCompare.away.handicapLose,
                            recentMatchCompare.away.matchCount
                        )}
                        ){recentMatchCompare.away.handicapWinRate}
                    </div>
                </div>
                <div className={style.progressBar}>
                    <div className={style.homeProgressBar}>
                        <LinearProgress
                            className={style.homeProgress}
                            value={recentMatchCompare.home.handicapWinRate}
                            variant="determinate"
                        />
                    </div>
                    <div className={style.awayProgressBar}>
                        <LinearProgress
                            className={style.awayProgress}
                            value={recentMatchCompare.away.handicapWinRate}
                            variant="determinate"
                        />
                    </div>
                </div>
            </div>
            <div className={style.progressCard}>
                <div className={style.topBar}>
                    <div className={style.value}>{recentMatchCompare.home.overUnderWinRate}</div>
                    <div className={style.title}>大率%</div>
                    <div className={style.value}>{recentMatchCompare.away.overUnderWinRate}</div>
                </div>
                <div className={style.progressBar}>
                    <div className={style.homeProgressBar}>
                        <LinearProgress
                            className={style.homeProgress}
                            value={recentMatchCompare.home.overUnderWinRate}
                            variant="determinate"
                        />
                    </div>
                    <div className={style.awayProgressBar}>
                        <LinearProgress
                            className={style.awayProgress}
                            value={recentMatchCompare.away.overUnderWinRate}
                            variant="determinate"
                        />
                    </div>
                </div>
            </div>
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
