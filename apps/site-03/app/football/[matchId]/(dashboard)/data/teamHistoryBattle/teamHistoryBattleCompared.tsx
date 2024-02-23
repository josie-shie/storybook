'use client';
import { formatNumberWithPercent, roundToDecimalPlace } from 'lib';
import { getBattleMatchCompare } from 'data-center';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useContestDetailStore } from '@/app/football/[matchId]/contestDetailStore';
import { useDataComparedStore } from '@/app/football/[matchId]/dataComparedStore';
import SameOptionBar from '../components/sameOptionBar';
import MatchCountOptionBar from '../components/matchCountOptionBar';
import ComparedTeamBar from '../components/comparedTeamBar';
import ComparedLineProgress from '../components/comparedLineProgress';
import style from './teamHistoryBattleCompared.module.scss';

function ComparedLineProgressBar() {
    const battleMatchCompare = useDataComparedStore.use.battleMatchCompare();

    if (typeof battleMatchCompare.homeCompare === 'undefined') {
        return null;
    }

    const totalGoal = battleMatchCompare.homeCompare.goal + battleMatchCompare.awayCompare.goal;

    return (
        <div className={style.progressContainer}>
            <ComparedLineProgress
                awayProgress={battleMatchCompare.awayCompare.winRate}
                awayValue={`${roundToDecimalPlace(battleMatchCompare.awayCompare.winRate, 0)}`}
                homeProgress={battleMatchCompare.homeCompare.winRate}
                homeValue={`${roundToDecimalPlace(battleMatchCompare.homeCompare.winRate, 0)}`}
                title="胜率%"
            />

            <ComparedLineProgress
                awayProgress={formatNumberWithPercent(
                    battleMatchCompare.homeCompare.goal || 0,
                    totalGoal
                )}
                awayValue={`(${roundToDecimalPlace(
                    battleMatchCompare.awayCompare.goal / battleMatchCompare.matchCount,
                    1
                )})${battleMatchCompare.awayCompare.goal}`}
                homeProgress={formatNumberWithPercent(
                    battleMatchCompare.homeCompare.goal || 0,
                    totalGoal
                )}
                homeValue={`${battleMatchCompare.homeCompare.goal}(${roundToDecimalPlace(
                    battleMatchCompare.homeCompare.goal / battleMatchCompare.matchCount,
                    1
                )})`}
                title="进球"
            />
            <ComparedLineProgress
                awayProgress={formatNumberWithPercent(
                    battleMatchCompare.awayCompare.goalAgainst || 0,
                    totalGoal
                )}
                awayValue={`(${roundToDecimalPlace(
                    battleMatchCompare.awayCompare.goalAgainst / battleMatchCompare.matchCount,
                    1
                )})${battleMatchCompare.awayCompare.goalAgainst}`}
                homeProgress={formatNumberWithPercent(
                    battleMatchCompare.homeCompare.goalAgainst || 0,
                    totalGoal
                )}
                homeValue={`${battleMatchCompare.homeCompare.goalAgainst}(${roundToDecimalPlace(
                    battleMatchCompare.homeCompare.goalAgainst / battleMatchCompare.matchCount,
                    1
                )})`}
                title="失球"
            />
        </div>
    );
}

function ComparedCircleProgress({
    title,
    value,
    percent,
    total
}: {
    title: string;
    value: number;
    percent: number;
    total: string;
}) {
    return (
        <div className={style.comparedCircleProgress}>
            <div className={style.title}>{title}</div>
            <div className={style.circleProgressBox}>
                <div className={style.circleProgress}>
                    <CircularProgress value={percent} variant="determinate" />
                </div>

                <div className={style.value}>{roundToDecimalPlace(value, 0)}</div>
            </div>
            <div className={style.total}>{total}</div>
        </div>
    );
}

function TeamHistoryBattleCompared() {
    const matchDetail = useContestDetailStore.use.matchDetail();
    const battleMatchCompare = useDataComparedStore.use.battleMatchCompare();
    const matchOption = useDataComparedStore.use.battleMatchCompareOption();
    const setBattleMatchCompareOption = useDataComparedStore.use.setBattleMatchCompareOption();
    const setBattleMatchCompare = useDataComparedStore.use.setBattleMatchCompare();
    const { leagueId, homeAway, dataCount } = matchOption;
    const [secondRender, setSecondRender] = useState(false);

    const handleOptionChange = (
        target: 'homeAway' | 'leagueId' | 'dataCount',
        newValue: number
    ) => {
        setBattleMatchCompareOption({ target, newValue });
    };

    const fetchRecentMatchData = async () => {
        const res = await getBattleMatchCompare({
            matchId: matchDetail.matchId,
            leagueId,
            homeAway,
            dataCount
        });
        if (res.success) {
            setBattleMatchCompare({ battleMatchCompare: res.data });
        }
    };

    useEffect(() => {
        if (secondRender) {
            void fetchRecentMatchData();
        } else {
            setSecondRender(true);
        }
    }, [leagueId, homeAway, dataCount]);

    if (typeof battleMatchCompare.homeCompare === 'undefined') {
        return null;
    }

    return (
        <div className={style.teamHistoryBattleCompared}>
            <div className="topBar">
                <h6 className="title">历史交锋</h6>
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
            <div className={style.circleProgressBar}>
                <ComparedCircleProgress
                    percent={formatNumberWithPercent(
                        battleMatchCompare.homeCompare.goal,
                        battleMatchCompare.homeCompare.goal +
                            battleMatchCompare.homeCompare.goalAgainst
                    )}
                    title="进失"
                    total={`进${battleMatchCompare.homeCompare.goal}失${battleMatchCompare.homeCompare.goalAgainst}`}
                    value={formatNumberWithPercent(
                        battleMatchCompare.homeCompare.goal,
                        battleMatchCompare.homeCompare.goal +
                            battleMatchCompare.homeCompare.goalAgainst
                    )}
                />
                <ComparedCircleProgress
                    percent={formatNumberWithPercent(
                        battleMatchCompare.homeCompare.win,
                        battleMatchCompare.matchCount
                    )}
                    title="胜率%"
                    total={`${battleMatchCompare.homeCompare.win}胜${battleMatchCompare.homeCompare.draw}平${battleMatchCompare.homeCompare.lose}负`}
                    value={formatNumberWithPercent(
                        battleMatchCompare.homeCompare.win,
                        battleMatchCompare.matchCount
                    )}
                />
                <ComparedCircleProgress
                    percent={battleMatchCompare.handicapWinRate}
                    title="赢率%"
                    total={`${battleMatchCompare.handicapWin}赢${battleMatchCompare.handicapDraw}走${battleMatchCompare.handicapLose}输`}
                    value={battleMatchCompare.handicapWinRate}
                />
                <ComparedCircleProgress
                    percent={battleMatchCompare.overUnderWinRate}
                    title="大率%"
                    total={`${battleMatchCompare.overUnderWin}大${battleMatchCompare.overUnderDraw}走${battleMatchCompare.overUnderLose}小`}
                    value={battleMatchCompare.overUnderWinRate}
                />
            </div>
            <ComparedLineProgressBar />
            <div className={style.pointChart}>
                <div className={style.pointCard}>
                    <div className={style.pointTop}>
                        <p className={style.title}>走势</p>
                        <p className={style.subTitle}>
                            （近{battleMatchCompare.matchCount}场，由近及远）
                        </p>
                    </div>
                    {typeof battleMatchCompare.handicapTrend !== 'undefined' && (
                        <div className={style.pointBar}>
                            {battleMatchCompare.handicapTrend.map(
                                (point, idx) =>
                                    point.length > 0 && (
                                        <div
                                            className={`${style.point} ${style[point]}`}
                                            key={`${point}_${idx.toString()}`}
                                        />
                                    )
                            )}
                        </div>
                    )}
                </div>
                <div className={style.pointCard}>
                    <div className={style.pointTop}>
                        <p className={style.title}>进球</p>
                        <p className={style.subTitle}>
                            （近{battleMatchCompare.matchCount}场，由近及远）
                        </p>
                    </div>
                    {typeof battleMatchCompare.overUnderTrend !== 'undefined' && (
                        <div className={style.pointBar}>
                            {battleMatchCompare.overUnderTrend.map(
                                (point, idx) =>
                                    point.length > 0 && (
                                        <div
                                            className={`${style.point} ${style[point]}`}
                                            key={`${point}_${idx.toString()}`}
                                        />
                                    )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TeamHistoryBattleCompared;
